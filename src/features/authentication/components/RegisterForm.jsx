import { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import authApi from "../../../apis/authApi";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import validateRegister from "../validators/validate-register";
const initialInput = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
};
const initialInputError = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
};
export default function RegisterForm({
  userRequestRegisterStatus,
  setUserRequestRegisterStatus,
  onSuccess,
}) {
  const [input, setInput] = useState(initialInput); //{email:"email", password:"password", confirmPassword:"confirmPassword"}
  const [inputError, setInputError] = useState(initialInputError);
  const handleInput = (e) => {
    // Set state จากค่าที่ input เข้ามาใน input box
    setInput({ ...input, [e.target.name]: e.target.value });
    setInputError(initialInputError);
  };
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      // Validate Input ก่อนที่จะ submit form ก่อน
      const error = validateRegister(input);
      // ถ้า validate แล้วไม่มี error จะ return undefined แต่ถ้ามี error ให้จบ function เลย
      if (error) {
        return setInputError(error);
      }
      // ถ้า validate ผ่าน >> 1.เปลี่ยน error message กลับเป้นค่าว่าง 2.เรียก API เพื่อ register user to backend
      setInputError({ ...initialInputError });
      await authApi.register(input);
      // ถ้า validate จาก backend แล้วผ่าน >> ปิด modal และเปลี่ยน state "isUserRequestRegistration กลับเป็น false"
      // ถ้า validate ไม่ผ่าน >> ได้ axios error มาจาก backend >> ไป handle ใน catch block
      onSuccess();
      toast.success("Register successfully");
    } catch (err) {
      console.log("Error from registration", err);
      // Handle error โดยถ้าเป็น error จาก backend (จะเป็น error จาก axios)
      if (err instanceof AxiosError) {
        if (err.response.data.field === "email") {
          setInputError((prev) => ({
            ...prev,
            email: err.response.message,
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
            value={input.email}
            onChange={handleInput}
            type="text"
            error={inputError.email}
          />
          <Input
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={handleInput}
            type="password"
            error={inputError.password}
          />
          <Input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={handleInput}
            type="password"
            error={inputError.confirmPassword}
          />
          <Input
            placeholder="Firstname"
            name="firstName"
            value={input.firstName}
            onChange={handleInput}
            type="text"
            error={inputError.firstName}
          />
          <Input
            placeholder="Lastname"
            name="lastName"
            value={input.lastName}
            onChange={handleInput}
            type="text"
            error={inputError.lastName}
          />
          <Button bg="primary" color="primary" border="primary" width="large">
            Register
          </Button>
        </div>
        {/* <div className="flex flex-col gap-2 items-center">
          <div className="w-full border border-neutral-800"></div>
          <p>OR</p>
          <Button
            bg="secondary"
            color="secondary"
            border="secondary"
            width="large"
          >
            Register with Google
          </Button>
        </div> */}
      </div>
    </form>
  );
}
