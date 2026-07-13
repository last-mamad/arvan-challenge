import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EditArticle } from "@/app/dashboard/articles/_components/EditArticle";

export const metadata: Metadata = {
  title: "Dashboard - Edit Article",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId < 1) {
    notFound();
  }

  return <EditArticle id={numericId} />;
}
