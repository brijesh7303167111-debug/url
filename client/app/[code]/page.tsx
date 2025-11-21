"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";

export default function RedirectPage() {
  const params = useParams();
  const code = params?.code;
   const router = useRouter();

  useEffect(() => {
    if (!code) return;

    const redirect = async () => {
      try {
        const res = await api.get(`/${code}`);
        const url = res.data.url;

         router.push(url);
      } catch (err: any) {
        console.error(err);
        alert(err.response?.data?.message || "Link not found");
      }
    };

    redirect();
  }, [code]);

  return <div>Redirecting...</div>;
}
