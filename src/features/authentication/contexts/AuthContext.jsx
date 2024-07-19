// สิ่งที่ทำใน AuthContext >> แล้วเอา context นี้กระจายต่อให้ทั้ง website ใช้งานอีกที
// 0. Fetch User data upon การเปิด website โดยจะเช็คก่อนว่ามี access token อยู่มั้ย ถ้ามีก็ set auth user เลย
// 1. login จะ setAccessToken และจะ setAuthUser
// 2. logout

import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import authApi from "../../../apis/authApi";
import userApi from "../../../apis/userApi";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "../../../utils/local-storage";
export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthUserLoading, setIsAuthUserLoading] = useState(true);
  const [isUserDataUpdated, setIsUserDataUpdated] = useState(false);

  // สร้าง function ในการ fetch user เมื่อ first render (เปิดเว็ปขึ้นมา) >> ถ้า fetch user ไม่ได้ >> แปลว่า user ยังไม่ได้ login อยู่
  useEffect(() => {
    const fetchUser = async () => {
      try {
        //Check if accessToken exists in Localstorage >> if yes >> reload user
        if (getAccessToken()) {
          const getUserResult = await authApi.getAuthUser();
          setAuthUser(getUserResult.data.userProfile);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsAuthUserLoading(false);
      }
    };
    fetchUser();
  }, [isUserDataUpdated]);
  // function ในการ login และ set accesstoken to localstorage
  const login = async (loginInput) => {
    const loginResult = await authApi.login(loginInput);
    // Set Access token
    setAccessToken(loginResult.data.accessToken);
    // Get and set AuthUser
    const getUserResult = await authApi.getAuthUser();
    console.log("getUserResult", getUserResult.data.userProfile);
    setAuthUser(getUserResult.data.userProfile);
  };
  const logout = async () => {
    removeAccessToken();
    setAuthUser(null);
    toast.success("Logout successfully");
  };
  const changePassword = async (changePasswordInput) => {
    // call API
    const changePasswordResult = await userApi.changePassword(
      changePasswordInput
    );
    console.log("change password result", changePasswordResult);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        login,
        logout,
        isAuthUserLoading,
        isUserDataUpdated,
        setIsUserDataUpdated,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
