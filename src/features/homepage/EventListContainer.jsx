import React from "react";
import EventCard from "../../components/EventCard";
import TopicAndDetails from "../../components/TopicAndDetails";
import useEventContext from "../../hooks/useEventContext";

export default function EventListContainer() {
  const { allEvents } = useEventContext();
  return (
    <div className="w-full py-10 flex flex-col gap-12">
      <TopicAndDetails
        topic="Upcoming Events"
        details="Discover Events That suits you"
        withButton={true}
      />
      <div className="grid grid-cols-3 gap-8 mx-auto">
        {allEvents.map((event, index) => {
          return (
            <EventCard
              imgSrc={event.profileImage}
              key={index}
              eventId={event.id}
              eventName={event.name}
              startDateTime={event.startDateTime}
              endDateTime={event.endDateTime}
              avenue={event.avenue}
            />
          );
        })}
      </div>
    </div>
  );
}
