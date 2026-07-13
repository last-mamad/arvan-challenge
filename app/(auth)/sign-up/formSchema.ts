import * as Yup from "yup";

export type FormFieldConfig<TValues> = {
  name: keyof TValues & string;
  label: string;
  type?: "text" | "password" | "email";
};

export const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required field"),
  username: Yup.string().required("Required field"),
  password: Yup.string().min(6, "At least 6 characters").required("Required field"),
});

export type SignUpValues = Yup.InferType<typeof validationSchema>;

export const signUpInitialValues: SignUpValues = { email: "", username: "", password: "" };
export const SIGN_UP_FALLBACK_CREDENTIALS = { username: "emilys", password: "emilyspass" };

export const signUpFields: FormFieldConfig<SignUpValues>[] = [
  { name: "email", label: "Email" },
  { name: "username", label: "Username" },
  { name: "password", label: "Password", type: "password" },
];

