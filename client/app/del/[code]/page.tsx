"use client";

import { api } from "@/lib/api";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function DeletePage() {
  const router = useRouter();
  const params = useParams();   // ✅ use hook instead of prop
  const code = params?.code;    // safe access

  useEffect(() => {
    if (!code) return;

    const deleteLink = async () => {
      try {
        const res = await api.delete(`/del/${code}`);

        if (res.status === 200) {
          alert("Link deleted successfully!");
          router.push("/");
        } else {
          alert("Failed to delete link");
          router.push("/");
        }
      } catch (err: any) {
        console.error(err);
        if (err.response?.status === 404) alert("Code not found");
        else alert("Error deleting link");
        router.push("/");
      }
    };

    deleteLink();
  }, [code, router]);

  return <div>Processing deletion...</div>;
}
