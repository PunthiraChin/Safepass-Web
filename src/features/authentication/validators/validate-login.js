import Joi from "joi";
const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "string.empty": "Email is required" }),
  password: Joi.string()
    .required()
    .messages({ "string.empty": "Password is required" }),
});

const validateLogin = (input) => {
  const { error } = loginSchema.validate(input, {
    abortEarly: false,
  });
  console.dir(error);
  // ถ้าไม่มี error จะ return undefined
  if (error) {
    const result = error.details.reduce((acc, element) => {
      acc[element.path[0]] = element.message;
      return acc;
    }, {});
    return result;
  }
};
export default validateLogin;
