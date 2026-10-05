import { useState } from "react";
import { Link } from "react-router-dom";

// Ganti isi wish di sini. Setiap item = satu baris harapan.
const WISHES = [
  "Semoga hari-harimu terasa lembut, santai, dan penuh tawa.",
  "Semoga semua impianmu bisa terwujud.",
  "Dan semoga harimu selalu dipenuhi dengan hal-hal yang membuatmu bahagia.",
];
const CLOSING = "Happy birthday, my favorite person.";

// Halaman pertama (cover)
const FIRST_PATH = "/";

const HEART_ICON =
  "M12 21s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12c-2.5 4.6-9.5 9-9.5 9z";
const SPARKLE_ICON =
  "M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z";

// Pseudo-random deterministik agar hasil render stabil
const rnd = (i, k) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// Bintang kecil berkelap-kelip + beberapa bintang berkilau besar
const STARS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: rnd(i, 1) * 100,
  top: rnd(i, 2) * 100,
  size: 2 + rnd(i, 3) * 3,
  dur: 2 + rnd(i, 4) * 3,
  delay: rnd(i, 5) * 3,
}));
const BIG_STARS = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  left: 4 + rnd(i, 11) * 90,
  top: 3 + rnd(i, 12) * 90,
  size: 12 + rnd(i, 13) * 10,
  dur: 3 + rnd(i, 14) * 2,
  delay: rnd(i, 15) * 3,
}));

// Percikan saat lilin ditiup
const BLOW_COLORS = ["#fcd34d", "#f9a8d4", "#f87171", "#bae6fd"];
const BLOW = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2 + rnd(i, 21) * 0.4;
  const dist = 60 + rnd(i, 22) * 70;
  return {
    id: i,
    d: i % 2 ? HEART_ICON : SPARKLE_ICON,
    tx: Math.cos(angle) * dist,
    ty: Math.sin(angle) * dist - 20,
    rot: (rnd(i, 23) - 0.5) * 120,
    scale: 0.7 + rnd(i, 24) * 0.7,
    color: BLOW_COLORS[i % BLOW_COLORS.length],
  };
});

function Icon({ d, className = "", style }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d={d} />
    </svg>
  );
}

