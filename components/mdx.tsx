import * as runtime from "react/jsx-runtime";
import Link from "next/link";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { ScriptureTable } from "@/components/scripture-table";

/** Branded in-body components available to every MDX document. */
const components = {
  // A page never types out what a text says. It asks the concordance for the
  // rows on that question, so a correction lands everywhere at once and two
  // pages cannot drift into disagreeing about the same verse (docs/01 §5).
  ScriptureTable,
  // Wide comparison tables scroll inside their own container so the page body
  // never scrolls sideways on a phone.
  table: (props: HTMLAttributes<HTMLTableElement>) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  ),
  a: ({ href = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const external = /^https?:\/\//.test(href);
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
      );
    }
    return <Link href={href} {...props} />;
  },
};

function compile(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

/** Renders a Velite-compiled MDX body. Wrap in a `.prose` container to style. */
export function MDXBody({ code }: { code: string }) {
  const Content = compile(code);
  return <Content components={components} />;
}
