import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function PublicNavbar() {
  return (
    <div data-theme="light" className="navbar text-black bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link href={"/"}>
          <Image
            src={
              "https://lh3.googleusercontent.com/d/1i0dOoct_qiA185n2aAA-ywrXQBx3kaF1"
            }
            alt="Logo"
            width={120}
            height={80}
          />
        </Link>
      </div>
      <div className="flex-none">
        <Link className="btn btn-ghost" href={"/create-event"}>
        Create Event
        </Link>
      </div>
    </div>
  );
}
