"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Creator = { user_id: string; bio: string | null };

export default function DiscoverPage() {
  const [creators, setCreators] = useState<Creator[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("creator_profiles").select("user_id,bio").limit(20);
      setCreators((data as Creator[]) ?? []);
    })();
  }, []);

  return (
    <main style={{ maxWidth: 780, margin: "60px auto", padding: 20, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 34, marginBottom: 6 }}>Discover</h1>
      <p style={{ opacity: 0.75, marginBottom: 24 }}>
        Creator profiles are SFW. Explicit content requires age verification.
      </p>

      <div style={{ display: "grid", gap: 12 }}>
        {creators.length === 0 && (
          <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
            No creators yet. We’ll add a “become a creator” button next.
          </div>
        )}

        {creators.map((c) => (
          <a key={c.user_id} href={`/c/${c.user_id}`} style={card}>
            <div style={{ fontWeight: 650 }}>Creator</div>
            <div style={{ opacity: 0.75 }}>{c.bio ?? "No bio yet."}</div>
          </a>
        ))}
      </div>
    </main>
  );
}

const card: React.CSSProperties = {
  padding: 16,
  border: "1px solid #eee",
  borderRadius: 12,
  textDecoration: "none",
  color: "inherit"
};
