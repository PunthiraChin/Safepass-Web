import { AxiosError } from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import adminApi from "../../../apis/adminApi";
import Button from "../../../components/Button";
import TopicAndDetails from "../../../components/TopicAndDetails";
import useEventContext from "../../../hooks/useEventContext";
import convert_datetime from "../../../utils/convert-datetime";
import { adminEventContext } from "../contexts/AdminEventContext";

export default function EventTable() {
  const { eventAction, setEventAction } = useContext(adminEventContext);
  const navigate = useNavigate();
  const { allEvents, fetchEventData } = useEventContext();
  console.log(allEvents);
  const openCreateNewEventPage = () => {
    setEventAction("create");
    return navigate("/admin/event");
  };
  const handleDeleteEvent = (e) => {
    Swal.fire({
      text: "Are you sure you want to delete this event?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#00AF9D",
      color: "white",
      background: "#383838",
    })
      .then((result) => {
        if (result.isConfirmed) {
          const eventId = e.target.id;
          console.log("Trying to delete event");
          // ต้อง return promise result มาจาก api call
          return adminApi.deleteEvent(eventId);
        } else {
          // ถ้ากด cancel delete
          return Promise.reject("Cancel Delete");
          // return
        }
      })
      .then(() => {
        // ถ้า promise is resolved
        Swal.fire({
          text: "Delete Success",
          confirmButtonColor: "#00AF9D",
          color: "white",
          background: "#383838",
        });
        fetchEventData();
        navigate("/admin");
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          console.log("error delete", err);
          const message = err.response.data.message;
          Swal.fire({
            title: "Delete Failed",
            text: `${message}`,
            icon: "error",
            confirmButtonColor: "#00AF9D",
            color: "white",
            background: "#383838",
          });
        }
      });
  };
  const handleSeeEventDetails = (e) => {
    setEventAction("view");
    return navigate(`/admin/event/${e.target.id}`);
  };
  const handleEditEvent = (e) => {
    setEventAction("edit");
    return navigate(`/admin/event/${e.target.id}`);
  };

  return (
    <div className="w-full py-10 flex flex-col gap-12">
      <TopicAndDetails
        topic="All Events"
        details="List of all events created"
        withButton={true}
        buttonName="+ Add new event"
        onClick={openCreateNewEventPage}
      />
      <div className="p-8 mx-4 rounded-xl bg-neutral-700">
        {allEvents?.map((event, index) => (
          <div
            key={index}
            className="grid grid-cols-6 py-2 border-b-2 border-neutral-600"
          >
            <div className="grid-col-span-1">{event.id}</div>
            <div>{event.name}</div>
            <div>{convert_datetime(event.startDateTime)}</div>
            <div>{convert_datetime(event.endDateTime)}</div>
            <div className="col-span-2 flex justify-center gap-2 ">
              <Button id={event.id} onClick={handleSeeEventDetails}>
                View
              </Button>
              {/* <Button
                id={event.id}
                onClick={handleEditEvent}
                bg="ghost"
                color="ghost"
                border="ghost"
              >
                Edit
              </Button> */}
              <Button
                id={event.id}
                onClick={handleDeleteEvent}
                bg="orange"
                color="orange"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
