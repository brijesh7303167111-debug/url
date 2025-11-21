"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";

export default function RedirectPage() {
  const params = useParams();
  const code = params?.code;

  useEffect(() => {
    if (!code) return;

    const redirect = async () => {
      try {
        // Call backend to increment click and get original URL
        const res = await api.get(`/${code}`);
        const url = res.data.url;

        // Now redirect frontend
        window.location.href = url;
      } catch (err: any) {
        console.error(err);
        alert(err.response?.data?.message || "Link not found");
      }
    };

    redirect();
  }, [code]);

  return <div>Redirecting...</div>;
}
