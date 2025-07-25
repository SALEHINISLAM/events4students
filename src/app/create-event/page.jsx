"use client";
import RichTextEditor from "@/components/RichTextEditor/TextEditor";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

export default function CreateEventPage() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      coverPhotoType: "file",
    },
  });

  const coverPhotoType = watch("coverPhotoType");
  //submit handler
  const onSubmit = async (data) => {
    console.log(data);
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
        } else if (key === "verificationDocument") {
          if (data[key] && data[key].length > 0) {
            formData.append(key, data[key][0]);
          }
        } else if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      }

      const response = await fetch("/api/create-event", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const result = await response.json();
      console.log("Event created:", result);
      alert("Event created successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to create event. Please try again.");
    }
  };

  return (
    <div data-theme="light" className="">
      <div className="container mx-auto p-2">
        <h1 className="text-6xl text-center font-extrabold">Create Event</h1>
        <p className="text-xs text-center">
          To know more about how we works click on the link below
        </p>
        <div className="text-center items-center justify-center">
          <Link href={"/how-it-works"} className="link btn-link ">
            How We Works?
          </Link>
        </div>

        <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Event Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow">
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
                  {...register("endDate", { required: "End date is required" })}
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
                defaultValue="<p>Enter event details here...</p>"
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
                {errors.registrationLink && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.registrationLink.message}
                  </p>
                )}
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
                {errors.eventWebsite && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.eventWebsite.message}
                  </p>
                )}
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
                {errors.socialMediaLink && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.socialMediaLink.message}
                  </p>
                )}
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
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Venue or Online Platform"
                {...register("location")}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Event Cover Photo *
              </label>
              <div className="flex space-x-4 mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register("coverPhotoType", {
                      required: "Please select a cover photo type",
                    })}
                    className="mr-2"
                    value="file"
                  />
                  Upload File
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register("coverPhotoType")}
                    className="mr-2"
                    value="url"
                  />
                  Image URL
                </label>
              </div>
              {coverPhotoType === "file" ? (
                <input
                  type="file"
                  className="w-full p-2 border rounded"
                  accept="image/*"
                  {...register("coverPhotoFile", {
                    required:
                      coverPhotoType === "file" ? "Cover photo is required" : false,
                  })}
                />
              ) : (
                <input
                  type="url"
                  className="w-full p-2 border rounded"
                  placeholder="https://..."
                  {...register("coverPhotoUrl", {
                    required:
                      coverPhotoType === "url" ? "Image URL is required" : false,
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
              {(errors.coverPhotoFile || errors.coverPhotoUrl || errors.coverPhotoType) && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.coverPhotoFile?.message ||
                    errors.coverPhotoUrl?.message ||
                    errors.coverPhotoType?.message}
                </p>
              )}
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

          {/* Personal Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Your Information</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Full Name *
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="John Doe"
                {...register("fullName", { required: "Full name is required" })}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  placeholder="john.doe@example.com"
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

            <div className="mb-4" id="organizerRoleField">
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
              <input
                type="file"
                className="w-full p-2 border rounded"
                accept="image/*,.pdf"
                {...register("verificationDocument")}
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload a document that proves your affiliation with the
                organization (ID card, authorization letter, etc.)
              </p>
              {errors.verificationDocument && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.verificationDocument.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Submit Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
