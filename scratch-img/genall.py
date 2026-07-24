import os, json, base64, urllib.request, concurrent.futures

key=os.environ["OPENAI_API_KEY"]
STYLE=(" Raja Ravi Varma and BBT/ISKCON calendar-art influence, warm bright morning light, "
"radiant, joyful, reverent, premium fine detailed brushwork. Faces fully visible, serene and beautiful, "
"never cropped or cut off. Bright cream-and-gold light with soft peacock-blue accents, light-first not dark. "
"Absolutely no text, no letters, no captions, no watermark anywhere in the image.")

# slug -> distinct scene (vary poses; Krishna's complexion is a gentle luminous dark blue-black rain-cloud hue)
JOBS = {
 "why-does-krishna-wear-a-peacock-feather":
   "Young Krishna crowned with a single bright peacock feather, several peacocks dancing around him with fanned tail feathers in a green Vrindavan grove at dawn.",
 "why-did-krishna-not-marry-radha":
   "Radha and Krishna standing together in tender eternal love beneath a flowering kadamba tree in Vrindavan, gazing at each other, garlands of flowers, soft golden light. Both faces fully visible.",
 "how-did-radha-die":
   "Srimati Radharani alone in serene devotion at golden sunset by the Yamuna in Vrindavan, luminous and peaceful, eyes half closed in remembrance of Krishna, lotuses on the water. Her face fully visible and calm.",
 "is-radha-an-incarnation-of-lakshmi":
   "Srimati Radharani standing radiant on a large blooming pink lotus, golden divine aura, holding a lotus, surrounded by soft light and lotus ponds, regal and graceful. Her face fully visible.",
 "birth-of-radharani":
   "The divine baby Radha glowing with soft golden light in a cradle decorated with flowers, joyful mother Kirtida and father Vrishabhanu leaning in with love, dawn light, lotus petals. All faces fully visible.",
 "when-draupadi-met-krishnas-queens":
   "A warm regal scene inside the golden palace of Dwarka: Draupadi seated among Krishna's queens in rich silks and jewels, friendly and dignified, arches and lamps, warm light. Faces fully visible.",
 "when-krishna-dressed-as-a-gopi":
   "Playful Krishna gently and modestly dressed in a gopi's colourful sari and jewelry among smiling gopi friends in a Vrindavan garden, lighthearted and tasteful, flowers everywhere. Krishna's face fully visible.",
 "who-is-radha":
   "A luminous devotional portrait of Srimati Radharani, the queen of Vrindavan, in an elegant red-and-gold sari with a delicate crown and nose ring, soft radiant golden aura, flowering Vrindavan behind her. Her face fully visible and beautiful.",
 "what-their-love-symbolizes":
   "Radha and Krishna together on a flower-decorated swing (jhoola) under a kadamba tree in Vrindavan, blissful divine love, peacocks and flowers, bright soft light. Both faces fully visible.",
 "hare-krishna-maha-mantra":
   "A radiant devotional scene of Radha and Krishna together bathed in golden light, with a tulsi japa-bead mala in the foreground and soft glowing aura of sound and light around them, Vrindavan setting. Faces fully visible.",
}

def gen(slug, scene):
    prompt=scene+STYLE
    body=json.dumps({"model":"gpt-image-2","prompt":prompt,"size":"1536x1024","quality":"high","n":1}).encode()
    req=urllib.request.Request("https://api.openai.com/v1/images/generations",data=body,
      headers={"Authorization":f"Bearer {key}","Content-Type":"application/json"})
    try:
        r=json.load(urllib.request.urlopen(req,timeout=240))
        open(f"scratch-img/{slug}.png","wb").write(base64.b64decode(r["data"][0]["b64_json"]))
        return f"OK {slug}"
    except urllib.error.HTTPError as e:
        return f"ERR {slug} {e.code} {e.read().decode()[:200]}"
    except Exception as e:
        return f"ERR {slug} {e}"

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:
    futs={ex.submit(gen,s,sc):s for s,sc in JOBS.items()}
    for f in concurrent.futures.as_completed(futs):
        print(f.result(), flush=True)
print("DONE")
