import { Section } from "@/components/ui/section";
import { Metadata } from "next";
import AllArticles from "./_components/all-articles/AllArticles";

export const metadata: Metadata = {
  title: "Dashboard - Articles",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const parsed = Math.floor(Number(page));
  const pageNumber = Number.isInteger(parsed) && parsed >= 1 ? parsed : 1;

  return (
    <Section title="All Posts">
      <AllArticles page={pageNumber} />
    </Section>
  );
}
