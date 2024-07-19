import axios from "../config/axios";
const adminApi = {};
adminApi.createNewEvent = (formData) => axios.post("/admin/events", formData);
adminApi.deleteEvent = (eventId) => axios.delete(`/admin/events/${eventId}`);
adminApi.editEvent = (eventId, formData) =>
  axios.put(`/admin/events/${eventId}`);
export default adminApi;
