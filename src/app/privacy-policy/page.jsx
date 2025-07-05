"use client";
import { motion } from "motion/react";
import Link from "next/link";
import Head from "next/head";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-base-100">
      <Head>
        <title>Privacy Policy - Event4Student</title>
        <meta
          name="description"
          content="Learn how Event4Student, a BUET-born platform, protects your data and privacy while managing and discovering student events."
        />
        <meta
          name="google-adsense-account"
          content={process.env.NEXT_Google_Adsense_Account}
        ></meta>
        <meta
          name="keywords"
          content="Event4Student, privacy policy, student events, BUET events, data protection"
        />
        <meta property="og:title" content="Privacy Policy - Event4Student" />
        <meta
          property="og:description"
          content="Understand how Event4Student safeguards your personal information and ensures a secure event management experience."
        />
        <meta property="og:image" content="/logo.svg" />
        <meta
          property="og:url"
          content={`${
            process.env.NEXTAUTH_URL || "http://localhost:3000"
          }/privacy`}
        />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Privacy Policy",
              description:
                "Privacy Policy for Event4Student, a platform for managing and discovering student events.",
              url: `${
                process.env.NEXT_BASE_URL || "https://www.event4student.com"
              }/privacy-policy`,
              publisher: {
                "@type": "Organization",
                name: "Event4Student",
                logo: {
                  "@type": "ImageObject",
                  url: "https://lh3.googleusercontent.com/d/1i0dOoct_qiA185n2aAA-ywrXQBx3kaF1",
                },
              },
            }),
          }}
        />
      </Head>

      {/* Privacy Content */}
      <div className="container mx-auto py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
            Privacy Policy
          </h1>
          <p className="text-center text-gray-600 mb-8">
            At Event4Student, we are committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, share, and safeguard
            your personal information while you use our platform to manage and
            discover student events.
          </p>

          <div className="space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-600">
                Event4Student, a BUET-born platform, is dedicated to connecting
                students, event organizers, and administrators through seamless
                event management. We value your trust and are committed to
                protecting your personal information. This Privacy Policy
                applies to our website (event4student.com), mobile apps, and
                services. By using Event4Student, you consent to the practices
                described in this policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                2. Information We Collect
              </h2>
              <p className="text-gray-600">
                We collect information to provide and improve our services. This
                includes:
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    <strong>Personal Information:</strong> When you register an
                    account, submit events, or contact us, we may collect your
                    name, email address, phone number, and institutional
                    affiliation (e.g., BUET).
                  </li>
                  <li>
                    <strong>Event Data:</strong> Information you provide when
                    creating events, such as titles, descriptions, dates,
                    locations, and images.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Information about how you
                    interact with our platform, including IP address, browser
                    type, pages visited, and timestamps.
                  </li>
                  <li>
                    <strong>Cookies:</strong> We use cookies to enhance your
                    experience, such as remembering your login preferences. You
                    can manage cookie settings in your browser.
                  </li>
                </ul>
              </p>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-600">
                We use your information to:
                <ul className="list-disc pl-6 mt-2">
                  <li>Facilitate event creation, approval, and promotion.</li>
                  <li>
                    Send notifications about event approvals, updates, or new
                    events.
                  </li>
                  <li>
                    Improve our platform&apos;s functionality and user
                    experience.
                  </li>
                  <li>Analyze usage trends to enhance our services.</li>
                  <li>Respond to your inquiries or support requests.</li>
                </ul>
              </p>
            </section>

            {/* Sharing Your Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                4. Sharing Your Information
              </h2>
              <p className="text-gray-600">
                We do not sell your personal information. We may share your
                information:
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    With event organizers to facilitate event registration or
                    communication.
                  </li>
                  <li>
                    With service providers (e.g., email or hosting services) who
                    assist in operating our platform, under strict
                    confidentiality agreements.
                  </li>
                  <li>
                    When required by law or to protect the safety and rights of
                    Event4Student or its users.
                  </li>
                </ul>
                Event data (e.g., event titles, descriptions) may be publicly
                displayed on our platform to promote events.
              </p>
            </section>

            {/* Data Storage and Security */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                5. Data Storage and Security
              </h2>
              <p className="text-gray-600">
                We store your information on secure servers and use
                industry-standard measures (e.g., encryption) to protect it.
                However, no system is completely secure, and we cannot guarantee
                absolute security. You are responsible for maintaining the
                confidentiality of your account credentials.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                6. Your Rights
              </h2>
              <p className="text-gray-600">
                You have the right to:
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    Access, update, or delete your personal information by
                    contacting us.
                  </li>
                  <li>
                    Opt out of non-essential communications (e.g., promotional
                    emails) via email preferences.
                  </li>
                  <li>
                    Request a copy of your data or restrict its use, where
                    applicable under local laws.
                  </li>
                </ul>
                To exercise these rights, contact us at{" "}
                <a
                  href="mailto:msionlinekingdom@gmail.com"
                  className="text-blue-500 hover:underline"
                >
                  msionlinekingdom@gmail.com
                </a>
                .
              </p>
            </section>

            {/* Cookies and Tracking */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                7. Cookies and Tracking
              </h2>
              <p className="text-gray-600">
                We use cookies and similar technologies to enhance your
                experience and analyze usage. You can disable cookies in your
                browser, but this may limit platform functionality. We may use
                analytics tools (e.g., Google Analytics) to track page views and
                user behavior, as described in Section 2.
              </p>
            </section>

            {/* Third-Party Links */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                8. Third-Party Links
              </h2>
              <p className="text-gray-600">
                Our platform may contain links to third-party websites (e.g.,
                event registration pages). We are not responsible for the
                privacy practices of these sites. Please review their policies
                before sharing information.
              </p>
            </section>

            {/* International Users */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                9. International Users
              </h2>
              <p className="text-gray-600">
                Event4Student is based in Bangladesh. If you access our platform
                from outside Bangladesh, your data may be transferred to and
                stored in Bangladesh. By using our platform, you consent to this
                transfer. For users in the EU, we comply with GDPR requirements,
                including data minimization and user rights.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                10. Changes to This Policy
              </h2>
              <p className="text-gray-600">
                We may update this Privacy Policy to reflect changes in our
                practices or legal requirements. Updates will be posted on this
                page, and significant changes will be communicated via email or
                platform notifications.
              </p>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                11. Contact Us
              </h2>
              <p className="text-gray-600">
                If you have questions about this Privacy Policy, please contact
                us at{" "}
                <a
                  href="mailto:msionlinekingdom@gmail.com"
                  className="text-blue-500 hover:underline"
                >
                  msionlinekingdom@gmail.com
                </a>
                .
              </p>
            </section>
          </div>

          {/* Last Updated */}
          <p className="text-center text-gray-500 mt-8">
            Last Updated: July 4, 2025
          </p>

          {/* CTA */}
          <div className="text-center mt-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
