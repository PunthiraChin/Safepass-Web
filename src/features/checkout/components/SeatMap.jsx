import React from "react";
import TopicAndDetails from "../../../components/TopicAndDetails";

export default function SeatMap({ eventDetails }) {
  return (
    <div className="w-full px-48 pb-8 bg-neutral-800 ">
      <div className="w-full">
        <p className="text-xl font-semibold">Seat Map</p>
        <img className="w-full p-4" src={eventDetails.seatMapImage} />
      </div>
    </div>
  );
}
