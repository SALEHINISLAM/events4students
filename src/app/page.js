import BannerSection from "@/components/HomeComponents/Banner";
import EventsSection from "@/components/HomeComponents/EventsSection";
import Head from "next/head";

export default function Home() {
  return (
    <div data-theme="light" className="min-h-screen bg-base-100">
      <Head>
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_Google_Adsense_Account}`}
          crossorigin="anonymous"></script>
        <meta name="google-adsense-account" content={process.env.NEXT_Google_Adsense_Account}></meta>
      </Head>
      <BannerSection />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      </div>
      <EventsSection />
    </div>
  );
}
