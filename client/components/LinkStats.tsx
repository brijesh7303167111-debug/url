"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Link = {
  code: string;
  url: string;
  clicks: number;
  lastClicked?: string;
  createdAt: string;
};

interface Props {
  code: string;
}

export default function LinkStats({ code }: Props) {
  const [link, setLink] = useState<Link | null>(null);
  const [loading, setLoading] = useState(true);
   const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;


  useEffect(() => {
    if (!code) return;

    const loadLink = async () => {
      try {
        const res = await api.get(`/code/${code}`);
        setLink(res.data);
      } catch (err: any) {
        console.error(err);
        alert("Failed to load link: " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    loadLink();
  }, [code]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-200 bg-slate-900">
        Loading...
      </div>
    );
  if (!link)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-200 bg-slate-900">
        Link not found
      </div>
    );

  return (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
  <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6 sm:p-10">
    <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-8">
      Stats for <span className="text-blue-400">{link.code}</span>
    </h1>
    
    <div className="space-y-5 text-gray-200 divide-y divide-slate-700/50">
      
       <div className="pt-0 pb-4">
        <div className="font-extrabold text-xl mb-2 text-white flex items-center">
          <span className="text-red-400 mr-2">🚀</span> Short URL:
        </div>
        <a
          href={`${FRONTEND_URL}/${link.code}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-lg font-mono text-pink-400 break-all hover:text-pink-300 transition hover:underline"
        >
          {FRONTEND_URL}/{link.code}
        </a>
      </div>
      
      <div className="pt-4 pb-3">
        <div className="font-bold text-lg mb-2 text-white">
          <span className="text-blue-400">🔗</span> Original URL:
        </div>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-base font-mono text-green-400 break-all hover:text-green-300 transition"
        >
          {link.url}
        </a>
      </div>

        <div className="flex justify-between items-center pt-4 pb-1">
        <span className="font-semibold text-xl flex items-center">
          <span className="text-yellow-400 mr-2">🎯</span> Total Clicks:
        </span>
        <span className="text-3xl font-bold text-white">{link.clicks}</span>
      </div>

      <div className="flex justify-between items-center pt-4 pb-1">
        <span className="font-semibold text-gray-300 text-base">Last Clicked:</span>
        <span className="font-medium text-right text-sm sm:text-base">
          {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "Never"}
        </span>
      </div>

      <div className="flex justify-between items-center pt-4">
        <span className="font-semibold text-gray-300 text-base">Created At:</span>
        <span className="font-medium text-right text-sm sm:text-base">
          {new Date(link.createdAt).toLocaleString()}
        </span>
      </div>
    </div>

    <div className="mt-8 flex justify-center">
      <button
        onClick={() => {
          navigator.clipboard.writeText(`${FRONTEND_URL}/${link.code}`);
          setCopiedCode(link.code);
          setTimeout(() => setCopiedCode(null), 1500);
        }}
        className="w-full sm:w-2/3 md:w-1/2 bg-blue-600 text-white font-semibold text-lg py-3 rounded-lg shadow-md hover:bg-blue-500 transition duration-300 transform hover:scale-[1.02]"
      >
        {copiedCode === link.code ? "Copied!" : "Copy Short URL"}
      </button>
    </div>
  </div>
</div>

  );
}
