import React, { useState, useEffect, useRef } from "react";

const catGifs = [
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGNsYWV3cmpkN2V1OGdnaHpoZ2JzaGlnaDJyY3J3bzM1ZTZxaGE5ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0SVAVxeJsnJ1WRMIPX/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2RwNWdlYmt6cWx2ZGg3bnFtcnIzY212eHh5NzRwcXh2c2Zod2p1eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fb5lozVxhBwVFFByW8/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3YzB2ZW9uZm4zMjI1eWh0bzQxM2pqajgyeXF1ejQyb3VwZzkwMDN5bSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/zMv36BprGxUAqoWc72/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNm1jMnFhY3U3eGloZTA2N29oNXlmMzZ3eGp4MzNuNDdoaTZ2N2hpdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/DYC4Ako9o16854pPyO/giphy.gif",
];

const SIZE = 150;
const SPEED = 0.8;
const COLS = 5;
const ROWS = 3;
const TOTAL = COLS * ROWS;

const noTaunts = [
  "Hmm, you sure about that?",
  "The button disagrees with you.",
  "Interesting. Try again.",
  "Bhonduu",
  "Bhullakadd",
];

function buildCats() {
  const cats = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cellW = window.innerWidth / COLS;
      const cellH = window.innerHeight / ROWS;
      const jitterX = (Math.random() - 0.5) * cellW * 0.3;
      const jitterY = (Math.random() - 0.5) * cellH * 0.3;
      const cx = col * cellW + cellW / 2 - SIZE / 2 + jitterX;
      const cy = row * cellH + cellH / 2 - SIZE / 2 + jitterY;

      const angle = Math.random() * 2 * Math.PI;
      cats.push({
        id: row * COLS + col,
        src: catGifs[(row * COLS + col) % catGifs.length],
        x: Math.max(0, Math.min(cx, window.innerWidth - SIZE)),
        y: Math.max(0, Math.min(cy, window.innerHeight - SIZE)),
        dx: Math.cos(angle) * SPEED,
        dy: Math.sin(angle) * SPEED,
        rotation: Math.random() * 360,
      });
    }
  }
  return cats;
}

function CatSwarm() {
  const catsRef = useRef(buildCats());
  const [positions, setPositions] = useState(
    catsRef.current.map(({ id, x, y }) => ({ id, x, y })),
  );
  const rafRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;

      catsRef.current = catsRef.current.map((cat) => {
        let { x, y, dx, dy } = cat;
        x += dx;
        y += dy;

        if (x < 0) {
          x = 0;
          dx = Math.abs(dx);
        } else if (x > W - SIZE) {
          x = W - SIZE;
          dx = -Math.abs(dx);
        }

        if (y < 0) {
          y = 0;
          dy = Math.abs(dy);
        } else if (y > H - SIZE) {
          y = H - SIZE;
          dy = -Math.abs(dy);
        }

        return { ...cat, x, y, dx, dy };
      });

      setPositions(catsRef.current.map(({ id, x, y }) => ({ id, x, y })));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      {catsRef.current.map((cat) => {
        const pos = positions.find((p) => p.id === cat.id);
        return (
          <img
            key={cat.id}
            src={cat.src}
            alt="chaos cat"
            style={{
              position: "fixed",
              left: pos?.x ?? cat.x,
              top: pos?.y ?? cat.y,
              width: SIZE,
              height: SIZE,
              objectFit: "contain",
              transform: `rotate(${cat.rotation}deg)`,
              zIndex: 10,
              pointerEvents: "none",
              borderRadius: 10,
            }}
          />
        );
      })}
    </>
  );
}

export default function TrollPasswordReset() {
  const [isTrolled, setIsTrolled] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: null, y: null });
  const [taunt, setTaunt] = useState("");

  const handleNo = () => {
    const next = noCount + 1;
    setNoCount(next);
    setTaunt(noTaunts[noCount % noTaunts.length]);
    if (next >= 5) {
      setIsTrolled(true);
      return;
    }
    setNoPos({
      x: Math.random() * 60 + 5,
      y: Math.random() * 60 + 15,
    });
  };

  if (!isTrolled) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔒</div>
          <h2 style={styles.heading}>Forgot your password?</h2>
          <p style={styles.subtext}>We can help you reset it. Probably.</p>
          <div style={styles.btnRow}>
            <button style={styles.yesBtn} onClick={() => setIsTrolled(true)}>
              Yes
            </button>
            <button
              style={{
                ...styles.noBtn,
                ...(noPos.x !== null
                  ? {
                      position: "absolute",
                      left: `${noPos.x}%`,
                      top: `${noPos.y}%`,
                    }
                  : {}),
              }}
              onClick={handleNo}
            >
              No
            </button>
          </div>
          {taunt && <p style={styles.taunt}>{taunt}</p>}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.trollContainer}>
      <h1 style={styles.trollText}>SHOULD HAVE USED A PASSWORD MANAGER!</h1>
      <CatSwarm />
      <style>{`
        @keyframes flash {
          0%   { color: #ff0000; transform: translate(-50%,-50%) scale(1);    }
          33%  { color: #ffff00; transform: translate(-50%,-50%) scale(1.05); }
          66%  { color: #ff00ff; transform: translate(-50%,-50%) scale(1);    }
          100% { color: #00ffff; transform: translate(-50%,-50%) scale(1.05); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    overflow: "hidden",
  },
  card: {
    position: "relative",
    padding: "48px 40px",
    backgroundColor: "white",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    textAlign: "center",
    minWidth: 340,
    minHeight: 240,
  },
  heading: { margin: "0 0 8px", fontSize: 22, fontWeight: 600, color: "#111" },
  subtext: { margin: "0 0 28px", fontSize: 14, color: "#888" },
  btnRow: { display: "flex", gap: 12, justifyContent: "center" },
  yesBtn: {
    padding: "10px 36px",
    fontSize: 15,
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 500,
  },
  noBtn: {
    padding: "10px 36px",
    fontSize: 15,
    backgroundColor: "white",
    color: "#333",
    border: "1px solid #ddd",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 500,
  },
  taunt: { marginTop: 20, fontSize: 13, color: "#999", fontStyle: "italic" },
  trollContainer: {
    position: "fixed",
    inset: 0,
    backgroundColor: "#000",
    overflow: "hidden",
  },
  trollText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
    fontFamily: "Impact, sans-serif",
    fontWeight: "bold",
    textAlign: "center",
    zIndex: 5,
    margin: 0,
    textShadow: "4px 4px 0 #000",
    animation: "flash 0.6s infinite",
    pointerEvents: "none",
    whiteSpace: "nowrap",
  },
};
