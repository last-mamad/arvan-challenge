"use client";

import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

import { Field } from "@/components/design-system/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/section";
import { showToast } from "@/components/ui/toast";
import { ApiError } from "@/lib/api/client";
import { login } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/auth-store";

// There's no real sign-up API, so on success we log the new user in with a
// fixed dummyjson account and treat that as their session.
const SIGN_UP_FALLBACK_CREDENTIALS = { username: "emilys", password: "emilyspass" };

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required field"),
  username: Yup.string().required("Required field"),
  password: Yup.string().min(6, "At least 6 characters").required("Required field"),
});

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
    initialValues: { email: "", username: "", password: "" },
    validationSchema,
    onSubmit: () => {
      signUpMutation.mutate();
    },
  });

  return (
    <Section title="Sign up">
      <form onSubmit={formik.handleSubmit} className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full flex-col items-start gap-3">
          <Field
            htmlFor="email"
            labelText="Email"
            required={false}
            message={!!(formik.touched.email && formik.errors.email)}
            messageText={formik.errors.email}
          >
            <Input
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={!!(formik.touched.email && formik.errors.email)}
            />
          </Field>
          <Field
            htmlFor="username"
            labelText="Username"
            required={false}
            message={!!(formik.touched.username && formik.errors.username)}
            messageText={formik.errors.username}
          >
            <Input
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={!!(formik.touched.username && formik.errors.username)}
            />
          </Field>
          <Field
            htmlFor="password"
            labelText="Password"
            required={false}
            message={!!(formik.touched.password && formik.errors.password)}
            messageText={formik.errors.password}
          >
            <Input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={!!(formik.touched.password && formik.errors.password)}
            />
          </Field>
        </div>
        <div className="flex w-full flex-col items-center gap-3">
          <Button type="submit" className="w-full" loading={signUpMutation.isPending}>
            Sign up
          </Button>
          <div className="flex items-start gap-2">
            <span className="text-body2 text-neutral-fg1">Already have an account?</span>
            <Button variant="link" asChild>
              <Link href="/sign-in">Sign in now</Link>
            </Button>
          </div>
        </div>
      </form>
    </Section>
  );
}

export { SignUpForm };
