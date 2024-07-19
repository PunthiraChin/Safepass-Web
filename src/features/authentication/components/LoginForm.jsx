import { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authApi from "../../../apis/authApi";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import useAuthContext from "../../../hooks/useAuthContext";
import validateLogin from "../validators/validate-login";

const initialInput = {
  email: "",
  password: "",
};
const initialInputError = {
  email: "",
  password: "",
};

export default function LoginForm({
  userRequestRegisterStatus,
  setUserRequestRegisterStatus,
  onSuccess,
}) {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);
  const { authUser, setAuthUser, login, isAuthUserLoading } = useAuthContext();
  const navigate = useNavigate();
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setInputError(initialInputError);
  };
  const handleClickRegister = () => {
    if (!userRequestRegisterStatus) {
      setUserRequestRegisterStatus(true);
    }
  };
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      // Validate input ด้วย joi schema ก่อน
      const error = validateLogin(input);
      // console.log("error from login validation", error);
      // ถ้า validate แล้วมี error >> จบการทำงานและ set error message
      if (error) {
        return setInputError(error);
      }
      // ถ้า validate ผ่าน ให้เรียก API backend
      setInputError(initialInputError);
      await login(input);
      onSuccess();
      toast.success("Login successfully");
      navigate("/");
    } catch (err) {
      // ถ้ายิง API login ที่ BE แล้วไม่สำเร็จ จะมี error กลัยมา
      console.log("error from API", err);
      if (err instanceof AxiosError) {
        if (err.response.data.statusCode === 401) {
          // กรณีที่ validate backend แล้ว email/password ไม่ตรง หรือไม่มี ให้ set error ไว้ที่ field "password"
          setInputError((prev) => ({
            ...prev,
            password: err.response.message,
          }));
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmitForm}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Email"
            name="email"
            type="text"
            value={input.email}
            error={inputError.email}
            onChange={handleInput}
          />
          <Input
            placeholder="Password"
            name="password"
            value={input.password}
            type="password"
            error={inputError.password}
            onChange={handleInput}
          />
          <Button
            onClick={handleSubmitForm}
            bg="primary"
            color="primary"
            border="primary"
            width="large"
          >
            Login
          </Button>
        </div>
        {/* Disable Login with Google */}
        {/* <div className="flex flex-col gap-2 items-center">
          <p>OR</p>
          <Button
            bg="secondary"
            color="secondary"
            border="secondary"
            width="mid"
          >
            Login with Google
          </Button>
        </div> */}
        <div className="flex flex-col gap-2 items-center">
          <div className="w-full border border-neutral-800"></div>
          <p>New to SAFEPASS?</p>
          <Button
            onClick={handleClickRegister}
            bg="ghost"
            color="ghost"
            border="ghost"
            width="mid"
          >
            Register
          </Button>
        </div>
      </div>
    </form>
  );
}
