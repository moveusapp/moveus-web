import LegalDocument from "./LegalDocument";
import { cookiesContent } from "./legal-content";

function CookiesPage() {
  return <LegalDocument {...cookiesContent} />;
}

export default CookiesPage;
