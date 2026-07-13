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

const validationSchema = Yup.object({
  email: Yup.string().required("Required field"),
  password: Yup.string().required("Required field"),
});

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
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      loginMutation.mutate({ username: values.email, password: values.password });
    },
  });

  return (
    <Section title="Sign in">
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
          <Button type="submit" className="w-full" loading={loginMutation.isPending}>
            Sign in
          </Button>
          <div className="flex items-baseline gap-2">
            <span className="text-body2 text-neutral-fg1">Don&apos;t have an account?</span>
            <Link href="/sign-up" prefetch>
              <Button variant="link">
                Sign up now
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </Section>
  );
}

export { SignInForm };
