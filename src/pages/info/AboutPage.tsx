import useDocumentTitle from "@/hooks/use-document-title";
import strings from "@/translations/strings";
import InfoHero from "./InfoHero";

function AboutPage() {
  const t = strings.info.about;
  useDocumentTitle(t.documentTitle);

  const values = [
    { title: t.valueOneTitle, body: t.valueOneBody },
    { title: t.valueTwoTitle, body: t.valueTwoBody },
    { title: t.valueThreeTitle, body: t.valueThreeBody },
  ];

  return (
    <>
      <InfoHero eyebrow={t.eyebrow} title={t.title} lede={t.lede} />

      <div className="mx-auto max-w-3xl px-6 sm:px-10 py-14 sm:py-16">
        {/* Lead */}
        <section className="info-prose max-w-none">
          <p className="text-lg leading-relaxed text-base-content/80">
            {t.missionBody}
          </p>
        </section>

        {/* What you get — a quiet editorial list */}
        <section className="mt-14 sm:mt-16">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/45 mb-2">
            {t.valuesEyebrow}
          </h2>
          <dl className="divide-y divide-base-300 border-t border-base-300">
            {values.map((v) => (
              <div
                key={v.title}
                className="grid sm:grid-cols-[12rem_minmax(0,1fr)] gap-1 sm:gap-8 py-6"
              >
                <dt className="font-semibold text-base-content">{v.title}</dt>
                <dd className="text-base-content/65 leading-relaxed">{v.body}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </>
  );
}

export default AboutPage;
