import { useContext } from "react";
import { eventContext } from "../contexts/EventContext";

export default function useEventContext() {
  return useContext(eventContext);
}
