import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PublicNavbar from "@/components/PublicPageComponents/PublicNavbar";
import { GoogleTagManager } from '@next/third-parties/google'
import PublicFooter from "@/components/PublicPageComponents/PublicFooter";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Event for Student",
  description: "A platform for students to create and participate in events",
   keywords: 'student events, university events, event management, Events4Students, BUET events, competitions, workshops, seminars, campus activities, hackathon, mechathon, techathon, case competition, research, poster presentation, business competition',
  openGraph: {
    title: 'Events4Students',
    description: 'The ultimate platform for student event management and discovery.',
    url: process.env.NEXT_BASE_URL || 'https://www.event4student.com/',
    siteName: 'Event4Student',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/d/1i0dOoct_qiA185n2aAA-ywrXQBx3kaF1',
        width: 1200,
        height: 630,
        alt: 'Events4Students Logo',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Head>
          <meta name="google-adsense-account" content={process.env.NEXT_Google_Adsense_Account}></meta>
        </Head>
        <GoogleTagManager gtmId={process.env.NEXT_Google_Tag_Manager_ID}/>
        <PublicNavbar />
        {children}
        <PublicFooter/>
      </body>
    </html>
  );
}
