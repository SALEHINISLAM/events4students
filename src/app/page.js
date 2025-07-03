import BannerSection from "@/components/HomeComponents/Banner";
import EventsSection from "@/components/HomeComponents/EventsSection";

export default function Home() {
  return (
    <div data-theme="light" className="min-h-screen bg-base-100">
      <BannerSection />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">

      </div>
      <EventsSection/>
    </div>
  );
}
