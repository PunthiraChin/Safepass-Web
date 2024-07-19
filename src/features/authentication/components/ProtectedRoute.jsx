// 1. ถ้าพยายามจะเข้าหน้าที่ protect route ไว้ และ useAuth ยังเป็นค่าว่าง >> จะ redirect ไปที่หน้า Home เลย แล้วค่อยว่ากัน
// 2. แค่ถ้า useAuth มีแล้ว >> จะสามารถไปต่อได้

import React, { Children } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import useAuthContext from "../../../hooks/useAuthContext";

export default function ProtectedRoute({ children }) {
  const { authUser, isAuthUserLoading } = useAuthContext();
  if (!authUser && !isAuthUserLoading) {
    return <Navigate to="/" />;
  }
  return (
    <>
      {isAuthUserLoading && <Spinner />}
      {children}
    </>
  );
}
