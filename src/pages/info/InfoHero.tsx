type InfoHeroProps = {
  eyebrow: string;
  title: string;
  lede: string;
  /** Optional meta line under the lede (e.g. "Last updated June 2026"). */
  meta?: string;
  /**
   * Container width/padding. Must match the page body below so the masthead
   * and content share a left edge. Defaults to the narrow (About) measure.
   */
  containerClassName?: string;
};

/**
 * Editorial masthead: an eyebrow, a measured title, a quiet lede.
 * No color wash, no decoration. Hierarchy carries it.
 */
function InfoHero({
  eyebrow,
  title,
  lede,
  meta,
  containerClassName = "max-w-3xl px-6 sm:px-10",
}: InfoHeroProps) {
  return (
    <header className="border-b border-base-300">
      <div className={`mx-auto ${containerClassName} pt-12 pb-8 sm:pt-16 sm:pb-10`}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/45">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-[1.08] tracking-tight text-balance">
          {title}
        </h1>
        <p className="mt-5 text-lg text-base-content/65 leading-relaxed max-w-2xl">
          {lede}
        </p>
        {meta && (
          <p className="mt-6 text-sm text-base-content/45">
            {meta}
          </p>
        )}
      </div>
    </header>
  );
}

export default InfoHero;
