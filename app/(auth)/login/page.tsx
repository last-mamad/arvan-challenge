import type { Metadata } from "next";
import { SignInForm } from "@/app/(auth)/sign-in/SignInForm";

const TITLE = "Sign in";
const DESCRIPTION =
  "Sign in to your Blog Admin Dashboard account to manage posts, users, and content.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["sign in", "log in", "authentication", "blog admin dashboard", "account access"],
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/sign-in",
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
  return <SignInForm />;
}
