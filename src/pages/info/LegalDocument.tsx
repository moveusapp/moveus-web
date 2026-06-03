import { useState } from "react";
import { HiChevronDown, HiArrowUp } from "react-icons/hi2";
import useDocumentTitle from "@/hooks/use-document-title";
import InfoHero from "./InfoHero";
import { useScrollSpy } from "./use-scroll-spy";
import { placeholderBody } from "./placeholder-prose";
import { legalChrome, type LegalContent } from "./legal-content";

function LegalDocument({
  documentTitle,
  eyebrow,
  title,
  lede,
  lastUpdatedDate,
  sections,
}: LegalContent) {
  useDocumentTitle(documentTitle);

  const ids = sections.map((s) => s.id);
  const activeId = useScrollSpy(ids);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  return (
    <>
      <InfoHero
        eyebrow={eyebrow}
        title={title}
        lede={lede}
        meta={`${legalChrome.lastUpdated} ${lastUpdatedDate}`}
        containerClassName="max-w-6xl px-6 sm:px-10 lg:px-8"
      />

      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-8 pt-12 sm:pt-14 pb-20">
        <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
          {/* ── Table of contents ── */}
          <aside className="lg:sticky lg:top-20 lg:self-start mb-8 lg:mb-0">
            {/* Mobile: collapsible */}
            <div className="lg:hidden rounded-2xl border border-base-300 bg-base-200 overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileTocOpen((v) => !v)}
                aria-expanded={mobileTocOpen}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold"
              >
                {legalChrome.onThisPage}
                <HiChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${mobileTocOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileTocOpen && (
                <ol className="px-2 pb-2 text-sm">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={() => setMobileTocOpen(false)}
                        className="flex gap-2 px-2 py-2 rounded-xl text-base-content/70 hover:bg-base-300/60"
                      >
                        <span className="text-base-content/40 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            {/* Desktop: persistent rail */}
            <nav className="hidden lg:block" aria-label={legalChrome.onThisPage}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/45 mb-4">
                {legalChrome.onThisPage}
              </p>
              <ol className="space-y-1 border-l border-base-300">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      data-active={activeId === s.id}
                      className="info-toc-link group relative flex items-center gap-2.5 -ml-px pl-4 py-1.5 text-sm text-base-content/60 hover:text-base-content transition-colors"
                    >
                      <span className="info-toc-bar absolute left-0 -ml-px w-0.5 h-5 rounded-full bg-primary" />
                      <span className="text-base-content/35 tabular-nums text-xs">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* ── Document body ── */}
          <div>
            <div className="space-y-12">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="info-anchor scroll-mt-24">
                  <h2 className="flex items-baseline gap-3 text-xl sm:text-2xl font-bold mb-4">
                    <span className="text-primary/40 text-base font-black tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </h2>
                  <div className="info-prose">
                    {placeholderBody(i, i % 3 === 1)}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-14 pt-8 border-t border-base-300">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 text-sm font-medium text-base-content/60 hover:text-primary transition-colors"
              >
                <HiArrowUp className="w-4 h-4" />
                {legalChrome.backToTop}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LegalDocument;
