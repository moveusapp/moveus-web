import { Fragment, ReactNode } from "react";
import type { LegalBlock } from "./legal-content";

/**
 * Turns bare emails and the moveusapp.com/privacy reference inside legal copy
 * into real links, so the body stays plain strings in legal-content.ts.
 */
const LINK_RE = /([\w.+-]+@[\w-]+\.[\w.-]+)|(moveusapp\.com\/privacy)/g;

function linkify(text: string): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index));
    const [token, email] = match;
    out.push(
      email ? (
        <a key={match.index} href={`mailto:${email}`}>
          {email}
        </a>
      ) : (
        <a key={match.index} href="/privacy">
          {token}
        </a>
      ),
    );
    last = match.index + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.map((node, i) => <Fragment key={i}>{node}</Fragment>);
}

/** Renders a section's structured legal body. */
export function renderLegalBody(blocks: LegalBlock[]): ReactNode {
  return blocks.map((block, i) => {
    switch (block.type) {
      case "h":
        return <h3 key={i}>{block.text}</h3>;
      case "ul":
        return (
          <ul key={i}>
            {block.items.map((item, j) => (
              <li key={j}>{linkify(item)}</li>
            ))}
          </ul>
        );
      case "p":
      default:
        return <p key={i}>{linkify(block.text)}</p>;
    }
  });
}
