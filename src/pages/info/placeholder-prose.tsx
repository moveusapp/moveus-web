import { ReactNode } from "react";

/**
 * PLACEHOLDER COPY — design scaffolding only.
 * Legal/about body text is intentionally lorem ipsum until real copy is written.
 * Headings and structure are real; these paragraphs are not.
 */
const LOREM = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam nisl nunc eget nisl. Sed euismod, nisl eget aliquam ultricies.",
  "Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut libero malesuada feugiat. Proin eget tortor risus, vestibulum ac diam sit amet quam.",
  "Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
  "Pellentesque in ipsum id orci porta dapibus. Sed porttitor lectus nibh, vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
];

const BULLETS = [
  "Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
  "Cras ultricies ligula sed magna dictum porta.",
  "Vestibulum ac diam sit amet quam vehicula elementum.",
  "Nulla porttitor accumsan tincidunt nec sit amet eros.",
];

/** Deterministic-ish body so each section reads a little differently. */
export function placeholderBody(seed: number, withList = false): ReactNode {
  const a = LOREM[seed % LOREM.length];
  const b = LOREM[(seed + 1) % LOREM.length];
  const c = LOREM[(seed + 2) % LOREM.length];
  return (
    <>
      <p>{a}</p>
      {withList ? (
        <ul>
          {BULLETS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{b}</p>
      )}
      <p>{c}</p>
    </>
  );
}
