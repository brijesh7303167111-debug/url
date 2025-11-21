"use client";

import { useParams } from "next/navigation";
import LinkStats from "@/components/LinkStats";

export default function Page() {
  const params = useParams();
  return <LinkStats code={params?.code || ""} />;
}
