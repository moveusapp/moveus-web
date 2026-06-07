import { HiChevronDown } from "react-icons/hi2";
import useDocumentTitle from "@/hooks/use-document-title";
import strings from "@/translations/strings";
import InfoHero from "./InfoHero";

const CONTACT_EMAIL = "contact@moveusapp.com";

function HelpPage() {
  const t = strings.info.help;
  useDocumentTitle(t.documentTitle);

  return (
    <>
      <InfoHero eyebrow={t.eyebrow} title={t.title} lede={t.lede} />

      <div className="mx-auto max-w-3xl px-6 sm:px-10 pt-10 sm:pt-12 pb-14 sm:pb-16">
        {/* FAQ — native details rows, keyboard-friendly, no JS */}
        <section>
          {t.faqs.map(({ q, a }) => (
            <details key={q} className="group border-b border-base-300">
              <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-semibold text-base-content transition-colors hover:text-primary">
                {q}
                <HiChevronDown className="size-5 shrink-0 text-base-content/40 transition-transform duration-200 ease-out group-open:rotate-180" />
              </summary>
              <p className="pb-4 -mt-1 text-base-content/65 leading-relaxed">
                {a}
              </p>
            </details>
          ))}
        </section>

        {/* Contact */}
        <section className="mt-10 sm:mt-12">
          <h2 className="text-xl font-bold tracking-tight text-base-content">
            {t.contactTitle}
          </h2>
          <p className="mt-3 text-base-content/65 leading-relaxed">
            {t.contactBody}
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-4 inline-block font-medium text-primary underline underline-offset-2 hover:decoration-2"
          >
            {CONTACT_EMAIL}
          </a>
        </section>
      </div>
    </>
  );
}

export default HelpPage;
