export default function Home() {
  return (
    <main style={{ maxWidth: 780, margin: "60px auto", padding: 20, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 48, marginBottom: 10 }}>MEMEME</h1>
      <p style={{ fontSize: 18, lineHeight: 1.5, marginBottom: 20 }}>
        A creator subscription platform. Minimal. Fast. Built for creators.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a href="/login" style={btn}>Log in</a>
        <a href="/discover" style={btnOutline}>Discover creators</a>
      </div>

      <p style={{ marginTop: 40, opacity: 0.7, fontSize: 13 }}>
        18+ required to access explicit content. No explicit previews are shown without verification.
      </p>
    </main>
  );
}

const btn: React.CSSProperties = {
  background: "#111", color: "#fff", padding: "12px 16px", borderRadius: 10, textDecoration: "none"
};

const btnOutline: React.CSSProperties = {
  border: "1px solid #111", color: "#111", padding: "12px 16px", borderRadius: 10, textDecoration: "none"
};
