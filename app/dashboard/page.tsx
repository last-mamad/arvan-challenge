import type { Metadata } from "next";

import { DashboardView } from "@/app/dashboard/DashboardView";

const TITLE = "Dashboard";
const DESCRIPTION =
  "Overview of your Blog Admin Dashboard — manage posts, users, and account settings from one place.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["dashboard", "admin panel", "blog management", "overview", "account"],
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/dashboard",
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

export default function DashboardPage() {
  return <DashboardView />;
}
