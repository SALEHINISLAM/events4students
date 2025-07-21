'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function AdminPage() {
  const [unapprovedEvents, setUnapprovedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUnapprovedEvents = async () => {
      try {
        const response = await fetch('/api/admin/events/unapproved');
        const data = await response.json();
        if (data.success) {
          setUnapprovedEvents(data.events);
        }
      } catch (error) {
        console.error('Error fetching unapproved events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUnapprovedEvents();
  }, []);

  const handleApprove = async (eventId) => {
    try {
      const response = await fetch(`/api/admin/events/approve/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminApproval: true }),
      });
      if (response.ok) {
        setUnapprovedEvents((prev) => prev.filter((event) => event._id !== eventId));
        alert('Event approved successfully!');
      } else {
        alert('Failed to approve event');
      }
    } catch (error) {
      console.error('Error approving event:', error);
      alert('Failed to approve event');
    }
  };

  return (
    <div className="min-h-screen bg-base-100 p-6 text-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

          {/* Navigation */}
          <div className="tabs mb-8">
            <a className="tab tab-bordered tab-active">Approve Events</a>
            <Link href="/admin/delete" className="tab tab-bordered">
              Delete/Modify Events
            </Link>
          </div>

          {/* Unapproved Events */}
          <h2 className="text-2xl font-semibold mb-4">Unapproved Events</h2>
          {isLoading ? (
            <div className="text-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : unapprovedEvents.length === 0 ? (
            <p className="text-gray-500">No unapproved events found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unapprovedEvents.map((event) => (
                <motion.div
                  key={event._id}
                  className="card bg-base-100 shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <figure>
                    <img
                      src={event.coverPhotoUrl || '/placeholder.jpg'}
                      alt={event.title}
                      className="h-48 w-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(event.startDate).toLocaleDateString()} -{' '}
                      {new Date(event.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm">{event.location}</p>
                    <div className="card-actions justify-end mt-4">
                      <motion.button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleApprove(event._id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Approve
                      </motion.button>
                      <Link href={`/admin/edit/${event._id}`}>
                        <motion.button
                          className="btn btn-secondary btn-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Edit
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}