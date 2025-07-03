'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

export default function EventCard({ event }) {
  return (
    <motion.div
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <figure>
        <Image
          src={event.coverPhotoUrl || '/placeholder.jpg'}
          alt={event.title}
          width={500}
          height={300}
          className="h-52 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{event.title}</h2>
        <p className="text-sm text-gray-600">
          {new Date(event.startDate).toLocaleDateString()} -{' '}
          {new Date(event.endDate).toLocaleDateString()}
        </p>
        <p className="text-sm">{event.location}</p>
        <div className="card-actions justify-end mt-4">
          <Link href={`/see-event-details/${event._id}`}>
            <motion.button
              className="btn btn-primary btn-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}