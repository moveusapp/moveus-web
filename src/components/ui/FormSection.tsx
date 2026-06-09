import type { ReactNode } from "react";
import type { IconType } from "react-icons";

type FormSectionProps = {
  icon: IconType;
  title: string;
  description?: string;
  /** Draw the separating rule above. Set on every section after the first. */
  divided?: boolean;
  children: ReactNode;
};

/**
 * One labelled block of a form or settings list: a primary-accent eyebrow with
 * an optional helper line, then its content. Borderless and hairline-separated
 * so groups read as one continuous surface rather than stacked boxes.
 */
function FormSection({
  icon: Icon,
  title,
  description,
  divided = false,
  children,
}: FormSectionProps) {
  return (
    <section
      className={`space-y-5 ${divided ? "border-t border-base-300 pt-8" : ""}`}
    >
      <div>
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-semibold uppercase tracking-wide text-primary">
            {title}
          </h2>
        </div>
        {description && (
          <p className="mt-1.5 text-sm text-base-content/60">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

export default FormSection;
