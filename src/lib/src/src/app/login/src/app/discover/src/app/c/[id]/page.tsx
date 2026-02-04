"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CreatorPage({ params }: { params: { id: string } }) {
  const creatorId = params.id;
  const [agePassed, setAgePassed] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: session } = await supabase.auth.getSession();
      const userId = session.session?.user.id;
      if (!userId) return;

      const { data } = await supabase
        .from("verification_checks")
        .select("status")
        .eq("user_id", userId)
        .eq("kind", "age")
        .eq("status", "passed")
        .limit(1);

      setAgePassed(!!data && data.length > 0);
    })();
  }, []);

  const goExplicit = () => {
    if (!agePassed) {
      window.location.href = `/verify-age?return=/c/${creatorId}`;
      return;
    }
    alert("Later this opens the explicit feed (once we add media).");
  };

  return (
    <main style={{ maxWidth: 780, margin: "60px auto", padding: 20, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 34, marginBottom: 6 }}>Creator</h1>
      <p style={{ opacity: 0.75, marginBottom: 20 }}>
        Public profile info is SFW. Explicit content requires age verification.
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button style={btn} onClick={goExplicit}>View explicit content</button>
        <a href="/discover" style={btnOutline}>Back to Discover</a>
      </div>

      <div style={{ marginTop: 28, padding: 16, border: "1px solid #eee", borderRadius: 12 }}>
        <div style={{ fontWeight: 650, marginBottom: 6 }}>Status</div>
        <div>Age verification: {agePassed ? "✅ Passed" : "❌ Not verified"}</div>
      </div>
    </main>
  );
}

const btn: React.CSSProperties = {
  background: "#111", color: "#fff", padding: "12px 16px", borderRadius: 10, border: "none", cursor: "pointer"
};

const btnOutline: React.CSSProperties = {
  border: "1px solid #111", color: "#111", padding: "12px 16px", borderRadius: 10, textDecoration: "none"
};
