import { createContext, useEffect, useState } from "react";
import eventApi from "../apis/eventAPI";
export const eventContext = createContext();

export default function EventContextProvider({ children }) {
  const [allEvents, setAllEvents] = useState([]);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const fetchEventData = async () => {
    try {
      const allEventData = await eventApi.getAllEvents();
      setAllEvents(allEventData.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUserLoading(false);
    }
  };
  useEffect(() => {
    fetchEventData();
  }, []);
  return (
    <eventContext.Provider
      value={{
        allEvents,
        isUserLoading,
        selectedEventId,
        setSelectedEventId,
        fetchEventData,
      }}
    >
      {children}
    </eventContext.Provider>
  );
}
