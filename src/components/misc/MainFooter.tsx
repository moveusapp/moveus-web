import strings from "@/translations/strings";

function MainFooter() {
  return (
    <footer className="px-2 pb-4">
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-neutral/50">
        <a href="#" className="hover:underline">
          {strings.footer.terms}
        </a>
        <a href="#" className="hover:underline">
          {strings.footer.privacy}
        </a>
        <a href="#" className="hover:underline">
          {strings.footer.cookies}
        </a>
        <a href="#" className="hover:underline">
          {strings.footer.about}
        </a>
      </div>
      <p className="text-[11px] text-neutral/40 mt-1.5">
        {strings.footer.copy}
      </p>
    </footer>
  );
}

export default MainFooter;
