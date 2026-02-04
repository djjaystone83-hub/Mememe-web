"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const signUp = async () => {
    setMsg(null);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return setMsg(error.message);

    const userId = data.user?.id;
    if (userId) await supabase.from("profiles").upsert({ id: userId, role: "fan" });

    setMsg("Signed up. Check your email if confirmation is enabled.");
  };

  const signIn = async () => {
    setMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMsg(error.message);
    window.location.href = "/discover";
  };

  return (
    <main style={{ maxWidth: 520, margin: "60px auto", padding: 20, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 34, marginBottom: 10 }}>Log in</h1>
      <p style={{ opacity: 0.75, marginBottom: 20 }}>Use email/password for now.</p>

      <label>Email</label>
      <input style={input} value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password</label>
      <input style={input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <button style={button} onClick={signIn}>Sign in</button>
        <button style={buttonOutline} onClick={signUp}>Sign up</button>
      </div>

      {msg && <p style={{ marginTop: 14 }}>{msg}</p>}
    </main>
  );
}

const input: React.CSSProperties = {
  width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ddd", margin: "8px 0 14px"
};

const button: React.CSSProperties = {
  background: "#111", color: "#fff", padding: "12px 16px", borderRadius: 10, border: "none", cursor: "pointer"
};

const buttonOutline: React.CSSProperties = {
  background: "transparent", color: "#111", padding: "12px 16px", borderRadius: 10, border: "1px solid #111", cursor: "pointer"
};
