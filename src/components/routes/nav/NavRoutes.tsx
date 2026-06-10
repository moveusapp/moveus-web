import { Outlet, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import LeftSidebar from "./LeftSidebar";
import MobileNav from "./MobileNav";
import { useProfile } from "@/context/profile-context";

export type NavOutletContext = {
  setChatViewOpen: (open: boolean) => void;
};

export function NavRoutes() {
  const { profile } = useProfile();
  const location = useLocation();

  const [chatViewOpen, setChatViewOpen] = useState(false);
  const outletContext = useMemo<NavOutletContext>(
    () => ({ setChatViewOpen }),
    [],
  );

  if (profile === null) {
    return <Outlet />;
  }

  const isChat = location.pathname.startsWith("/chat");

  const canShowMobileNav: Array<() => boolean> = [
    () => !chatViewOpen,
  ];
  const showMobileNav = canShowMobileNav.every((rule) => rule());

  return (
    <div className="min-h-screen bg-base-100">
      <div className="mx-auto flex max-w-[1200px]">
        <aside className="hidden md:flex w-[300px] h-screen sticky top-0 shrink-0 border-r border-base-300">
          <LeftSidebar />
        </aside>

        <main
          className={`w-full max-w-[900px] min-w-0 ${
            isChat ? "" : "pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0"
          }`}
        >
          <Outlet context={outletContext} />
        </main>
      </div>

      {showMobileNav && <MobileNav />}
    </div>
  );
}
