import React, { useContext, useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { LoginModalContext } from "../../../contexts/LoginModalContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginContainer() {
  const { isLoginModalOpen, setIsLoginModalOpen } =
    useContext(LoginModalContext);
  const [userRequestRegisterStatus, setUserRequestRegisterStatus] =
    useState(false);

  useEffect(() => {
    if (userRequestRegisterStatus) setUserRequestRegisterStatus(false);
  }, [isLoginModalOpen]);

  return (
    <div>
      {isLoginModalOpen ? (
        userRequestRegisterStatus ? (
          <Modal
            title="Register"
            children={
              <RegisterForm
                userRequestRegisterStatus={userRequestRegisterStatus}
                setUserRequestRegisterStatus={setUserRequestRegisterStatus}
                onSuccess={() => setIsLoginModalOpen(false)}
              />
            }
            onClick={() => setIsLoginModalOpen(false)}
          />
        ) : (
          <Modal
            title="Login"
            children={
              <LoginForm
                userRequestRegisterStatus={userRequestRegisterStatus}
                setUserRequestRegisterStatus={setUserRequestRegisterStatus}
                onSuccess={() => setIsLoginModalOpen(false)}
              />
            }
            onClick={() => setIsLoginModalOpen(false)}
          />
        )
      ) : null}
    </div>
  );
}
