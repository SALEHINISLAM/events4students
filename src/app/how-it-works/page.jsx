"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HowItWorks() {
  const steps = [
    {
      title: "Create Your Event",
      description:
        "Visit /create-event and fill out the form with all necessary details about your event, including title, dates, description, and more.",
      svg: (
        <svg
          className="w-16 h-16 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Create Event"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Admin Review",
      description:
        "Our team thoroughly reviews your event details to ensure accuracy and compliance. We aim to approve within 24 hours.",
      svg: (
        <svg
          className="w-16 h-16 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Admin Review"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Event Published",
      description:
        "Once approved, your event is displayed on our homepage for all users to discover and engage with.",
      svg: (
        <svg
          className="w-16 h-16 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Event Published"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Social Media Boost",
      description:
        "We promote your event on our Facebook page for free, reaching a wider audience to boost attendance.",
      svg: (
        <svg
          className="w-16 h-16 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Social Media Boost"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
          ></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <header className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center "
          >
            How It Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-center mt-4 text-gray-200"
          >
            Discover how easy it is to create and promote your event with Event4Student!
          </motion.p>
        </div>
      </header>

      {/* Steps Section */}
      <section className="container mx-auto py-12 px-4">
        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col md:flex-row items-center gap-6 bg-base-100 card shadow-xl p-6"
            >
              <div className="flex-shrink-0">{step.svg}</div>
              <div>
                <h2 className="text-2xl font-semibold text-primary">
                  Step {index + 1}: {step.title}
                </h2>
                <p className="text-base md:text-lg text-gray-600 mt-2">
                  {step.description}
                </p>
                {index === 0 && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/create-event"
                      className="mt-4 btn btn-primary"
                      aria-label="Create your event now"
                    >
                      Create Your Event Now
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold"
          >
            Ready to Share Your Event?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-gray-200 mt-4"
          >
            Start creating your event today and let Event4Student help you reach a wider audience!
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/create-event"
              className="mt-6 btn btn-white"
              aria-label="Get started creating your event"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}