"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function layout({ children }) {
  const handleLogOut = async () => {
    await signOut();
    window.location.href = "/admin/login";
  };
  return (
    <div className="text-black bg-base-100 min-h-screen">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link href={"/admin"} className="btn btn-ghost text-xl">
            Event4Student
          </Link>
        </div>
        <div className="flex-none">
          <button className="btn btn-ghost btn-error" onClick={handleLogOut}>
            Logout
          </button>
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
}
