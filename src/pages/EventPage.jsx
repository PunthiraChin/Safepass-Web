import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import eventApi from "../apis/eventAPI";
import { LoginModalContext } from "../contexts/LoginModalContext";
import LoginContainer from "../features/authentication/components/LoginContainer";
import SeatMap from "../features/checkout/components/SeatMap";
import EventCover from "../features/checkout/EventCover";
import EventDetails from "../features/checkout/EventDetails";
import useAuthContext from "../hooks/useAuthContext";
import useEventContext from "../hooks/useEventContext";

export default function EventPage() {
  // const { selectedEventId, setSelectedEventId } = useEventContext();
  const { authUser, setAuthUser, isAuthUserLoading } = useAuthContext();
  const { isLoginModalOpen, setIsLoginModalOpen } =
    useContext(LoginModalContext);
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const navigate = useNavigate();
  // fetch event details by eventId from Backend first time render
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const result = await eventApi.getEventDetailsById(eventId);
        setEventDetails(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvent();
  }, []);

  // useEffect(() => {}, [isLoginModalOpen]);

  const handleClickBuy = () => {
    console.log("In HandleClickBuy ");
    console.log("authUser", authUser);
    console.log("LoginModalOpen?", isLoginModalOpen);
    // เช็คก่อนว่า authUser อยู่มั้ย ถ้าใช่ ให้ไปหน้าต่อไปได้ ถ้าไม่ใช่ และ login popup ไม่ได้เปิดอยู่ ให้เด้ง loginContainer ขึ้นมา
    if (!authUser) {
      return setIsLoginModalOpen(true);
    }
    //
    navigate(`/event/${eventId}/checkout`);
  };

  return (
    <div className="w-full py-16 min-h-screen">
      <EventCover
        coverImageUrl={eventDetails.coverImage}
        handleClickBuy={handleClickBuy}
      />
      <EventDetails
        eventDetails={eventDetails}
        handleClickBuy={handleClickBuy}
      />
      <SeatMap eventDetails={eventDetails} />
      <LoginContainer />
    </div>
  );
}
