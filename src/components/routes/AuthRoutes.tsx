import { Navigate, Outlet } from "react-router-dom";
import { useProfile } from "@/context/profile-context";
import { useState } from "react";
import moveusLogo from "@/assets/logos/moveus-logo.svg";

export function AuthRoutes() {
  const { profile } = useProfile();

  if (profile) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="flex h-screen bg-base-300">
      {/* Left side - Form */}
      <div className="flex flex-col bg-base-100 items-center w-full md:w-[50%] md:max-w-[500px]">
        {/* Logo */}
        <div className="p-8 flex-shrink-0">
          <img src={moveusLogo} alt="MoveUs" className="h-24" />
        </div>

        {/* Form container - centered vertically */}
        <div className="flex-1 mb-16 flex items-center px-8 pb-8 w-full">
          <div className="w-full max-w-sm mx-auto">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Right side - Hero image/content (hidden on mobile) */}
      <div className="hidden md:flex flex-1 bg-primary/20 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <h2 className="text-4xl font-bold mb-4 text-base-content">
            Your Workout Wingman
          </h2>
          <p className="text-lg text-base-content/70">
            Connect with others and join exciting sports events in your area.
            From basketball to yoga, find your next adventure today.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthRoutes;
