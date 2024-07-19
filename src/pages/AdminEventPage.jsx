import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import eventApi from "../apis/eventAPI";
import TopicAndDetails from "../components/TopicAndDetails";
import EventForm from "../features/admin/components/EventForm";
import Spinner from "../components/Spinner";
import { adminEventContext } from "../features/admin/contexts/AdminEventContext";

const initialInput = {
  name: "",
  details: "",
  artist: "",
  organizer: "",
  avenue: "",
  coverImage: "",
  profileImage: "",
  seatMapImage: "",
  contractAddress: "",
  startDateTime: "",
  endDateTime: "",
  ticketTypes: [],
};
const initialInputError = {
  name: "",
  details: "",
  artist: "",
  organizer: "",
  avenue: "",
  coverImage: "",
  profileImage: "",
  seatMapImage: "",
  contractAddress: "",
  startDateTime: "",
  endDateTime: "",
  ticketTypes: [],
};
const initialTicketTypeInput = {
  id: "",
  name: "",
  details: "",
  maximumSeat: "",
  remainingSeat: "",
  ticketImage: "",
  price: "",
};

export default function AdminEventPage() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  // State สำหรับ eventDataInput
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);
  const [inputTicketTypeArr, setInputTicketTypeArray] = useState([]);
  // Context เพื่อใช้ในการจัดการกับ action ของ admin (view, edit,create)
  const { eventAction, setEventAction } = useContext(adminEventContext);
  let ticketTypeIdArr = [];

  // ต้อง fetch Event Details ขึ้นมา ถ้ามี
  useEffect(() => {
    setIsUserLoading(true);
    const fetchEventData = async (eventId) => {
      try {
        const result = await eventApi.getEventDetailsById(eventId);
        console.log("Fetch data result", result);
        // clean data และเอามาเก็บเป็น Initial State
        let rawEventData = { ...result.data };
        rawEventData.startDateTime = rawEventData.startDateTime.slice(0, -8);
        rawEventData.endDateTime = rawEventData.endDateTime.slice(0, -8);
        delete rawEventData.id;
        delete rawEventData.createdAt;
        delete rawEventData.updatedAt;
        delete rawEventData.ticketTypes;
        setEventDetails(result.data);
        setInput(rawEventData);
        // ต้องแปลง id ก่อน ให้กลายเป็น 0,1,2,3,... เพราะตอนนี้หาไม่เจอ
        let rawTicketTypeArr = [...result.data.ticketTypes];
        for (let i = 0; i < rawTicketTypeArr.length; i++) {
          // เอาค่า id ของแต่ละ ticketType มาเก็บไว้ใน key ชื่อ ticketTypeId ก่อน เพื่อเอาไว้ใช้ต่อตอนส่งข้อมูลไป update ที่ Backend แต่ว่ามันจะเกิน
          ticketTypeIdArr.push(rawTicketTypeArr[i].id);
          // ใส่ค่า id ใหม่ โดยเร่ื่มต้นจาก 0 >> ค่านี้จะไปใช้ map ตอนที่เอา initial value ไปแสดงใน event Form เพราะต้องเริ่มจาก 0
          rawTicketTypeArr[i].id = i;
          // ลบ field eventId ออกเพราะว่า field นี้จะไม่มีใน inputTicketTypeArr
          delete rawTicketTypeArr[i].eventId;
        }
        console.log("rawTicketTypeArr", rawTicketTypeArr);
        setInputTicketTypeArray(rawTicketTypeArr);
      } catch (err) {
        console.log("Err from fetch event data", err);
      } finally {
        setIsUserLoading(false);
      }
    };
    fetchEventData(eventId);
  }, []);

  return (
    // เช็ีคว่า user load data อยู่มั้ย >> เช็คว่าเป็นเคสที่ create new event (ไม่มี event ID) หรือเป็นเคสที่ see details/edit event >> ถ้าเป็น เช็คเพิ่มก่อน ว่า data load มารึยัง ถ้าโหลดแล้วถึงค่อย render
    <>
      {isUserLoading ? (
        <Spinner />
      ) : (
        <div className="w-full px-48 py-16 bg-neutral-800">
          <TopicAndDetails
            topic={eventId ? "Event Details" : "Create New Event"}
            details=""
            textSize="small"
          />
          {eventDetails ? (
            <EventForm
              eventId={eventId}
              input={input}
              setInput={setInput}
              inputError={inputError}
              setInputError={setInputError}
              inputTicketTypeArr={inputTicketTypeArr}
              setInputTicketTypeArray={setInputTicketTypeArray}
              ticketTypeIdArr={ticketTypeIdArr}
            />
          ) : eventId ? null : (
            <EventForm
              eventId={eventId}
              input={input}
              setInput={setInput}
              inputError={inputError}
              setInputError={setInputError}
              inputTicketTypeArr={inputTicketTypeArr}
              setInputTicketTypeArray={setInputTicketTypeArray}
              ticketTypeIdArr={ticketTypeIdArr}
            />
          )}
        </div>
      )}
    </>
  );
}
