import { Outlet, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import LeftSidebar from "./LeftSidebar";
import MobileNav from "./MobileNav";
import { useProfile } from "@/context/profile-context";

/** Shared with nav routes through the Outlet so a page can drive shell chrome. */
export type NavOutletContext = {
  setChatViewOpen: (open: boolean) => void;
};

export function NavRoutes() {
  const { profile } = useProfile();
  const location = useLocation();

  // A page (currently ChatPage) reports when a full-height view is open that
  // the bottom nav would overlap.
  const [chatViewOpen, setChatViewOpen] = useState(false);
  const outletContext = useMemo<NavOutletContext>(
    () => ({ setChatViewOpen }),
    [],
  );

  if (profile === null) {
    return <Outlet />;
  }

  // Chat manages its own full-height scroll, so it owns its bottom spacing;
  // every other route reserves clearance for the mobile tab bar.
  const isChat = location.pathname.startsWith("/chat");

  // The bottom nav shows only when every rule allows it. Add more rules here.
  const canShowMobileNav: Array<() => boolean> = [
    // An open chat conversation puts its composer where the bar would sit.
    () => !chatViewOpen,
  ];
  const showMobileNav = canShowMobileNav.every((rule) => rule());

  return (
    <div className="min-h-screen bg-base-100">
      {/* One shell width for every route: sidebar and right rail are the same
          width (300px) so the 600px middle column lands dead-center. */}
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
