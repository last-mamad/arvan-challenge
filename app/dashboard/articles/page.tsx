import { Section } from "@/components/ui/section";
import { Metadata } from "next";
import AllArticles from "./AllArticles";

export const metadata: Metadata = {
  title: "Dashboard - Articles",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return (
    <Section title="All Posts">
      <AllArticles />
    </Section>
  );
}
