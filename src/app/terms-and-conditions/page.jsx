'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import Head from 'next/head';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-base-100">
      <Head>
        <title>Terms and Conditions - Events4Students</title>
        <meta
          name="description"
          content="Read the Terms and Conditions for using Events4Students, a BUET-born platform for student event management and discovery."
        />
        <meta name="keywords" content="Events4Students, terms and conditions, student events, BUET events, event management" />
        <meta property="og:title" content="Terms and Conditions - Events4Students" />
        <meta
          property="og:description"
          content="Understand the rules and guidelines for using Events4Students, your platform for student events."
        />
        <meta property="og:image" content="/logo.svg" />
        <meta property="og:url" content={`${process.env.NEXT_BASE_URL || 'http://localhost:3000'}/terms`} />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Terms and Conditions',
              description: 'Terms and Conditions for Events4Students, a platform for managing and discovering student events.',
              url: `${process.env.NEXT_BASE_URL || 'https://www.event4student.com'}/terms-and-conditions`,
              publisher: {
                '@type': 'Organization',
                name: 'Events4Students',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://lh3.googleusercontent.com/d/1i0dOoct_qiA185n2aAA-ywrXQBx3kaF1',
                },
              },
            }),
          }}
        />
      </Head>

      {/* Terms Content */}
      <div className="container mx-auto py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
            Terms and Conditions
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Welcome to Events4Students! These Terms and Conditions govern your use of our platform. By accessing or using Events4Students, you agree to be bound by these terms.
          </p>

          <div className="space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
              <p className="text-gray-600">
                Events4Students is a platform designed to connect students, event organizers, and administrators through seamless event creation, management, and discovery. Operated by a team of BUET students, our mission is to foster community and collaboration through student-focused events. These Terms and Conditions ("Terms") apply to all users, including event organizers, attendees, and administrators. Please read them carefully.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing or using Events4Students, including our website, mobile apps, or services, you agree to these Terms and our Privacy Policy. If you do not agree, please do not use the platform. We reserve the right to update these Terms at any time, with changes effective upon posting on this page.
              </p>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts</h2>
              <div className="text-gray-600">
                To create or manage events, you may need to register an account. You agree to:
                <ul className="list-disc pl-6 mt-2">
                  <li>Provide accurate and complete information during registration.</li>
                  <li>Keep your login credentials confidential and not share them with others.</li>
                  <li>Notify us immediately of any unauthorized use of your account.</li>
                </ul>
                You are responsible for all activities under your account. Events4Students reserves the right to suspend or terminate accounts for violations of these Terms.
              </div>
            </section>

            {/* Event Creation and Content */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Event Creation and Content</h2>
              <div className="text-gray-600">
                Events4Students allows users to create and submit events for approval. You agree that:
                <ul className="list-disc pl-6 mt-2">
                  <li>All event content (titles, descriptions, images) must be accurate, lawful, and appropriate.</li>
                  <li>You have the right to use any content you upload, including images and text.</li>
                  <li>Events must not promote illegal activities, hate speech, or harm to others.</li>
                  <li>Events are subject to admin approval, and we may reject or modify submissions at our discretion.</li>
                </ul>
                By uploading content, you grant Events4Students a non-exclusive, royalty-free license to use, display, and promote your content on our platform and related channels.
              </div>
            </section>

            {/* <!-- User Conduct --> */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. User Conduct</h2>
              <div className="text-gray-600">
                You agree to use Events4Students responsibly and not to:
                <ul className="list-disc pl-6 mt-2">
                  <li>Violate any laws or regulations.</li>
                  <li>Post false, misleading, or harmful content.</li>
                  <li>Interfere with the platform’s functionality, including through hacking or spamming.</li>
                  <li>Impersonate others or misrepresent your affiliation.</li>
                </ul>
                Violations may result in content removal, account suspension, or legal action.
              </div>
            </section>

            {/* Event Cancellations and Refunds */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Event Cancellations and Refunds</h2>
              <div className="text-gray-600">
                Events4Students facilitates event management but is not responsible for event execution or cancellations. Event organizers are responsible for:
                <ul className="list-disc pl-6 mt-2">
                  <li>Notifying attendees of cancellations or changes promptly.</li>
                  <li>Handling refunds or disputes according to their stated policies.</li>
                </ul>
                Attendees should contact organizers directly for refund requests. Events4Students is not liable for financial losses related to event cancellations.
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-600">
                All content on Events4Students, including the logo, design, and code, is owned by Events4Students or its licensors. You may not copy, reproduce, or distribute our content without permission, except as allowed for event promotion within the platform. User-generated content remains your property, but you grant us a license to use it as described in Section 4.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Limitation of Liability</h2>
              <div className="text-gray-600">
                Events4Students provides the platform "as is" and is not liable for:
                <ul className="list-disc pl-6 mt-2">
                  <li>Errors, inaccuracies, or omissions in event content.</li>
                  <li>Losses or damages arising from platform use or event participation.</li>
                  <li>Service interruptions due to technical issues or maintenance.</li>
                </ul>
                To the fullest extent permitted by law, Events4Students is not liable for any indirect, incidental, or consequential damages.
              </div>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Termination</h2>
              <p className="text-gray-600">
                We may suspend or terminate your access to Events4Students at our discretion, including for violations of these Terms or inactivity. Upon termination, your account and content may be removed, but these Terms&apos; provisions on liability and intellectual property will survive.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Governing Law</h2>
              <p className="text-gray-600">
                These Terms are governed by the laws of Bangladesh. Any disputes will be resolved in the courts of Dhaka, Bangladesh.
              </p>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Contact Us</h2>
              <p className="text-gray-600">
                If you have questions about these Terms, please contact us at{' '}
                <a href="mailto:support@events4students.com" className="text-blue-500 hover:underline">
                  support@events4students.com
                </a>.
              </p>
            </section>
          </div>

          {/* Last Updated */}
          <p className="text-center text-gray-500 mt-8">
            Last Updated: July 4, 2025
          </p>

          {/* CTA */}
          <div className="text-center mt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="btn btn-primary btn-lg">
                Explore Events
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}