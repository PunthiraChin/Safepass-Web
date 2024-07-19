import Joi from "joi";
// สร้าง register schema เขียนเหมือนกับ backend แต่เพิ่ม customized error message
const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .required()
    .messages({ "string.empty": "Current password is required" }),
  newPassword: Joi.string()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .when("googleId", {
      is: Joi.exist(),
      then: Joi.forbidden(),
      otherwise: Joi.required().messages({
        "string.empty": "New password is required",
        "string.pattern.base":
          "New Password must be at least 6 characters and contain only alphabets and numbers",
      }),
    }),
  confirmNewPassword: Joi.string()
    .required()
    .valid(Joi.ref("newPassword"))
    .messages({
      "string.empty": "Confirm password is required",
      "any.only": "Password and Confirm Password does not match",
    }),
});
// validate input โดยใช้ schema ที่สร้างขึ้นมา

const validateChangePassword = (input) => {
  const { error } = changePasswordSchema.validate(input, { abortEarly: false });
  console.dir(error);
  if (error) {
    const result = error.details.reduce((acc, element) => {
      acc[element.path[0]] = element.message;
      return acc;
    }, {});
    return result;
  }
  // result : [{email:"xxxx", password:"xxxxx", confirmPassword: "xxxx"}]
};

export default validateChangePassword;
