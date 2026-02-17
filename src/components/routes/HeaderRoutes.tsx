import { Link, Outlet } from "react-router-dom";
import { HiBell, HiMagnifyingGlass } from "react-icons/hi2";

function HeaderRoutes() {
  return (
    <div className="vertical">
      <header className=" flex justify-between items-center text-4xl my-8">
        <Link to="/notifications">
          <HiBell />
        </Link>
        <img src="/logo.svg" className="w-24" />
        <Link to="/search">
          <HiMagnifyingGlass />
        </Link>
      </header>
      <div className="vertical">
        <Outlet />
      </div>
    </div>
  );
}

export default HeaderRoutes;
