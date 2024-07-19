import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import useAuthContext from "../../../hooks/useAuthContext";
import { USER_ROLE } from "../../../constants/backend-config";

export default function RedirectLogin({ children }) {
  const navigate = useNavigate();
  const { authUser, isAuthUserLoading } = useAuthContext();
  if (authUser?.role === USER_ROLE.ADMIN && !isAuthUserLoading) {
    return <Navigate to="/admin" />;
  }
  return (
    <>
      {isAuthUserLoading && <Spinner />}
      {children}
    </>
  );
}
