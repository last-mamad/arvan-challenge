"use client";

import {
  SIGN_UP_FALLBACK_CREDENTIALS,
  signUpFields,
  signUpInitialValues,
  validationSchema,
} from "@/app/(auth)/sign-up/form-schema";
import { Field } from "@/components/design-system/field";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/section";
import { showToast } from "@/components/ui/toast";
import { login } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { useAuthStore } from "@/lib/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Footer from "../_components/Footer";

function SignUpForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const signUpMutation = useMutation({
    mutationFn: () => login(SIGN_UP_FALLBACK_CREDENTIALS),
    onSuccess: (data) => {
      setAuth(data);
      router.push("/dashboard");
    },
    onError: (error) => {
      showToast({
        type: "error",
        title: "Sign-up Failed!",
        description: error instanceof ApiError ? error.message : "Something went wrong",
      });
    },
  });

  const formik = useFormik({
    initialValues: signUpInitialValues,
    validationSchema,
    onSubmit: () => {
      signUpMutation.mutate();
    },
  });

  return (
    <Section title="Sign up">
      <form onSubmit={formik.handleSubmit} className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full flex-col items-start gap-3">
          {signUpFields.map((field) => {
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
          href="/sign-in"
          isPending={signUpMutation.isPending}
          linkText="Sign in now"
          linkTitle="Already have an account?"
          primaryButtonText="Sign up"
        />
      </form>
    </Section>
  );
}

export { SignUpForm };
