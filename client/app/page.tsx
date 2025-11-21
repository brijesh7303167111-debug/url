"use client";
import { FiClipboard, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation"; 
import { useState, useEffect } from "react";
import { api } from "../lib/api";

type Link = {
  _id: string;
  code: string;
  url: string;
  clicks: number;
  lastClicked?: string;
  createdAt: string;
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<Link[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
   const router = useRouter();

  const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const loadLinks = async () => {
  try {
    const res = await api.get("/links");
    console.log("API Response:", res.data);

     const linksArray = (Array.isArray(res.data) ? res.data : res.data.links || []).reverse();
    setLinks(linksArray);
  } catch (err) {
    console.error(err);
    alert("Failed to load links");
  }
};


  useEffect(() => {
    loadLinks();
  }, []);

 
  const createLink = async () => {
    if (!url.trim()) {
      alert("Long URL is required");
      return;
    }

    setLoading(true);

    try {
      await api.post("/links", { url, code: code || undefined });
      alert("Short link created!");
      setUrl("");
      setCode("");
      loadLinks();
    } catch (err: any) {
      if (err.response?.status === 409) {
        alert("Code already exists!");
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  
  const deleteLink = async (code: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return;
    try {
      await api.delete(`/del/${code}`);
      alert("Link deleted successfully!");
      loadLinks();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete link");
    }
  };

  return (
 <div className="max-w-full mx-auto p-6 bg-slate-950  min-h-screen text-gray-200">
 
  <div className="sm:w-[70%] w-full mx-auto bg-slate-900 p-5 pt-8  rounded-lg shadow-md sm:mt-10 mt-5 border-5 border-white">
    <h2 className="text-3xl font-bold mb-6 text-white">Create Short Link</h2>
    <div className="flex flex-col sm:flex-col gap-4 mb-4">
      <input
        className="flex-1 p-3 rounded border-2 border-slate-700 bg-slate-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        placeholder="Enter long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        className="flex-1 p-3 rounded border-2 border-slate-700 bg-slate-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        placeholder="Custom code (optional)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <div className="flex justify-center mt-6" >
      <button
        className="bg-blue-600 sm:w-[20rem] hover:border-1 hover:border-white text-white px-6 py-3 rounded hover:bg-blue-700 "
        onClick={createLink}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create"}
      </button>
      </div>
    </div>
  </div>


  <div className="bg-slate-900 p-4  rounded-lg shadow-md border-4 mt-12 border-slate-700 overflow-x-auto">
    <h2 className="text-xl font-semibold mb-4 text-white">All Links</h2>

    <table className="min-w-full border-collapse">
      <thead>
        <tr className="bg-slate-700 text-gray-200">
          <th className="py-2 px-0 border border-slate-600">Code</th>
          <th className="py-2 px-2  border border-slate-600">Target URL</th>
          <th className="py-2 px-2  border border-slate-600 ">Short Link</th>
          <th className="py-2 px-2 border border-slate-600 hidden sm:table-cell">Clicks</th>
          <th className="py-2 px-2 border border-slate-600 hidden sm:table-cell">Last Clicked</th>
           </tr>
      </thead>
      <tbody>
        {links.length === 0 && (
          <tr>
            <td colSpan={6} className="text-center py-4 text-gray-400">
              No links found
            </td>
          </tr>
        )}
        {links.map((link) => (
          <tr key={link._id} className="hover:bg-slate-700 transition">
            <td onClick={() => router.push(`${FRONTEND_URL}/code/${link.code}`)}  className="py-2 px-1 cursor-pointer  border border-slate-600 text-center">{link.code}</td>
            <td className="py-2 px-2 max-w-[12rem] sm:max-w-[22rem] border border-slate-600">
  <a
    href={`${link.url}`}
    target="_blank"
    className="text-green-400 font-mono whitespace-nowrap overflow-hidden text-ellipsis block"
  >
    {`${link.url}`}
  </a>
</td>

           
            <td className="py-4 px-2 border border-slate-600 flex items-center justify-between   truncate">
  <a
    href={`${FRONTEND_URL}/${link.code}`}
    target="_blank"
    className="text-green-400 font-mono truncate max-w-[18rem]"
    title={`${FRONTEND_URL}/${link.code}`} 
  >
    {`${FRONTEND_URL}/${link.code}`}
  </a>
  <button
    onClick={() => {
      navigator.clipboard.writeText(`${FRONTEND_URL}/${link.code}`);
      setCopiedCode(link.code);
      setTimeout(() => setCopiedCode(null), 1500);
    }}
    className="text-sm  hidden sm:block bg-slate-700 text-gray-300 px-1 py-1 rounded hover:bg-slate-600 transition min-w-[3rem] text-center"
  >
    {copiedCode === link.code ? "Copied!" : "Copy"}
  </button>

  <button
    onClick={() => {
      navigator.clipboard.writeText(`${FRONTEND_URL}/${link.code}`);
      setCopiedCode(link.code);
      setTimeout(() => setCopiedCode(null), 1500);
    }}
    className="sm:hidden text-gray-300 bg-slate-700 p-2 rounded hover:bg-slate-600 transition flex items-center justify-center"
    title="Copy"
  >
    <FiClipboard className="h-4 w-4" />
  </button>
</td>



            <td className="py-2 px-3 border border-slate-600 hidden sm:table-cell">{link.clicks || 0}</td>
            <td className="py-2 px-3 border border-slate-600 hidden sm:table-cell">
  <div className="flex justify-between items-center">
    <span>
      {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "Never"}
    </span>
    <button
      onClick={() => deleteLink(link.code)}
      className="text-white bg-red-600 p-2 rounded hover:bg-red-700 transition flex items-center justify-center"
      title="Delete"
    >
      <FiTrash2 className="h-4 w-4" />
    </button>
  </div>
</td>



       
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}
