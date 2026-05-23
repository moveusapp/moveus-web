import { Link, Navigate, Outlet } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";
import { useProfile } from "@/context/profile-context";
import moveusLogo from "@/assets/logos/moveus-logo.svg";
import strings from "@/translations/strings";

export function AuthRoutes() {
  const { profile } = useProfile();

  if (profile) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="min-h-screen md:h-screen flex bg-base-100">
      {/* Form column */}
      <div className="relative flex flex-col w-full md:w-[55%] lg:w-[50%] md:max-w-[560px] md:h-full md:overflow-y-auto md:border-r md:border-base-200">
        <div className="flex items-center justify-between px-5 md:px-10 pt-5 pb-1">
          <Link to="/" className="flex items-center">
            <img src={moveusLogo} alt={strings.common.brand} className="h-8" />
          </Link>
          <Link
            to="/"
            className="btn btn-ghost btn-sm gap-1 text-base-content/70"
          >
            <HiArrowLeft className="w-4 h-4" />
            {strings.auth.back}
          </Link>
        </div>

        <div className="flex-1 flex md:items-center px-5 md:px-10 pt-6 pb-10 md:py-5">
          <div className="w-full max-w-sm mx-auto">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Brand column */}
      <div className="hidden md:flex flex-1 relative overflow-hidden bg-primary items-center justify-center">
        <div
          className="absolute inset-0 opacity-[0.1]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative max-w-md px-10 text-primary-content">
          <h2 className="text-5xl lg:text-6xl font-black mb-5 tracking-tight text-white leading-[1.05]">
            {strings.auth.brandHeadline}
          </h2>
          <p className="text-lg text-white/85 leading-relaxed">
            {strings.auth.brandSubhead}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthRoutes;
