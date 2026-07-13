"use client";

import { Button } from "@/components/ui/button";

function BackHomeButton() {
  return <Button onClick={() => (window.location.href = "/")}>Back to home</Button>;
}

export { BackHomeButton };
