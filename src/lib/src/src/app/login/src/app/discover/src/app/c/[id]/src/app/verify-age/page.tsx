"use client";

import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function VerifyAgePage() {
  const sp = useSearchParams();
  const ret = sp.get("return") || "/discover";
  const [msg, setMsg] = useState<string | null>(null);

  const fakePass = async () => {
    setMsg(null);
    const { data: session } = await supabase.auth.getSession();
    const userId = session.session?.user.id;
    if (!userId) return setMsg("Please log in first.");

    const { error } = await supabase.from("verification_checks").insert({
      user_id: userId,
      kind: "age",
      provider: "placeholder",
      provider_ref: "manual",
      status: "passed"
    });

    if (error) setMsg(error.message);
    else window.location.href = ret;
  };

  return (
    <main style={{ maxWidth: 620, margin: "60px auto", padding: 20, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 34, marginBottom: 6 }}>Age verification required</h1>
      <p style={{ opacity: 0.75, marginBottom: 18 }}>
        You must verify you are 18+ to access explicit content. No explicit content is shown before verification.
      </p>

      <button style={btn} onClick={fakePass}>Verify (placeholder)</button>
      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}

      <p style={{ marginTop: 26, opacity: 0.7, fontSize: 13 }}>
        Placeholder only. We’ll integrate a real age assurance provider next.
      </p>
    </main>
  );
}

const btn: React.CSSProperties = {
  background: "#111", color: "#fff", padding: "12px 16px", borderRadius: 10, border: "none", cursor: "pointer"
};
