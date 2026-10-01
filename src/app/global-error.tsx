"use client";

/** Last-resort boundary when the root layout itself fails. Inline styles only (globals may not load). */
export default function GlobalError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body
        style={{
          fontFamily: "Tahoma, sans-serif",
          display: "grid",
          placeItems: "center",
          minHeight: "100vh",
          margin: 0,
          background: "#faf8f5",
          color: "#1c1a1f",
          textAlign: "center",
        }}
      >
        <main>
          <h1 style={{ fontSize: 24 }}>خطای غیرمنتظره</h1>
          <p style={{ color: "#6b6570" }}>
            متأسفیم، مشکلی در بارگذاری فروشگاه پیش آمد.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: 16,
              padding: "10px 24px",
              borderRadius: 12,
              border: 0,
              background: "#9b1d4a",
              color: "#fff",
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            تلاش دوباره
          </button>
        </main>
      </body>
    </html>
  );
}
