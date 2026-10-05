import { useEffect, useMemo, useState } from "react";

// Splash hanya diputar sekali setiap halaman dibuka/di-refresh.
// Kembali ke "/" lewat tombol (tanpa refresh) langsung menampilkan cover.
let splashSeen = false;

const NAVY = "#1e3a5f";
const PETAL_COUNT = 8;
const PETAL_COLORS = [
  "#f9a8d4",
  "#fca5a5",
  "#fde68a",
  "#93c5fd",
  "#c4b5fd",
  "#ffffff",
  "#fdba74",
];
const CENTER_COLORS = ["#fcd34d", "#f87171", "#fff3b8", "#5b9fd6"];

// Lama animasi (ms) sebelum splash mulai memudar. Bisa dilewati dengan tap / Enter / Esc.
const PLAY_MS = 4500;

// Pseudo-random deterministik agar hasil render stabil
const rnd = (i, k) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// Susun bunga memenuhi layar sesuai ukuran viewport. Bunga di dekat tengah mekar lebih dulu,
// lalu gelombang mekar menyebar ke tepi layar.
function buildField(width, height) {
  const cell = Math.max(60, Math.min(110, Math.round(Math.min(width, height) / 5.5)));
  const cols = Math.ceil(width / cell) + 1;
  const rows = Math.ceil(height / cell) + 1;
  const stepX = width / (cols - 1);
  const stepY = height / (rows - 1);
  const maxDist = Math.hypot(width / 2, height / 2);

  const flowers = [];
  let n = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * stepX + (rnd(n, 1) - 0.5) * stepX * 0.5;
      const y = r * stepY + (rnd(n, 2) - 0.5) * stepY * 0.5;
      const dist = Math.hypot(x - width / 2, y - height / 2) / maxDist;
      flowers.push({
        id: n,
        x,
        y,
        size: cell * (1.6 + rnd(n, 3) * 0.5),
        petal: PETAL_COLORS[Math.floor(rnd(n, 4) * PETAL_COLORS.length)],
        center: CENTER_COLORS[Math.floor(rnd(n, 5) * CENTER_COLORS.length)],
        delay: 1.9 + dist * 1.4 + rnd(n, 6) * 0.25,
        r0: -(90 + rnd(n, 7) * 120),
        r1: (rnd(n, 8) - 0.5) * 30,
        z: Math.floor(rnd(n, 9) * 5),
      });
      n++;
    }
  }
  return flowers;
}

// Kelopak + putik bunga (pusat bunga ada di titik 0,0)
function Petals({ animated = false }) {
  return Array.from({ length: PETAL_COUNT }, (_, i) => (
    <g key={i} transform={`rotate(${i * (360 / PETAL_COUNT)})`}>
      <g
        className={animated ? "splash-petal" : undefined}
        style={animated ? { "--i": i } : undefined}
      >
        <ellipse
          cx="0"
          cy="-25"
          rx="12"
          ry="21"
          style={{ fill: "var(--petal)" }}
          stroke={NAVY}
          strokeWidth="3"
        />
        <path
          d="M0 -14 V-36"
          stroke={NAVY}
          strokeOpacity="0.22"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </g>
  ));
}

function FlowerCenter() {
  return (
    <>
      <circle r="12" style={{ fill: "var(--center)" }} stroke={NAVY} strokeWidth="3" />
      <circle cx="-4" cy="-3" r="1.6" fill={NAVY} fillOpacity="0.35" />
      <circle cx="3" cy="-5" r="1.6" fill={NAVY} fillOpacity="0.35" />
      <circle cx="4" cy="3" r="1.6" fill={NAVY} fillOpacity="0.35" />
      <circle cx="-3" cy="5" r="1.6" fill={NAVY} fillOpacity="0.35" />
    </>
  );
}

// Daun di sepanjang batang bunga utama
const LEAVES = [
  { side: "right", off: 54, w: 66, delay: 0.5 },
  { side: "left", off: 108, w: 60, delay: 0.6 },
  { side: "right", off: 164, w: 52, delay: 0.7 },
];

