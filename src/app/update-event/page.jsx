"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import RichTextEditor from "@/components/RichTextEditor/TextEditor";

export default function UpdateEventPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1 = verify, 2 = edit
  const [eventData, setEventData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // Extract event ID from URL
  const extractEventId = (url) => {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split("/");
      return pathParts[pathParts.length - 1];
    } catch (e) {
      return null;
    }
  };
  //https://www.event4student.com/event/68663cb69fca445a243eac1f
  // Verify event and security code
  const verifyEvent = async (data) => {
    try {
      const eventId = extractEventId(data.eventUrl);
      if (!eventId) throw new Error("Invalid event URL");

      const response = await fetch("/api/verify-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          securityCode: data.securityCode,
        }),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Verification failed");

      setEventData(result.event);
      setPreviewImage(result.event.coverPhotoUrl);
      reset({
        eventTitle: result.event.title,
        startDate: result.event.startDate
          ? new Date(result.event.startDate).toISOString().slice(0, 16)
          : "",
        endDate: result.event.endDate
          ? new Date(result.event.endDate).toISOString().slice(0, 16)
          : "",
        eventDescription: result.event.description,
        eventType: result.event.eventType,
        registrationLink: result.event.registrationLink,
        eventWebsite: result.event.eventWebsite,
        socialMediaLink: result.event.socialMediaLink,
        location: result.event.location,
        organizerInstitution: result.event.organizerInstitution,
        organizerWebsite: result.event.organizerWebsite,
        organizerSocialMediaLink: result.event.organizerSocialMediaLink,
        isOrganizer: result.event.isOrganizer,
        organizerRole: result.event.organizerRole,
      });
      setStep(2);
    } catch (error) {
      alert(error.message || "Verification failed. Please check your details.");
    }
  };

  // Update event handler
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key of Object.keys(data)) {
        if (key === "coverPhoto" || key === "verificationDocument") {
          if (data[key] && data[key].length > 0) {
            formData.append(key, data[key][0]);
          }
        } else if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      }

      const response = await fetch(`/api/updateSingleEvents/${eventData._id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Update failed");

      alert("Event updated successfully!");
      //router.push(`/see-event-details/${eventData._id}`);
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update event");
    }
  };

  // Handle image preview for new uploads
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div data-theme="light" className="">
      <div className="container mx-auto p-2">
        {step === 1 ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <h1 className="text-xl font-semibold mb-4">Update Event</h1>
            <p className="text-xs">You can update event only if you post it and have the security code that we provide through email.</p>
            <form onSubmit={handleSubmit(verifyEvent)} className="space-y-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Event URL *
                </label>
                <input
                  type="url"
                  className="w-full p-2 border rounded"
                  placeholder="https://www.event4student.com/see-event-details/abc123"
                  {...register("eventUrl", {
                    required: "Event URL is required",
                  })}
                />
                {errors.eventUrl && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.eventUrl.message}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Paste the full URL of your event
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Security Code *
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter your 6-digit code"
                  {...register("securityCode", {
                    required: "Security code is required",
                    pattern: {
                      value: /^[A-Z0-9]{6}$/,
                      message: "Must be 6 alphanumeric characters",
                    },
                  })}
                />
                {errors.securityCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.securityCode.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Verify and Continue
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="text-xl font-semibold mb-4">
              Update Event: {eventData.title}
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.tagName !== "BUTTON") {
                  e.preventDefault();
                }
              }}
            >
              {/* Event Basic Information */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">
                  Event Information
                </h2>

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

                <div className="bg-white mb-4 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">
                    Event Description *
                  </h2>
                  <RichTextEditor
                    name="eventDescription"
                    control={control}
                    defaultValue={eventData.description}
                  />
                  {errors.eventDescription && (
                    <p className="text-red-500 text-sm mt-1">
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
                      Event Social Media Link (Facebook Event)
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

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Event Cover Photo
                  </label>
                  {previewImage && (
                    <div className="mb-4">
                      <img
                        src={previewImage}
                        alt="Cover Preview"
                        className="max-w-xs rounded"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    className="w-full p-2 border rounded"
                    accept="image/*"
                    {...register("coverPhoto")}
                    onChange={handleImageChange}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended size: 1200x630 pixels
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
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

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Your Information</h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded bg-gray-100"
                    value={eventData.fullName}
                    readOnly
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded bg-gray-100"
                      value={eventData.email}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      className="w-full p-2 border rounded bg-gray-100"
                      value={eventData.contactNumber}
                      readOnly
                    />
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
                    Verification Document (Proof of Affiliation)
                  </label>
                  {eventData.verificationDocUrl && (
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
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2 border rounded hover:bg-gray-100 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Update Event
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
