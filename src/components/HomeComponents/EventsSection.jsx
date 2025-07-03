"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import EventCard from "./SingleEvent/EventCard";
import Head from "next/head";

export default function EventsSection() {
  const { register, handleSubmit } = useForm();
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchEvents = async (pageNum, query = "") => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/get-events?page=${pageNum}&search=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      console.log(data);
      if (pageNum === 1) {
        setEvents(data.events);
      } else {
        setEvents((prev) => [...prev, ...data.events]);
      }
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(1);
  }, []);

  const onSearch = (data) => {
    setSearchQuery(data.search);
    setPage(1);
    fetchEvents(1, data.search);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
    fetchEvents(page + 1, searchQuery);
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    events: events.map((event) => ({
      '@type': 'Event',
      name: event.title,
      startDate: new Date(event.startDate).toISOString(),
      endDate: new Date(event.endDate).toISOString(),
      location: {
        '@type': 'Place',
        name: event.location,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Dhaka',
          addressCountry: 'BD',
        },
      },
      image: event.coverPhotoUrl || '/placeholder.jpg',
      url: `${process.env.NEXT_BASE_URL || 'https://www.event4student.com/'}/events/${event._id}`,
    })),
  };

  return (
    <div>
      <Head>
        <title>Discover Student Events - Events4Students</title>
        <meta
          name="description"
          content="Find and join exciting student events at BUET and beyond with Events4Students. Explore workshops, seminars, and more!"
        />
        <meta name="keywords" content="student events, BUET events, university events, Events4Students, campus activities, hackathon, mechathon, techathon, case competition, research, poster presentation, competition in bangladesh, business competition" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      {/* Search Bar */}
      <section className="container mx-auto py-8 px-4">
        <form onSubmit={handleSubmit(onSearch)} className="flex justify-center">
          <div className="form-control w-full max-w-md">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search events..."
                className="input input-bordered w-full"
                {...register("search")}
              />
              <motion.button
                className="btn btn-primary"
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </motion.button>
            </div>
          </div>
        </form>
      </section>

      {/* Events Section */}
      <section className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </AnimatePresence>
        </motion.div>
        {isLoading && (
          <div className="text-center mt-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        {hasMore && !isLoading && (
          <div className="text-center mt-8">
            <motion.button
              className="btn btn-primary"
              onClick={loadMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More
            </motion.button>
          </div>
        )}
      </section>
    </div>
  );
}
