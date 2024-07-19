import { useContext } from "react";
import { AuthContext } from "../features/authentication/contexts/AuthContext";

export default function useAuthContext() {
  return useContext(AuthContext);
}
