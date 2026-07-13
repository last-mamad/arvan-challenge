import * as Yup from "yup";

export type FormFieldConfig<TValues> = {
  name: keyof TValues & string;
  label: string;
  type?: "text" | "password" | "email";
};

export const validationSchema = Yup.object({
  username: Yup.string().required("Required field"),
  password: Yup.string().required("Required field"),
});

export type SignInValues = Yup.InferType<typeof validationSchema>;

export const signInInitialValues: SignInValues = { username: "", password: "" };

export const signInFields: FormFieldConfig<SignInValues>[] = [
  { name: "username", label: "Username" },
  { name: "password", label: "Password", type: "password" },
];
