"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";

export default function BannerSection() {
  return (
    <div>
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero min-h-[60vh] bg-gradient-to-r from-primary to-secondary text-white"
      >
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <motion.h1
              className="text-3xl md:text-5xl font-bold mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Discover Exciting Student Competitions
            </motion.h1>
            <motion.p
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Join hackathons, poster presentations, case competitions, and
              more!
            </motion.p>
            <Link href="/create-event">
              <motion.button
                className="btn btn-accent"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Create an Event
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
