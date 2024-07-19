import { createContext, useState } from "react";

export const adminEventContext = createContext();
export default function AdminEventContextProvider({ children }) {
  const [eventAction, setEventAction] = useState("view");
  return (
    <adminEventContext.Provider value={{ eventAction, setEventAction }}>
      {children}
    </adminEventContext.Provider>
  );
}
