"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import "@/components/CSSFile/styles.scss"
import ShowEventDetails from "@/components/RichTextEditor/ShowEventDetails";
import Head from "next/head";

export default function EventPage() {
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const router = useRouter();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/get-single-event/${id}`);
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setEvent(data.event);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to load event details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleImageClick = () => {
    setIsImageModalOpen(true);
    setZoomLevel(1); // Reset zoom level when opening modal
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 3)); // Max zoom: 3x
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5)); // Min zoom: 0.5x
  };

  const handleCloseModal = () => {
    setIsImageModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-black">
      <Head>
        <title>{event?.title || "See Event Details"}</title>
        <meta property="og:title" content={event?.title || "See Event Details"} key="title" />
      </Head>
      {/* Hero Section with Cover Image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hero min-h-[50vh] bg-base-200 tooltip"
        data-tip="Click to view full image"
        style={{
          backgroundImage: `url(${event.coverPhotoUrl || "/placeholder.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={handleImageClick}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-white">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <p className="text-lg">
              {new Date(event.startDate).toLocaleDateString()} -{" "}
              {new Date(event.endDate).toLocaleDateString()}
            </p>
            <p className="text-lg">{event.location}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Fullscreen Image Modal */}
      {isImageModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-4xl w-full h-[80vh]"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <motion.img
              src={event.coverPhotoUrl || "/placeholder.jpg"}
              alt={event.title}
              className="w-full h-full object-contain"
              style={{ transform: `scale(${zoomLevel})` }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <motion.button
                className="btn btn-circle btn-primary"
                onClick={handleZoomIn}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                +
              </motion.button>
              <motion.button
                className="btn btn-circle btn-primary"
                onClick={handleZoomOut}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                -
              </motion.button>
              <motion.button
                className="btn btn-circle btn-error"
                onClick={handleCloseModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Event Details */}
      <section className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose max-w-none"
            >
              <h2 className="text-2xl font-bold mb-4">Event Description</h2>
              <div
                className="mb-6 prose"
              >
              <ShowEventDetails detailHTML={event?.description} />
              </div>
            </motion.div>

            {event.eventType && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-2">Event Type</h3>
                <p className="badge badge-primary">{event.eventType}</p>
              </motion.div>
            )}
          </div>

          {/* Sidebar with Additional Info */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card bg-base-100 shadow-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Event Details</h3>
              <ul className="space-y-2">
                {event.organizerInstitution && (
                  <li>
                    <strong>Organizer:</strong> {event.organizerInstitution}
                  </li>
                )}
                {event.location && (
                  <li>
                    <strong>Location:</strong> {event.location}
                  </li>
                )}
                {event?.startDate && (
                  <li>
                    <strong>Start Date:</strong>{" "}
                    {new Date(event.startDate).toLocaleDateString()}
                  </li>
                )}
                {event.endDate && (
                  <li>
                    <strong>End Date:</strong>{" "}
                    {new Date(event.endDate).toLocaleDateString()}
                  </li>
                )}
                <li>
                  <strong>Verified Event:</strong>{" "}
                  {event?.isVerified === true ? "Yes" : "No"}
                </li>
              </ul>

              <div className="mt-6 space-y-4">
                {event.registrationLink && (
                  <motion.a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register Now
                  </motion.a>
                )}
                {event.eventWebsite && (
                  <motion.a
                    href={event.eventWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Visit Event Website
                  </motion.a>
                )}
                {event.socialMediaLink && (
                  <motion.a
                    href={event.socialMediaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-accent btn-block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Follow on Social Media
                  </motion.a>
                )}
                {event.organizerSocialMediaLink && (
                  <motion.a
                    href={event.organizerSocialMediaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Organizer's Social Media
                  </motion.a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <section className="container mx-auto pb-12 px-4">
        <motion.button
          className="btn btn-outline"
          onClick={() => router.push('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Events
        </motion.button>
      </section>
    </div>
  );
}
