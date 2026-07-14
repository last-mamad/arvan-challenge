import type { Metadata } from "next";

import { ArticleForm } from "@/app/dashboard/articles/_components/edit-create-articles/ArticleForm";

export const metadata: Metadata = {
  title: "Dashboard - New Article",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <ArticleForm />;
}
