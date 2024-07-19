/// Config axios ที่ใช้สำหรับการ communicate กับ Owned Backend 
// 1.  set base url
// 2. set intercepter เพื่อให้ check access token บน local storage ก่อน ถ้าเจอ ให้ add to request header ให้เลย 

import axios from "axios";
import { getAccessToken } from "../utils/local-storage";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// กรณีที่ request เราเช็คได้ว่า มี access token อยู่ใน local storage >> เราจะ set header อัตโนมัติ ให้มี bearer token เอาไว้เลย ตอนที่ไปหา backend จะได้มี authenticate ผ่านเพราะมี header แล้ว
axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default axios;
