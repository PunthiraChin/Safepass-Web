import axios from "../config/axios";
const userApi = {};
userApi.getAllUserTransactions = () => axios.get("/users/transactions");

userApi.changePassword = (body) => axios.patch("/users/change-password", body);
export default userApi;
