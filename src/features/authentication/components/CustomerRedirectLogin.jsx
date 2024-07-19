import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { USER_ROLE } from "../../../constants/backend-config";
import useAuthContext from "../../../hooks/useAuthContext";

export default function CustomerRedirectLogin({ children }) {
  const navigate = useNavigate();
  const { authUser, isAuthUserLoading } = useAuthContext();
  if (authUser?.role === USER_ROLE.CUSTOMER && !isAuthUserLoading) {
    return <Navigate to="/" />;
  }
  return (
    <>
      {isAuthUserLoading && <Spinner />}
      {children}
    </>
  );
}
