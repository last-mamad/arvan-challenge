import type { Metadata } from "next";
import { SignUpForm } from "@/app/(auth)/sign-up/SignUpForm";

const TITLE = "Sign up";
const DESCRIPTION =
  "Create a Blog Admin Dashboard account to start managing posts, users, and content.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["sign up", "create account", "register", "blog admin dashboard", "get started"],
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/sign-up",
  },
  openGraph: {
    title: `${TITLE} · Blog Admin Dashboard`,
    description: DESCRIPTION,
    type: "website",
    siteName: "Blog Admin Dashboard",
  },
  twitter: {
    card: "summary",
    title: `${TITLE} · Blog Admin Dashboard`,
    description: DESCRIPTION,
  },
};

export default function Page() {
  return <SignUpForm />;
}
