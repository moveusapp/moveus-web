import LegalDocument from "./LegalDocument";
import { privacyContent } from "./legal-content";

function PrivacyPage() {
  return <LegalDocument {...privacyContent} />;
}

export default PrivacyPage;
