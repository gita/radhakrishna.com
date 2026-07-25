#!/usr/bin/env python3
"""
Verifies every festival date we publish against an independent astronomical
computation, so a date is never trusted just because a website said so.

Hindu festivals are lunisolar: the Gregorian date moves each year, and the tithi
is resolved against sunrise at a specific place, so two towns (or two
sampradayas) can legitimately observe a day apart. This does not try to settle
those differences. It answers a narrower and checkable question: does the date we
published actually fall on the tithi and lunar month the festival is defined by?

IMPORTANT: this cannot settle which day a tradition observes, and it must not be
treated as the source of truth. Janmashtami 2025 is the clean example. Ashtami
ran from 11:49pm on 15 Aug to 9:34pm on 16 Aug. The smarta rule, which asks
whether ashtami prevails at midnight, points at 15 Aug. The Vaishnava rule, which
requires ashtami at sunrise with Rohini and never accepts saptami, points at
16 Aug, and 16 Aug is what ISKCON, Mathura and Vrindavan actually kept.

So: take the published date from the Vaishnava calendar, which is the tradition
this site follows, and use this script to check that the date at least lands on
the right tithi under one of the two reckonings. It reports which. A date that
matches neither is simply wrong and should never ship.

This is a CROSS-CHECK, not a date source. Published dates come from Indian
panchang authorities: Drik Panchang for the general (smarta) day and the ISKCON
Vaishnava calendar for the Vaishnava day. Record which in `source`.

The computation applies the Indian system throughout: the Lahiri ayanamsa, which
is the Government of India / Rashtriya Panchang standard, sunrise at Mathura, and
tithi / paksha / amanta reckoning. The Swiss Ephemeris underneath is only a
database of planetary positions, the same raw data the open-source drik-panchanga
implementations use; it carries no calendar of its own.

    pip install pyswisseph
    python3 scripts/check-festival-dates.py

Exits non-zero if any published date fails, so it can gate a deploy.
"""
import json
import re
import sys
from datetime import date, timedelta
from pathlib import Path

try:
    import swisseph as swe
except ImportError:
    print("pyswisseph is not installed:  pip install pyswisseph")
    sys.exit(2)

swe.set_sid_mode(swe.SIDM_LAHIRI)

# Braj, where these festivals are kept. Tithi is resolved against local sunrise.
LAT, LON = 27.4924, 77.6737

# Months here are AMANTA (new moon to new moon), which is what the computation
# below yields. Note the classic trap: a krishna-paksha festival carries a
# different month name in the Purnimanta reckoning used across North India.
# Janmashtami is Shravana krishna ashtami in amanta and Bhadrapada krishna
# ashtami in purnimanta. Same day, two correct names.
FESTIVALS = {
    "janmashtami": {
        "label": "Krishna Janmashtami",
        "tithi": 23,  # krishna paksha ashtami
        "amanta_month": "Shravana",
        "purnimanta_month": "Bhadrapada",
        "reckon": "midnight",  # observed at midnight, so the tithi must hold then
    },
    "radhashtami": {
        "label": "Radhashtami",
        "tithi": 8,  # shukla paksha ashtami, unambiguous across both reckonings
        "amanta_month": "Bhadrapada",
        "purnimanta_month": "Bhadrapada",
        "reckon": "sunrise",
    },
}

MONTH_NAMES = [
    "Chaitra", "Vaishakha", "Jyeshtha", "Ashadha", "Shravana", "Bhadrapada",
    "Ashwina", "Kartika", "Margashirsha", "Pausha", "Magha", "Phalguna",
]


def jd_of(d: date, hour_ut: float) -> float:
    return swe.julday(d.year, d.month, d.day, hour_ut)


def sunrise_jd(d: date) -> float:
    try:
        res = swe.rise_trans(
            jd_of(d, 0.0), swe.SUN,
            swe.CALC_RISE | swe.BIT_DISC_CENTER, (LON, LAT, 0),
        )
        return res[1][0]
    except Exception:
        return jd_of(d, 0.25)


def tithi_at(jd: float) -> int:
    sun = swe.calc_ut(jd, swe.SUN, swe.FLG_SWIEPH)[0][0]
    moon = swe.calc_ut(jd, swe.MOON, swe.FLG_SWIEPH)[0][0]
    return int(((moon - sun) % 360) / 12) + 1


