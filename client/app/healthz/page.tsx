"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function HealthPage() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    api.get("/healthz")
      .then(res => setStatus(`Backend OK: ${JSON.stringify(res.data)}`))
      .catch(() => setStatus("Backend NOT reachable"));
  }, []);

  return <h2>{status}</h2>;
}
