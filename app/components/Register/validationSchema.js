import * as Yup from "yup";

export const userValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("please, insert a valid email")
    .required("Insert an email"),
  password: Yup.string()
    .required("Please, insert a password"),
  confirmPassword: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password"), null], "The passwords must match"),
});