function Cake({ lit, blowKey }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 160"
      className="block w-full overflow-visible"
    >
      {/* piring */}
      <ellipse
        cx="80"
        cy="150"
        rx="72"
        ry="8"
        fill="#cfe6f7"
        stroke="#1e3a5f"
        strokeWidth="3"
      />

      {/* tingkat bawah */}
      <rect
        x="20"
        y="100"
        width="120"
        height="46"
        rx="6"
        fill="#fde2e4"
        stroke="#1e3a5f"
        strokeWidth="3"
      />
      <g fill="#f87171">
        <rect x="22" y="101.5" width="116" height="8" />
        {[30, 50, 70, 90, 110, 130].map((cx) => (
          <circle key={cx} cx={cx} cy="109" r="10" />
        ))}
      </g>
      {[
        [34, 128, "#fcd34d", 20],
        [60, 134, "#5b9fd6", -30],
        [88, 127, "#f9a8d4", 35],
        [112, 134, "#fcd34d", -15],
        [126, 126, "#86efac", 25],
      ].map(([x, y, color, r]) => (
        <rect
          key={x}
          x={x}
          y={y}
          width="9"
          height="3.5"
          rx="1.75"
          fill={color}
          transform={`rotate(${r} ${x + 4.5} ${y + 1.75})`}
        />
      ))}

      {/* tingkat atas */}
      <rect
        x="45"
        y="62"
        width="70"
        height="38"
        rx="6"
        fill="#dcecf9"
        stroke="#1e3a5f"
        strokeWidth="3"
      />
      <g fill="#5b9fd6">
        <rect x="47" y="63.5" width="66" height="7" />
        {[52, 66, 80, 94, 108].map((cx) => (
          <circle key={cx} cx={cx} cy="70.5" r="7" />
        ))}
      </g>
      {[
        [56, 86, "#f87171", -20],
        [78, 90, "#fcd34d", 30],
        [96, 84, "#f9a8d4", -35],
      ].map(([x, y, color, r]) => (
        <rect
          key={x}
          x={x}
          y={y}
          width="8"
          height="3.5"
          rx="1.75"
          fill={color}
          transform={`rotate(${r} ${x + 4} ${y + 1.75})`}
        />
      ))}

      {/* lilin */}
      <rect
        x="76"
        y="34"
        width="8"
        height="28"
        rx="2"
        fill="#fff"
        stroke="#1e3a5f"
        strokeWidth="2.5"
      />
      <path
        d="M76.5 43 L83.5 39 M76.5 51 L83.5 47 M76.5 59 L83.5 55"
        stroke="#f87171"
        strokeWidth="2"
      />
      <path
        d="M80 34 V30"
        stroke="#1e3a5f"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* api (menyala) atau asap (setelah ditiup) */}
      {lit ? (
        <g className="flame">
          <path
            d="M80 29 C72 20 76 12 80 4 C84 12 88 20 80 29Z"
            fill="#fcd34d"
            stroke="#1e3a5f"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M80 27 C77 22 78 18 80 14 C82 18 83 22 80 27Z"
            fill="#f87171"
          />
        </g>
      ) : (
        <path
          key={blowKey}
          className="smoke"
          d="M80 28 C74 22 86 17 80 9"
          stroke="#cfe6f7"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export default function Wish() {
  const [lit, setLit] = useState(true);
  const [blowKey, setBlowKey] = useState(0);

  const toggleCandle = () => {
    setLit((current) => !current);
    setBlowKey((k) => k + 1);
  };

  return (
    <main>
      <section className="night-sky relative flex min-h-svh flex-col items-center gap-10 overflow-x-clip px-5 pb-16 pt-10 wide:flex-row wide:justify-center wide:gap-14 wide:px-10 wide:py-12">
        {/* Langit malam */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          {STARS.map((s) => (
            <span
              key={s.id}
              className="twinkle absolute rounded-full bg-white"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                "--dur": `${s.dur}s`,
                "--d": `${s.delay}s`,
              }}
            />
          ))}
          {BIG_STARS.map((s) => (
            <Icon
              key={s.id}
              d={SPARKLE_ICON}
              className="twinkle absolute text-yellow-200"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                "--dur": `${s.dur}s`,
                "--d": `${s.delay}s`,
              }}
            />
          ))}
          <span
            className="shoot absolute right-[8%] top-[6%]"
            style={{ "--d": "2s" }}
          />
          <span
            className="shoot absolute right-[45%] top-[24%]"
            style={{ "--d": "7s" }}
          />

          {/* bulan sabit */}
          <svg
            viewBox="0 0 60 60"
            className="anim-float absolute right-5 top-5 h-14 w-14 drop-shadow-[0_0_14px_rgba(253,230,138,0.6)] wide:right-12 wide:top-10 wide:h-24 wide:w-24"
            style={{ animationDelay: "1.5s" }}
          >
            <defs>
              <mask id="moon-mask">
                <rect width="60" height="60" fill="white" />
                <circle cx="40" cy="22" r="22" fill="black" />
              </mask>
            </defs>
            <circle
              cx="28"
              cy="30"
              r="22"
              fill="#fde68a"
              mask="url(#moon-mask)"
            />
          </svg>
        </div>

        {/* Judul + kue */}
        <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center wide:w-5/12">
          <header>
            <h1
              className="anim-pop yuyu text-4xl text-[#fff8ec] drop-shadow-[0_0_12px_rgba(253,230,138,0.55)] wide:text-5xl xl:text-6xl"
              style={{ animationDelay: "0.3s" }}
            >
              My Wish for You
            </h1>
            <p
              className="anim-rise caveat mt-1 text-xl text-sky-200 wide:text-3xl"
              style={{ animationDelay: "0.7s" }}
            >
              My special person.
            </p>
          </header>

          <div
            className="anim-drop mt-8 w-full"
            style={{ animationDelay: "0.9s" }}
          >
            <button
              type="button"
              onClick={toggleCandle}
              aria-pressed={!lit}
              aria-label={
                lit ? "Blow out the candle" : "Light the candle again"
              }
              className="relative mx-auto block w-[clamp(11rem,52vw,16rem)] cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-8 focus-visible:outline-yellow-200 wide:w-[clamp(9rem,min(22vw,40svh),19rem)]"
            >
              <span
                className="anim-float block"
                style={{ animationDelay: "2.2s" }}
              >
                {lit && (
                  <span
                    aria-hidden="true"
                    className="glow absolute left-1/2 top-[8%] h-20 w-20 -translate-x-1/2 rounded-full bg-yellow-300/40 blur-xl"
                  />
                )}
                <Cake lit={lit} blowKey={blowKey} />
                {!lit &&
                  BLOW.map((p) => (
                    <Icon
                      key={`${blowKey}-${p.id}`}
                      d={p.d}
                      className="burst-particle pointer-events-none absolute left-1/2 top-[10%] h-5 w-5"
                      style={{
                        color: p.color,
                        "--tx": `${p.tx}px`,
                        "--ty": `${p.ty}px`,
                        "--r": `${p.rot}deg`,
                        "--s": p.scale,
                      }}
                    />
                  ))}
              </span>
            </button>
          </div>

          <p
            className="caveat mt-6 text-xl text-sky-200/90 wide:text-2xl"
            aria-live="polite"
          >
            {lit ? "tap the cake!" : "tap to relight"}
          </p>
        </div>

        {/* Wish + tombol */}
        <div className="relative z-10 flex w-full max-w-md flex-col items-center wide:w-6/12">
          <div
            className="anim-rise relative w-full rounded-xl bg-[#fff8ec] p-2 shadow-[6px_6px_0_#f87171]"
            style={{ animationDelay: "1.1s" }}
          >
            <div className="rounded-lg border-2 border-dashed border-[#1e3a5f]/40 px-5 py-6 wide:px-8 wide:py-8">
              <ul className="space-y-4">
                {WISHES.map((text, i) => (
                  <li
                    key={i}
                    className="anim-rise caveat flex gap-3 text-2xl leading-7 text-[#1e3a5f] wide:text-3xl wide:leading-8"
                    style={{ animationDelay: `${1.4 + i * 0.3}s` }}
                  >
                    <Icon
                      d={SPARKLE_ICON}
                      className="mt-1 h-5 w-5 shrink-0 text-yellow-400 wide:h-6 wide:w-6"
                    />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <p
                className="anim-rise yuyu mt-6 text-center text-xl text-red-500 wide:text-2xl"
                style={{ animationDelay: `${1.4 + WISHES.length * 0.3}s` }}
              >
                {CLOSING}
              </p>
            </div>

            {/* segel lilin */}
            <span
              aria-hidden="true"
              className="anim-float absolute -bottom-5 -right-3 grid h-12 w-12 place-items-center rounded-full border-2 border-[#1e3a5f] bg-red-400 shadow-[2px_2px_0_#1e3a5f]"
              style={{ animationDelay: "2.6s" }}
            >
              <Icon d={HEART_ICON} className="h-6 w-6 text-white" />
            </span>
          </div>

          <Link
            to={FIRST_PATH}
            className="anim-rise caveat group mt-12 inline-flex items-center gap-3 rounded-full border-2 border-[#1e3a5f] bg-white px-6 py-2 text-2xl font-semibold text-[#1e3a5f] shadow-[4px_4px_0_#f87171] transition-[translate,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#f87171] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-yellow-200 active:translate-x-1 active:translate-y-1 active:shadow-none wide:px-8 wide:py-3 wide:text-3xl"
            style={{ animationDelay: "2.6s" }}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-red-400 transition-[rotate] duration-300 group-hover:-rotate-180 wide:h-7 wide:w-7"
            >
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            Back to first
          </Link>
        </div>
      </section>
    </main>
  );
}
