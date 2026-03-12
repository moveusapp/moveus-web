import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { HiArrowRight, HiCalendar, HiUsers, HiMapPin } from "react-icons/hi2";
import moveusLogo from "@/assets/logos/moveus-logo.svg";
import EventCard from "@/components/event/EventCard";
import { GetAnonymousUserEventsDocument } from "@/graphql/graphql-types";
import useDocumentTitle from "@/hooks/use-document-title";
import { useProfile } from "@/context/profile-context";

function LandingPage() {
  const { profile } = useProfile();

  if (profile) {
    return <Navigate to="/home" replace />;
  }
  
  useDocumentTitle("MoveUs - Your Workout Wingman");

  const { data: eventsData, loading: eventsLoading } = useQuery(
    GetAnonymousUserEventsDocument,
  );

  return (
    <div className="min-h-screen bg-base-100">
      <nav className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-lg border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={moveusLogo} alt="MoveUs" className="h-10" />
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login" className="btn">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
        <div className="max-w-7xl mx-auto px-18 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-base-content">
                Your Workout <span className="text-primary">Wingman</span>
              </h1>
              <p className="text-xl text-base-content/70 mb-8 max-w-2xl">
                Connect with others and join exciting sports events in your
                area. From basketball to yoga, find your next adventure today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register" className="btn btn-primary btn-lg gap-2">
                  Get Started
                  <HiArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/search" className="btn btn-lg">
                  Explore Events
                </Link>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="relative w-full max-w-lg mx-auto">
                <img
                  src={moveusLogo}
                  alt="People playing sports"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-base-content">
              Happening Near You
            </h2>
            <p className="text-lg text-base-content/70">
              Join these upcoming events in your area
            </p>
          </div>

          {eventsLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsData?.anonymousUserEvents?.slice(0, 6).map((event) => (
                <EventCard key={event!.id} event={event!} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/search" className="btn btn-primary btn-lg">
              View All Events
              <HiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-base-content">
              Why Choose MoveUs?
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Intelligently matched with compatible workout partners based on your unique fitness personality
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-base-100 rounded-2xl p-8 border border-base-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
          <HiMapPin className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Find Events Nearby</h3>
              <p className="text-base-content/70">
          Discover sports events happening right in your neighborhood. Filter by activity, skill level, and distance.
              </p>
            </div>

            <div className="bg-base-100 rounded-2xl p-8 border border-base-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
          <HiUsers className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Partner Matching</h3>
              <p className="text-base-content/70">
          Get matched with compatible partners based on your psychological profile. Connect with people who motivate and inspire you.
              </p>
            </div>

            <div className="bg-base-100 rounded-2xl p-8 border border-base-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
          <HiCalendar className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Create Your Own Events</h3>
              <p className="text-base-content/70">
          Host your own sports events and invite matched partners. Manage participants and locations with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-base-content">
            Ready to Get Moving?
          </h2>
          <p className="text-xl text-base-content/70 mb-8">
            Join our community and make new friends
          </p>
          <Link to="/register" className="btn btn-primary btn-lg gap-2">
            Create Free Account
            <HiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-base-300 border-t border-base-content/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <img src={moveusLogo} alt="MoveUs" className="h-10 mb-4" />
              <p className="text-sm text-base-content/70">
                Your workout wingman. Connect, compete, and conquer your fitness
                goals together.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/about"
                    className="text-base-content/70 hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-base-content/70 hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/privacy"
                    className="text-base-content/70 hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-base-content/70 hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies"
                    className="text-base-content/70 hover:text-primary"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-base-content/10 mt-12 pt-8 text-center text-sm text-base-content/60">
            <p>MoveUs, j.d.o.o. 2026</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
