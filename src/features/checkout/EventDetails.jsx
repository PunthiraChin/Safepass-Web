import React from "react";
import Button from "../../components/Button";
import { ImageIcon, LocationIcon, TimeIcon, UserIcon } from "../../icons";
import convert_datetime from "../../utils/convert-datetime";

export default function EventDetails({ eventDetails, handleClickBuy }) {
  return (
    <div className="w-full px-48 bg-neutral-800 ">
      <div className="w-full py-10 flex gap-12 justify-between">
        <div className="flex-1 flex flex-col gap-12 ">
          <p className="text-4xl font-semibold">{eventDetails.name}</p>
          <div className=" flex flex-col gap-4">
            <div className="">
              <p className="text-xl font-semibold">Event Organizer</p>
              <div className="flex gap-2">
                <UserIcon />
                <p>{eventDetails.organizer}</p>
              </div>
            </div>
            <div className="">
              <p className="text-xl font-semibold">Date & Time</p>
              <div className="flex gap-2">
                <TimeIcon />
                <p>
                  {convert_datetime(eventDetails.startDateTime)} -{" "}
                  {convert_datetime(eventDetails.endDateTime)}
                </p>
              </div>
            </div>
            <div className="">
              <p className="text-xl font-semibold">Avenue</p>
              <div className="flex gap-2">
                <LocationIcon />
                <p>{eventDetails.avenue}</p>
              </div>
            </div>
            <div className="">
              <p className="text-xl font-semibold">Description</p>
              <div className="flex gap-2">
                <p>{eventDetails.details}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-8">
          <div className="min-w-48 h-60 bg-neutral-700 rounded-xl flex flex-col justify-center items-center gap-4">
            <img
              className="w-40 h-40 rounded-full overflow-hidden"
              src={"https://picsum.photos/seed/picsum/300/300"}
            ></img>
            <p className="text-xl font-semibold">{eventDetails.artist}</p>
          </div>
          {handleClickBuy ? (
            <Button onClick={handleClickBuy}>Buy Now</Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