def lunar_month_at(jd: float) -> str:
    """Amanta month: named for the sidereal solar month the preceding new moon fell in."""
    # Walk back to the previous new moon.
    probe = jd
    while tithi_at(probe) != 30 and probe > jd - 32:
        probe -= 0.25
    sun_long = swe.calc_ut(probe, swe.SUN, swe.FLG_SWIEPH | swe.FLG_SIDEREAL)[0][0]
    # The month takes its name from the solar ingress that falls inside it, which
    # is the rashi after the one the sun occupies at that new moon.
    return MONTH_NAMES[(int(sun_long / 30) + 1) % 12]


def collect_published():
    """Every occurrences[] entry across the content tree."""
    out = []
    for f in Path("content").rglob("*.mdx"):
        text = f.read_text()
        fm = text.split("---", 2)
        if len(fm) < 3:
            continue
        block = re.search(r"^occurrences:\s*\n((?:\s+-.*\n|\s{4,}.*\n)+)", fm[1], re.M)
        if not block:
            continue
        slug = f.stem
        for m in re.finditer(r"year:\s*(\d{4})[\s\S]*?date:\s*\"?(\d{4}-\d{2}-\d{2})", block.group(1)):
            out.append((slug, int(m.group(1)), m.group(2), f))
    return out


def main():
    published = collect_published()
    if not published:
        print("No festival dates found in content/. Nothing to check.")
        return 0

    problems = []
    for slug, year, iso, path in published:
        rule = FESTIVALS.get(slug)
        if not rule:
            print(f"  ?  {slug} {year}: no rule defined, skipped")
            continue

        d = date.fromisoformat(iso)
        # Check both reckonings rather than pretending one is authoritative.
        t_sunrise = tithi_at(sunrise_jd(d))
        t_midnight = tithi_at(jd_of(d, 18.5))  # ~00:00 IST that night
        matched = []
        if t_sunrise == rule["tithi"]:
            matched.append("sunrise (vaishnava)")
        if t_midnight == rule["tithi"]:
            matched.append("midnight (smarta)")
        jd = sunrise_jd(d) if rule["reckon"] == "sunrise" else jd_of(d, 18.5)
        t = t_sunrise if rule["reckon"] == "sunrise" else t_midnight
        month = lunar_month_at(jd)

        ok_t = bool(matched)
        ok_m = month == rule["amanta_month"]
        mark = "OK " if (ok_t and ok_m) else "BAD"
        how = ", ".join(matched) if matched else "neither reckoning"
        print(
            f"  {mark} {rule['label']} {year}: {iso}  tithi sunrise={t_sunrise} midnight={t_midnight} "
            f"(want {rule['tithi']} -> matches {how})  amanta month={month}"
        )
        if not (ok_t and ok_m):
            problems.append(
                f"{path}: {rule['label']} {year} published as {iso} is tithi "
                f"{t_sunrise} at sunrise and {t_midnight} at midnight, in amanta {month}. "
                f"Expected tithi {rule['tithi']} in {rule['amanta_month']}."
            )

    # Freshness. A festival page is only useful if it knows about the next
    # occurrence, and the date moves every year, so the page needs revisiting
    # annually. Warn while there is still time to act rather than after the
    # page has gone stale in front of readers.
    from collections import defaultdict
    by_page = defaultdict(list)
    for slug, year, iso, path in published:
        by_page[(slug, str(path))].append(iso)

    today_iso = date.today().isoformat()
    for (slug, path), dates in sorted(by_page.items()):
        future = sorted(d for d in dates if d >= today_iso)
        if not future:
            problems.append(f"{path}: every listed date for {slug} is in the past. Add the next one.")
            continue
        days = (date.fromisoformat(future[0]) - date.today()).days
        if len(future) < 2:
            print(f"  !  {slug}: only one future date left ({future[0]}, in {days} days). "
                  f"Add the following year from the panchang.")
        if days > 400:
            print(f"  !  {slug}: next date is {days} days away. Confirm the current year is listed.")

    print()
    if problems:
        print(f"{len(problems)} problem(s):")
        for p in problems:
            print("  " + p)
        return 1
    print(f"All {len(published)} published festival dates match the expected tithi and lunar month.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
