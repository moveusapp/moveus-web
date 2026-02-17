import { useEffect } from "react";

const TITLE_SUFFIX = "| MoveUs";

function useDocumentTitle(pageTitle: string) {
  useEffect(() => {
    document.title = `${pageTitle} ${TITLE_SUFFIX}`;
  }, [pageTitle]);
}

function setDocumentTitle(pageTitle: string) {
  document.title = `${pageTitle} ${TITLE_SUFFIX}`;
}

export default useDocumentTitle;

export { setDocumentTitle };
