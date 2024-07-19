import React from "react";
import { useNavigate } from "react-router-dom";
import useEventContext from "../hooks/useEventContext";
import convert_datetime from "../utils/convert-datetime";
import Button from "./Button";

export default function EventCard({
  imgSrc = "https://picsum.photos/200",
  eventName = "Mock Event Name",
  startDateTime = "10 MAY 2024",
  endDateTime = "11 MAY 2024",
  avenue = "TBC",
  eventId,
}) {
  const { selectedEventId, setSelectedEventId } = useEventContext();
  const navigate = useNavigate();
  const handleSeeEventDetails = (e) => {
    const targetEventId = e.target.id;
    // set selected Event id for next page downloading details
    setSelectedEventId(targetEventId);
    // if user clicks any event >> redirect to event details page
    navigate(`/event/${targetEventId}`);
  };

  return (
    <div className="flex flex-col w-80 bg-neutral-700 rounded-2xl shadow-md shadow-neutral-950">
      <img
        className="w-80 h-80 bg-contain rounded-t-2xl"
        src={imgSrc}
        alt="event_photo"
      />
      <div className="flex flex-col gap-3 py-4 px-6">
        <div>{eventName}</div>
        <div>{`${convert_datetime(startDateTime)} - ${convert_datetime(
          endDateTime
        )}`}</div>
        <div>{avenue}</div>
      </div>
      <div className="mx-auto px-6 pb-4">
        <Button id={eventId} onClick={handleSeeEventDetails}>
          Buy Now
        </Button>
      </div>
    </div>
  );
}
