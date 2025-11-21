"use client";

import LinkStats from "@/components/LinkStats";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();

  // If params.code is an array, pick the first element
  const code = Array.isArray(params?.code) ? params.code[0] : params?.code || "";

  return <LinkStats code={code} />;
}
