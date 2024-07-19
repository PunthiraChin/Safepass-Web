import axios from "../config/axios";

const eventApi = {};

eventApi.getAllEvents = () => axios.get("/events");
eventApi.getEventDetailsById = (eventId) => axios.get(`/events/${eventId}`);
export default eventApi;
