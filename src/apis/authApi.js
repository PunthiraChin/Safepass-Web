import axios from "../config/axios";

const authApi = {};
// Register New User
authApi.register = (body) => axios.post("/auth/register", body);
// Login Existing User
authApi.login = (body) => axios.post("/auth/login", body);
authApi.getAuthUser = () => axios.get("/auth/getMe");
export default authApi;
