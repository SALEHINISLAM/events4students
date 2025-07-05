"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

export default function AboutPage() {
  const testimonials = [
    {
      quote:
        "Events4Students made organizing our tech fest a breeze. It’s like having a personal assistant for every BUET student event!",
      author: "Md Rakibul Islam Rafi, BUET EDC Club President",
    },
    {
      quote:
        "Finding events that match my interests has never been easier. This platform truly brings our campus community together.",
      author: "Aurnob Sarker, BUET Student",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      <Head>
        <title>About Us - Events4Students</title>
        <meta
          name="google-adsense-account"
          content={process.env.NEXT_Google_Adsense_Account}
        ></meta>
        <meta
          name="description"
          content="Learn about Events4Students, a platform created by BUET students to connect the campus community through vibrant events. Discover our mission to empower students and organizers."
        />
        <meta
          name="keywords"
          content="Events4Students, BUET events, student events, campus community, event management"
        />
        <meta property="og:title" content="About Us - Events4Students" />
        <meta
          property="og:description"
          content="Discover the story behind Events4Students, a BUET-born platform connecting students through unforgettable events."
        />
        <meta property="og:image" content="/logo.svg" />
        <meta
          property="og:url"
          content={`${
            process.env.NEXTAUTH_URL || "http://localhost:3000"
          }/about`}
        />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              name: "About Events4Students",
              description:
                "Events4Students is a student-led platform from BUET, designed to connect students and organizers through seamless event management.",
              url: `${
                process.env.NEXTAUTH_URL || "http://localhost:3000"
              }/about`,
              publisher: {
                "@type": "Organization",
                name: "Events4Students",
                logo: {
                  "@type": "ImageObject",
                  url: "https://lh3.googleusercontent.com/d/1i0dOoct_qiA185n2aAA-ywrXQBx3kaF1",
                },
              },
            }),
          }}
        />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Connecting Students, One Event at a Time
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Events4Students is a BUET-born platform designed to bring our
              campus community together through unforgettable events, from tech
              workshops to cultural festivals.
            </p>
            <motion.div
              className="mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="btn btn-primary btn-lg">
                Discover Events
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
            At Events4Students, we believe every student deserves a chance to
            shine, connect, and grow. Born in the heart of BUET’s vibrant
            student community, our platform makes it easy for organizers to
            create events and for students to discover opportunities that
            inspire. We’re here to empower the next generation of leaders by
            fostering creativity, collaboration, and community—because every
            event is a step toward a brighter future.
          </p>
        </motion.div>
      </div>

      {/* Story Section */}
      <div className="bg-base-200 py-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Our Story
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <p className="text-lg text-gray-600">
                  It all started at BUET, where a group of students, fueled by a
                  passion for community and innovation, saw a need for a better
                  way to organize and discover campus events. From late-night
                  brainstorming sessions to coding marathons, we built
                  Events4Students to simplify event management and amplify
                  student voices. Inspired by our own experiences juggling
                  academics and extracurriculars, we created a platform that
                  feels like home—a place where every student can find their
                  moment to connect, learn, and celebrate.
                </p>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="https://lh3.googleusercontent.com/d/1i0dOoct_qiA185n2aAA-ywrXQBx3kaF1"
                  alt="BUET campus event"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Meet the Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-8">
            We’re a team of BUET students and dreamers, united by our love for
            creating meaningful connections through events.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body text-center">
                <Image
                  src="https://scontent.fdac99-1.fna.fbcdn.net/v/t39.30808-6/514255581_1261528072309408_3855833943909282553_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGEusJZnnEGCjasMbmYw56ZXloohwzs3MheWiiHDOzcyFKsTihZ-HVpqCbxiDBoEc3rg3a91IlZ8gL62NHK5QIa&_nc_ohc=bo2V9Q5jU2cQ7kNvwHC9gka&_nc_oc=AdkzWseDBJ_YaHYfojpwqrywendLd7ZWt1NCG3YdWSx7R9Ko2mqwdO_QcvndBrfozd8&_nc_zt=23&_nc_ht=scontent.fdac99-1.fna&_nc_gid=-DgpuwXBIskTWZjouqO5CQ&oh=00_AfO-6YgpKKr9UCCyyKGwrECSkl_-adz6Er8Xd0aY5wi1AQ&oe=686C9CF3"
                  alt="Team Member"
                  width={150}
                  height={150}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="font-bold text-xl text-center text-black">
                  Md Salehin Islam
                </h3>
                <p className="text-gray-600">Founder & Developer</p>
                <p className="text-sm text-gray-500">
                  A Civil Engineering student at BUET, passionate about building
                  tools that empower students and foster community.
                </p>
              </div>
            </div>
            {/* Add more team members as needed */}
          </div>
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-base-200 py-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              What Our Community Says
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <p className="text-gray-600 italic">
                      "{testimonial.quote}"
                    </p>
                    <p className="text-gray-800 font-semibold mt-4">
                      {testimonial.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg max-w-2xl mx-auto mb-6">
              Whether you’re organizing a workshop, attending a cultural fest,
              or just looking to connect, Events4Students is your platform to
              make it happen. Let’s create unforgettable moments together!
            </p>
            <div className="flex justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/" className="btn btn-primary btn-lg">
                  Explore Events
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/create-event"
                  className="btn btn-outline btn-lg text-white border-white"
                >
                  Post an Event
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
