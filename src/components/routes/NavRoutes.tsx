import { Link, Outlet, useLocation } from "react-router-dom";
import {
  HiHome,
  HiChatBubbleLeftRight,
  HiGlobeEuropeAfrica,
  HiUserCircle,
  HiOutlinePlus,
} from "react-icons/hi2";

export function NavRoutes() {
  const { pathname } = useLocation();

  return (
    <div className="vertical">
      <div className="vertical">
        <Outlet />
      </div>
      <div className="h-20 *:h-20 shrink-0">
        <nav className="bg-accent w-screen absolute left-0 ">
          <div className="flex items-center justify-around text-4xl text-background h-full max-w-96 mx-auto text-center">
            <Link to="/" className="block">
              <HiHome className={pathname === "/" ? "text-block-accent" : ""} />
              <p className="text-xs">Home</p>
            </Link>

            <Link to="/feed" className="block">
              <HiGlobeEuropeAfrica
                className={pathname === "/feed" ? "text-block-accent" : ""}
              />
              <p className="text-xs">Feed</p>
            </Link>

            <Link to="/create-event" className="block">
              <HiOutlinePlus className="text-accent bg-block rounded-full block aspect-square p-1 text-5xl" />
            </Link>

            <Link to="/chat" className="block">
              <HiChatBubbleLeftRight
                className={
                  pathname.startsWith("/chat") ? "text-block-accent" : ""
                }
              />
              <p className="text-xs">Chat</p>
            </Link>

            <Link to="/profile" className="block">
              <HiUserCircle
                className={pathname === "/profile" ? "text-block-accent" : ""}
              />
              <p className="text-xs">Me</p>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
