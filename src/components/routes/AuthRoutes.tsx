import { Link, Navigate, Outlet } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";
import { useProfile } from "@/context/profile-context";
import moveusLogo from "@/assets/logos/moveus-logo.svg";

export function AuthRoutes() {
  const { profile } = useProfile();

  if (profile) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="h-screen flex bg-base-100">
      {/* Form column */}
      <div className="relative flex flex-col w-full md:w-[55%] lg:w-[50%] md:max-w-[560px] h-full overflow-y-auto">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 -right-20 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="flex items-center justify-between px-6 md:px-10 pt-5">
          <Link to="/" className="flex items-center">
            <img src={moveusLogo} alt="MoveUs" className="h-8" />
          </Link>
          <Link
            to="/"
            className="btn btn-ghost btn-sm gap-1 text-base-content/70"
          >
            <HiArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        <div className="flex-1 flex items-center px-6 md:px-10 py-6">
          <div className="w-full max-w-sm mx-auto">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Brand column */}
      <div className="hidden md:flex flex-1 relative overflow-hidden bg-primary items-center justify-center">
        <div
          className="absolute inset-0 opacity-[0.12]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative max-w-md text-center px-10 text-primary-content">
          <h2 className="text-5xl lg:text-6xl font-black mb-4 tracking-tight text-white drop-shadow-sm leading-[1.05]">
            Your Workout Wingman
          </h2>
          <p className="text-lg text-white/90">
            Find people who actually show up. Match by psychology, move together.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthRoutes;
