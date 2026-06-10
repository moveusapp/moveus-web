import GlobalSearchWidget from "@/components/widgets/GlobalSearchWidget";
import UpcomingEventsWidget from "@/components/widgets/UpcomingEventsWidget";
import MainFooter from "@/components/misc/MainFooter";

type RightRailProps = {
  showSearch?: boolean;
};

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
