"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import RichTextEditor from "@/components/RichTextEditor/TextEditor";
import Image from "next/image";

export default function EditEventPage() {
  const router = useRouter();
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      coverPhotoType: "url",
    },
  });

  const coverPhotoType = watch("coverPhotoType");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/admin/events/edit/${id}`);
        const data = await response.json();
        if (data.success) {
          setEventData(data.event);
          setPreviewImage(data.event.coverPhotoUrl);
          reset({
            eventTitle: data.event.title,
            startDate: data.event.startDate
              ? new Date(data.event.startDate).toISOString().slice(0, 16)
              : "",
            endDate: data.event.endDate
              ? new Date(data.event.endDate).toISOString().slice(0, 16)
              : "",
            eventDescription: data.event.description,
            eventType: data.event.eventType,
            registrationLink: data.event.registrationLink,
            eventWebsite: data.event.eventWebsite,
            socialMediaLink: data.event.socialMediaLink,
            location: data.event.location,
            organizerInstitution: data.event.organizerInstitution,
            organizerWebsite: data.event.organizerWebsite,
            organizerSocialMediaLink: data.event.organizerSocialMediaLink,
            fullName: data.event.fullName,
            email: data.event.email,
            contactNumber: data.event.contactNumber,
            isOrganizer: data.event.isOrganizer,
            organizerRole: data.event.organizerRole,
            isVerified: data.event.isVerified,
          });
        } else {
          alert(data.message || "Failed to load event");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        alert("Failed to load event");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key of Object.keys(data)) {
        if (key === "coverPhotoFile" && data.coverPhotoType === "file") {
          if (data[key] && data[key].length > 0) {
            formData.append("coverPhoto", data[key][0]);
          }
        } else if (key === "coverPhotoUrl" && data.coverPhotoType === "url") {
          if (data[key]) {
            formData.append("coverPhoto", data[key]);
          }
        }
        if (key === "coverPhoto" || key === "verificationDocument") {
          if (data[key] && data[key].length > 0) {
            formData.append(key, data[key][0]);
          }
        } else if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      }

      const response = await fetch(`/api/admin/events/edit/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        alert("Event updated successfully!");
        router.push("/admin");
      } else {
        alert("Failed to update event");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update event");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 p-6 text-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6">
            Edit Event: {eventData?.title}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Event Basic Information */}
            <div className="bg-base-100 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Event Information</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Environment Fest"
                  {...register("eventTitle", {
                    required: "Event title is required",
                  })}
                />
                {errors.eventTitle && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.eventTitle.message}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date *
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full p-2 border rounded"
                    {...register("startDate", {
                      required: "Start date is required",
                    })}
                  />
                  {errors.startDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.startDate.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Date *
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full p-2 border rounded"
                    {...register("endDate", {
                      required: "End date is required",
                    })}
                  />
                  {errors.endDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.endDate.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Event Description *
                </label>
                <RichTextEditor
                  name="eventDescription"
                  control={control}
                  defaultValue={eventData?.description}
                />
                {errors.eventDescription && (
                  <p className="text-red-500 text-xs mt-1">
                    Event description is required
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Registration Link
                  </label>
                  <input
                    type="url"
                    className="w-full p-2 border rounded"
                    placeholder="https://..."
                    {...register("registrationLink")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Event Website
                  </label>
                  <input
                    type="url"
                    className="w-full p-2 border rounded"
                    placeholder="https://..."
                    {...register("eventWebsite")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Event Social Media Link
                  </label>
                  <input
                    type="url"
                    className="w-full p-2 border rounded"
                    placeholder="https://..."
                    {...register("socialMediaLink")}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Event Type *
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="eventType"
                      className="mr-2"
                      value="remote"
                      {...register("eventType", {
                        required: "Event type is required",
                      })}
                    />
                    Remote
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="eventType"
                      className="mr-2"
                      value="onsite"
                      {...register("eventType")}
                    />
                    On-Site
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="eventType"
                      className="mr-2"
                      value="hybrid"
                      {...register("eventType")}
                    />
                    Hybrid
                  </label>
                </div>
                {errors.eventType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.eventType.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Venue or Online Platform"
                  {...register("location")}
                />
              </div>

              {/* cover photo */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Event Cover Photo *
                </label>
                {previewImage && (
                  <div className="mb-4">
                    <Image
                      src={previewImage}
                      width={1000}
                      height={800}
                      alt="Event Cover Image"
                      className="max-w-sm rounded"
                    />
                  </div>
                )}
                <div className="flex space-x-4 mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      {...register("coverPhotoType", {
                        required: "Please select a cover photo type.",
                      })}
                      className="mr-2"
                      value={"file"}
                    />
                    Upload File
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      {...register("coverPhotoType")}
                      className="mr-2"
                      value={"url"}
                      checked
                    />
                    Image URL
                  </label>
                </div>
                {coverPhotoType === "file" ? (
                  <input
                    type="file"
                    className="w-full p-2 border rounded"
                    accept="image/*"
                    {...register("coverPhotoFile")}
                    onChange={handleImageChange}
                  />
                ) : (
                  <input
                    type="url"
                    className="w-full p-2 border rounded"
                    placeholder="https://..."
                    defaultValue={eventData?.coverPhotoUrl}
                    {...register("coverPhotoUrl", {
                      pattern: {
                        value: /^https?:\/\/.+/,
                        message: "Please enter a valid URL",
                      },
                    })}
                  />
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Recommended size: 1200x630 pixels
                </p>
                {(errors.coverPhotoFile ||
                  errors.coverPhotoUrl ||
                  errors.coverPhotoType) && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.coverPhotoFile?.message ||
                      errors.coverPhotoUrl?.message ||
                      errors.coverPhotoType?.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Verified Event
                </label>
                <input
                  type="checkbox"
                  className="toggle"
                  {...register("isVerified")}
                />
              </div>
            </div>

            <div className="bg-base-100 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Organizer Information
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Organizing Institution/Club *
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="University of XYZ"
                  {...register("organizerInstitution", {
                    required: "Organizer is required",
                  })}
                />
                {errors.organizerInstitution && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.organizerInstitution.message}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Organizer Website
                  </label>
                  <input
                    type="url"
                    className="w-full p-2 border rounded"
                    placeholder="https://..."
                    {...register("organizerWebsite")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Social Media Link
                  </label>
                  <input
                    type="url"
                    className="w-full p-2 border rounded"
                    placeholder="https://..."
                    {...register("organizerSocialMediaLink")}
                  />
                </div>
              </div>
            </div>

            <div className="bg-base-100 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Contact Information
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="John Doe"
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded"
                    placeholder="email@example.com"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    className="w-full p-2 border rounded"
                    placeholder="+1234567890"
                    {...register("contactNumber", {
                      required: "Contact number is required",
                    })}
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.contactNumber.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Are you part of the organizing committee? *
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="isOrganizer"
                      className="mr-2"
                      value="yes"
                      {...register("isOrganizer", {
                        required: "This field is required",
                      })}
                    />
                    Yes
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="isOrganizer"
                      className="mr-2"
                      value="no"
                      {...register("isOrganizer")}
                    />
                    No
                  </label>
                </div>
                {errors.isOrganizer && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.isOrganizer.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Your Role in the Organization
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Event Coordinator"
                  {...register("organizerRole")}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Verification Document
                </label>
                {eventData?.verificationDocUrl && (
                  <div className="mb-4">
                    <a
                      href={eventData.verificationDocUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Current Verification Document
                    </a>
                  </div>
                )}
                <input
                  type="file"
                  className="w-full p-2 border rounded"
                  accept="image/*,.pdf"
                  {...register("verificationDocument")}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload a new document if you want to update the existing one
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <motion.button
                type="button"
                onClick={() => router.push("/admin")}
                className="btn btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Update Event
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
