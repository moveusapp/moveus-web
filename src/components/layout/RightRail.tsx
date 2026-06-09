import GlobalSearchWidget from "@/components/widgets/GlobalSearchWidget";
import UpcomingEventsWidget from "@/components/widgets/UpcomingEventsWidget";
import MainFooter from "@/components/misc/MainFooter";

type RightRailProps = {
  /** Search-led pages already carry search in their header, so they hide it here. */
  showSearch?: boolean;
};

/**
 * The shared desktop right rail. Single source of truth so the widget stack
 * stays identical across Home, Notifications and Search.
 */
function RightRail({ showSearch = true }: RightRailProps) {
  return (
    <aside className="hidden lg:block lg:w-[300px] flex-shrink-0 sticky top-0 h-screen overflow-y-auto border-l border-base-300">
      <div className="flex flex-col p-4 gap-6">
        {showSearch && <GlobalSearchWidget />}
        <UpcomingEventsWidget />
        <MainFooter />
      </div>
    </aside>
  );
}

export default RightRail;
