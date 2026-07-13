import { Button } from "@/components/ui/button";

export default function DashboardHomePage() {
  return (
    <div className="flex flex-1 flex-col items-start gap-4">
      <p className="text-muted-foreground">Dashboard home.</p>
      <Button>Get started</Button>
    </div>
  );
}
