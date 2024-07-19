import React from "react";
import Button from "../../components/Button";
import coverImage from "../../../../assets/coverImage2.jpg";

export default function WhatIsSafepass() {
  return (
    <div className="w-full h-auto pt-16 relative">
      <div className="w-full overflow-hidden" style={{ maxHeight: "600px" }}>
        <img className="w-full h-auto object-cover" src={coverImage} />
      </div>
      <div className="absolute inset-0 flex flex-col gap-24 justify-center items-center">
        <div className="flex flex-col gap-12">
          <div className="text-5xl font-extrabold text-teal-50">
            NFT TICKET AND PASS PLATFORM
            <br /> THAT YOU CAN TRUST
          </div>
          <div className="text-2xl font-bold text-teal-50">
            Authentic NFT Ticket on Blockchain. No More FAKE ticket.
          </div>
        </div>
        <div className="md-10">
          <Button>Explore Events</Button>
        </div>
      </div>
    </div>
  );
}
