// Note: use to control open/close status of LoginContainer (status = true >> model is open, status = false >> modal is closed)
import React, { createContext, useState } from "react";
export const LoginModalContext = createContext();
export function LoginModalContextProvider({ children }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  return (
    <LoginModalContext.Provider
      value={{ isLoginModalOpen, setIsLoginModalOpen }}
    >
      {children}
    </LoginModalContext.Provider>
  );
}
