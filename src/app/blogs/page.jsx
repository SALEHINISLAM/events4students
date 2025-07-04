'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

export default function BlogPage() {
  const placeholderPosts = [
    {
      id: 1,
      title: 'Top 10 Tips for Organizing Student Events',
      excerpt: 'Get ready to learn expert tips for planning successful campus events, from workshops to festivals. Coming soon!',
      slug: 'top-10-tips-student-events',
      date: 'Coming Soon',
      image: '/placeholder.jpg',
    },
    {
      id: 2,
      title: 'Why BUET Events Are Unforgettable',
      excerpt: 'Discover what makes BUET’s student events special and how Event4Student brings them to life. Stay tuned!',
      slug: 'why-buet-events-unforgettable',
      date: 'Coming Soon',
      image: '/placeholder.jpg',
    },
  ];

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        event_category: 'Engagement',
        event_label: 'Blog Page',
      });
    }
  }, []);

  return (
    <div data-theme="light" className="min-h-screen bg-base-100">
      <Head>
        <title>Blog - Event4Student</title>
        <meta
          name="description"
          content="Explore the Event4Student blog for tips, guides, and stories about student events and campus life at BUET and beyond. Coming soon!"
        />
        <meta name="keywords" content="Event4Student, blog, student events, BUET events, event planning, campus life" />
        <meta property="og:title" content="Blog - Event4Student" />
        <meta
          property="og:description"
          content="Discover tips and stories about student events on the Event4Student blog. Stay tuned for our upcoming posts!"
        />
        <meta property="og:image" content="/logo.svg" />
        <meta property="og:url" content={`${process.env.NEXT_BASE_URL || 'https://www.event4student.com'}/blog`} />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Blog',
              name: 'Event4Student Blog',
              description: 'Blog for Event4Student, a platform for student event management and discovery.',
              url: `${process.env.NEXT_BASE_URL || 'https://www.event4student.com'}/blog`,
              publisher: {
                '@type': 'Organization',
                name: 'Event4Student',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://lh3.googleusercontent.com/d/1i0dOoct_qiA185n2aAA-ywrXQBx3kaF1',
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Event4Student Blog</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
              Our blog is coming soon! Get ready for tips, guides, and stories to help you plan, discover, and enjoy student events at BUET and beyond.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="btn btn-primary btn-lg">
                Explore Events Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Blog Preview Section */}
      <div className="container mx-auto py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            What&apos;s Coming to Our Blog
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            We&apos;re working on exciting content to inspire and empower students and event organizers. From event planning tips to BUET campus stories, our blog will be your go-to resource. Check back soon for updates!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholderPosts.map((post) => (
              <motion.div
                key={post.id}
                className="card bg-base-100 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: post.id * 0.1 }}
              >
                <figure>
                  <Image
                    src={post.image || 'https://lh3.googleusercontent.com/d/1i0dOoct_qiA185n2aAA-ywrXQBx3kaF1'}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="h-48 w-full object-cover rounded-t-lg"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-lg text-black">{post.title}</h3>
                  <p className="text-sm text-gray-800">{post.date}</p>
                  <p className="text-gray-600">{post.excerpt}</p>
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-primary btn-sm" disabled>
                      Coming Soon
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="bg-base-200 py-12">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Stay Connected with Event4Student
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Want to stay updated on our blog and upcoming events? Explore our platform or join as an organizer to create unforgettable student experiences!
            </p>
            <div className="flex justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/events" className="btn btn-primary btn-lg">
                  Explore Events
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/create-event" className="btn btn-outline btn-lg">
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