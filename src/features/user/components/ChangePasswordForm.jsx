import { useState } from "react";
import { AxiosError } from "axios";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import useAuthContext from "../../../hooks/useAuthContext";
import { toast } from "react-toastify";
import validateChangePassword from "../../authentication/validators/validate-change-password";
const initialInput = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};
const initialInputError = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export default function ChangePasswordForm({ onClose }) {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);
  const { changePassword } = useAuthContext();
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setInputError(initialInputError);
  };
  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      // Validate input ด้วย joi schema ก่อน
      const error = validateChangePassword(input);
      console.log("error from login validation", error);
      // ถ้า validate แล้วมี error >> จบการทำงานและ set error message
      if (error) {
        return setInputError(error);
      }
      // ถ้า validate ผ่าน ให้เรียก API backend
      setInputError(initialInputError);
      await changePassword(input);
      onClose();
      toast.success("Change Password Successfully");
      // close modal
    } catch (err) {
      // ถ้ายิง API login ที่ BE แล้วไม่สำเร็จ จะมี error กลัยมา
      console.log("error from API", err);
      if (err instanceof AxiosError) {
        console.log("error from changepassword", err.response);
        if (err.response.field === "currentPassword") {
          // กรณีที่ validate backend แล้ว email/password ไม่ตรง หรือไม่มี ให้ set error ไว้ที่ field "password"
          setInputError((prev) => ({
            ...prev,
            currentPassword: err.response.message,
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
            placeholder="Current password"
            name="currentPassword"
            type="password"
            value={input.currentPassword}
            error={inputError.currentPassword}
            onChange={handleInput}
          />
          <Input
            placeholder="New password"
            name="newPassword"
            value={input.newPassword}
            type="password"
            error={inputError.newPassword}
            onChange={handleInput}
          />
          <Input
            placeholder="Confirm New Password"
            name="confirmNewPassword"
            value={input.confirmNewPassword}
            type="password"
            error={inputError.confirmNewPassword}
            onChange={handleInput}
          />
          <Button
            onClick={handleSubmitForm}
            bg="primary"
            color="primary"
            border="primary"
            width="large"
          >
            Confirm
          </Button>
        </div>
      </div>
    </form>
  );
}
