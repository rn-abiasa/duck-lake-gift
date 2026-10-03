import { Link } from "react-router-dom";
import sella from "../assets/sella_with_sketch_hat.webp";

// Halaman berikutnya setelah cover
const NEXT_PATH = "/menu";

const CONFETTI_COLORS = [
  "#5b9fd6",
  "#f87171",
  "#fbbf24",
  "#f9a8d4",
  "#34d399",
  "#ffffff",
];

// Pseudo-random deterministik agar posisi confetti stabil di setiap render
const rnd = (i, k) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const CONFETTI = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  left: rnd(i, 1) * 100,
  size: 6 + rnd(i, 2) * 6,
  round: rnd(i, 3) > 0.6,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  delay: 1.0 + rnd(i, 4) * 1.2,
  duration: 2.8 + rnd(i, 5) * 1.8,
  drift: (rnd(i, 6) - 0.5) * 160,
  spin: 360 + rnd(i, 7) * 540,
}));

function Confetti() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
    >
      {CONFETTI.map((c) => (
        <span
          key={c.id}
          className="confetti"
          style={{
            left: `${c.left}%`,
            width: c.size,
            height: c.round ? c.size : c.size * 1.6,
            borderRadius: c.round ? "9999px" : "1px",
            backgroundColor: c.color,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
            "--x": `${c.drift}px`,
            "--rot": `${c.spin}deg`,
          }}
        />
      ))}
    </div>
  );
}

export default function Cover() {
  return (
    <>
      <main>
        <section className="relative flex h-svh flex-col overflow-hidden bg-gray-200 wide:flex-row">
          <Confetti />

          {/* Area strip biru */}
          <div className="stripes-blue anim-stripes flex h-[30%] items-center justify-center px-10 wide:h-full wide:w-1/2 wide:px-16">
            <p
              className="anim-pop max-w-md -rotate-1 bg-white p-2 text-base font-medium text-red-400 wide:p-5 wide:text-xl xl:text-2xl"
              style={{ animationDelay: "0.7s" }}
            >
              Today is a special day because it celebrates the person who means
              so much to me.
            </p>
          </div>

          {/* Area konten utama */}
          <div className="relative flex h-[70%] flex-col items-center justify-center pb-[env(safe-area-inset-bottom)] wide:h-full wide:w-1/2">
            <span
              className="anim-tag absolute left-10 top-10 -rotate-10 text-3xl yuyu wide:left-[10%] wide:top-[12%] wide:text-4xl xl:text-6xl"
              style={{ animationDelay: "1s" }}
            >
              sweet
            </span>
            <span
              className="anim-tag absolute right-10 top-10 rotate-10 text-3xl yuyu wide:right-[10%] wide:top-[12%] wide:text-4xl xl:text-6xl"
              style={{ animationDelay: "1.15s" }}
            >
              Baby!
            </span>

            {/* Foto utama: wrapper = animasi masuk, img = animasi idle */}
            <div
              className="anim-drop relative z-10 flex justify-center"
              style={{ animationDelay: "0.35s" }}
            >
              <img
                src={sella}
                alt="Haikal wearing a sketched hat"
                draggable={false}
                className="anim-float h-[clamp(7rem,34svh,17.5rem)] w-auto select-none wide:h-[clamp(8rem,46svh,32rem)] wide:max-w-[85%] wide:object-contain"
              />
              <span
                aria-hidden="true"
                className="anim-shadow absolute inset-x-0 -bottom-2 mx-auto h-3 w-1/2 rounded-full bg-black/20 blur-sm"
              />
            </div>

            <p className="caveat mt-5 text-center text-2xl wide:text-3xl xl:text-5xl">
              <span
                className="anim-rise block"
                style={{ animationDelay: "1.3s" }}
              >
                Happy Birthday,
              </span>
              <span
                className="anim-rise block"
                style={{ animationDelay: "1.5s" }}
              >
                My Favorite Person!
              </span>
            </p>

            <Link
              to={NEXT_PATH}
              className="anim-rise caveat group mt-6 inline-flex items-center gap-3 rounded-full border-2 border-[#1e3a5f] bg-white px-6 py-2 text-2xl font-semibold text-[#1e3a5f] shadow-[4px_4px_0_#5b9fd6] transition-[translate,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#5b9fd6] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-red-400 active:translate-x-1 active:translate-y-1 active:shadow-none wide:mt-8 wide:px-8 wide:py-3 wide:text-3xl"
              style={{ animationDelay: "1.9s" }}
            >
              Open your gift
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="anim-nudge h-6 w-6 text-red-400 wide:h-7 wide:w-7"
              >
                <path d="M4 12h15" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
