import LocalizedStrings from "react-localization";
import en from "./en.json"
import hr from "./hr.json"

const strings = new LocalizedStrings({
  en: en,
  hr: hr
});

export default strings;

strings.setLanguage("hr")
