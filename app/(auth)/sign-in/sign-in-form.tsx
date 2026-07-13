"use client";

import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

import {
  signInFields,
  signInInitialValues,
  validationSchema,
} from "@/app/(auth)/sign-in/form-schema";
import { Field } from "@/components/design-system/field";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/section";
import { showToast } from "@/components/ui/toast";
import { login } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { useAuthStore } from "@/lib/store/auth-store";
import Footer from "../_components/Footer";

function SignInForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data);
      router.push("/dashboard");
    },
    onError: (error) => {
      showToast({
        type: "error",
        title: "Sign-in Failed!",
        description: error instanceof ApiError ? error.message : "Something went wrong",
      });
    },
  });

  const formik = useFormik({
    initialValues: signInInitialValues,
    validationSchema,
    onSubmit: (values) => {
      loginMutation.mutate({ username: values.username, password: values.password });
    },
  });

  return (
    <Section title="Sign in">
      <form onSubmit={formik.handleSubmit} className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full flex-col items-start gap-3">
          {signInFields.map((field) => {
            const error = formik.touched[field.name] ? formik.errors[field.name] : undefined;

            return (
              <Field
                key={field.name}
                htmlFor={field.name}
                labelText={field.label}
                required={false}
                message={!!error}
                messageText={error}
              >
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={!!error}
                />
              </Field>
            );
          })}
        </div>
        <Footer
          href="/sign-up"
          isPending={loginMutation.isPending}
          linkText="Sign up now"
          linkTitle="Don't have an account?"
          primaryButtonText="Sign in"
        />
      </form>
    </Section>
  );
}

export { SignInForm };