function Splash({ exiting, onSkip, onExited }) {
  const { field, heroSize } = useMemo(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return {
      field: buildField(width, height),
      heroSize: Math.round(Math.min(260, Math.max(120, Math.min(width, height) * 0.42))),
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      onClick={onSkip}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget && e.animationName === "splash-exit") onExited();
      }}
      className={`fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-[radial-gradient(circle_at_center,#ffffff_0%,#fff1f2_55%,#fde2e4_100%)] ${
        exiting ? "splash-exit pointer-events-none" : ""
      }`}
    >
      {/* simbol bunga yang dipakai ulang oleh semua bunga di layar */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <symbol id="splash-flower" viewBox="0 0 100 100">
            <g transform="translate(50 50)">
              <Petals />
              <FlowerCenter />
            </g>
          </symbol>
        </defs>
      </svg>

      {/* bunga-bunga yang memenuhi layar */}
      {field.map((f) => (
        <span
          key={f.id}
          className="splash-bloom absolute block"
          style={{
            left: f.x,
            top: f.y,
            width: f.size,
            height: f.size,
            translate: "-50% -50%",
            zIndex: f.z,
            "--d": `${f.delay}s`,
            "--r0": `${f.r0}deg`,
            "--r1": `${f.r1}deg`,
            "--petal": f.petal,
            "--center": f.center,
          }}
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <use href="#splash-flower" />
          </svg>
        </span>
      ))}

      {/* batang yang tumbuh dari bawah */}
      <span
        className="splash-stem absolute left-1/2 top-1/2 z-[5] h-1/2 w-2.5 -translate-x-1/2 rounded-b-full border-2 border-[#1e3a5f] bg-[#86b97d]"
        style={{ borderTopWidth: 0 }}
      />
      {LEAVES.map((leaf, i) => (
        <svg
          key={i}
          viewBox="0 0 60 34"
          className={`splash-leaf absolute left-1/2 z-[5] -translate-y-full ${
            leaf.side === "left" ? "rotate-6 -scale-x-100" : "-rotate-6"
          }`}
          style={{
            top: `calc(50% + ${heroSize / 2 + leaf.off}px)`,
            width: leaf.w,
            "--d": `${leaf.delay}s`,
          }}
        >
          <path
            d="M2 30 C10 6 36 0 58 4 C54 24 30 36 2 30Z"
            fill="#86b97d"
            stroke={NAVY}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M6 28 C22 20 38 12 52 7"
            fill="none"
            stroke={NAVY}
            strokeOpacity="0.35"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ))}

      {/* bunga utama: satu bunga yang tumbuh dan mekar */}
      <div
        className="splash-hero absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: heroSize,
          height: heroSize,
          "--petal": "#f9a8d4",
          "--center": "#fcd34d",
        }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          <g transform="translate(50 50)">
            <Petals animated />
            <FlowerCenter />
          </g>
        </svg>
      </div>

      <p
        className="splash-caption caveat absolute left-1/2 z-10 -translate-x-1/2 text-2xl text-[#1e3a5f] wide:text-4xl"
        style={{ top: `calc(50% - ${heroSize / 2 + 48}px)` }}
      >
        for you
      </p>

      <p className="splash-hint caveat absolute left-1/2 top-[max(1rem,env(safe-area-inset-top))] z-20 -translate-x-1/2 rounded-full bg-white/85 px-4 text-lg text-[#1e3a5f]/80">
        tap to skip
      </p>
    </div>
  );
}

// Menampilkan splash dulu, lalu cover. Cover baru dipasang saat splash mulai memudar
// sehingga animasi masuk cover terlihat dari awal.
export default function SplashGate({ children }) {
  const [phase, setPhase] = useState(() => (splashSeen ? "done" : "playing"));

  const skip = () => setPhase((p) => (p === "playing" ? "exiting" : p));
  const finish = () => {
    splashSeen = true;
    setPhase("done");
  };

  useEffect(() => {
    if (phase !== "playing") return undefined;
    const timer = setTimeout(
      () => setPhase((p) => (p === "playing" ? "exiting" : p)),
      PLAY_MS,
    );
    const onKey = (e) => {
      if (["Enter", " ", "Escape"].includes(e.key)) {
        setPhase((p) => (p === "playing" ? "exiting" : p));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [phase]);

  return (
    <>
      {phase !== "playing" && children}
      {phase !== "done" && (
        <Splash exiting={phase === "exiting"} onSkip={skip} onExited={finish} />
      )}
    </>
  );
}
