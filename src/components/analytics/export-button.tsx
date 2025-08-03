"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function ExportButton() {
  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Exporting data...");
  };

  return (
    <Button onClick={handleExport}>
      <Download className="h-4 w-4 mr-2" />
      Export Data
    </Button>
  );
}
