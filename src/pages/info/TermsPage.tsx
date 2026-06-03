import LegalDocument from "./LegalDocument";
import { termsContent } from "./legal-content";

function TermsPage() {
  return <LegalDocument {...termsContent} />;
}

export default TermsPage;
