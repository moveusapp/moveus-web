import { Outlet } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";
import MobileNav from "./MobileNav";

export function NavRoutes() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="flex mx-auto">
        <aside
          style={{ overflow: "hidden" }}
          className="hidden md:flex md:w-[240px] lg:w-[260px] flex-shrink-0 sticky top-0 h-screen overflow-y-auto border-r border-base-300 bg-base-200"
        >
          <LeftSidebar />
        </aside>

        <main className="flex-1 h-screen overflow-y-auto flex flex-col min-w-0 pb-15 md:pb-0">
          <Outlet />
        </main>

        <MobileNav />
      </div>
    </div>
  );
}
