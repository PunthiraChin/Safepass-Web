import Joi from "joi";
// สร้าง register schema เขียนเหมือนกับ backend แต่เพิ่ม customized error message
const registerSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ tlds: false })
    .messages({ "string.empty": "Email is required" }),
  password: Joi.string()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .when("googleId", {
      is: Joi.exist(),
      then: Joi.forbidden(),
      otherwise: Joi.required().messages({
        "string.empty": "Password is required",
        "string.pattern.base":
          "Password must be at least 6 characters and contain only alphabets and numbers",
      }),
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "Confirm Password is required",
    "any.only": "Password and Confirm Password does not match",
  }),
  googleId: Joi.string(),
  firstName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "Firstname is required" }),
  lastName: Joi.string()
    .required()
    .trim()
    .messages({ "string.empty": "Lastname is required" }),
});
// validate input โดยใช้ schema ที่สร้างขึ้นมา

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, { abortEarly: false });
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

export default validateRegister;
