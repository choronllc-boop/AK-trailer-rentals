import type { Metadata } from "next";
import ServiceAreas from "@/components/ServiceAreas";

export const metadata: Metadata = {
  title: "Service Areas | AK Trailer Rentals",
  description: "Trailer rentals serving Wasilla, the Mat-Su Valley, and Southcentral Alaska.",
};

export default function ServiceAreasPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <ServiceAreas />
    </div>
  );
}
