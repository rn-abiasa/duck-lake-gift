import { useEffect, useRef, useState } from "react";
import NextButton from "../components/next-button";

// Halaman berikutnya setelah mini game
const NEXT_PATH = "/memories";

// Ganti isi 5 alasan di sini. title = judul pendek, text = kalimat singkat (±60 karakter).
const REASONS = [
  {
    title: "Kamu lucu",
    text: "Hal itu mengubah momen biasa apa pun menjadi momen favoritku.",
    tilt: "-rotate-2",
  },
  {
    title: "Kebaikan Kamu",
    text: "Kamu peduli pada orang lain secara diam-diam, bahkan saat tidak ada yang melihat.",
    tilt: "rotate-1",
  },
  {
    title: "Kamu Kuat",
    text: "Kamu terus melangkah, dan membuatku yakin bahwa aku juga bisa.",
    tilt: "rotate-2",
  },
  {
    title: "Kehangatanmu",
    text: "Di mana pun kamu berada, tempat itu seketika terasa seperti rumah.",
    tilt: "-rotate-1",
  },
  {
    title: "Hanya Kamu",
    text: "Segala hal kecil tentang dirimu adalah alasan tepat mengapa aku mencintaimu.",
    tilt: "rotate-1",
  },
];

const HEART_BIG =
  "M50 88 C20 66 4 48 4 28 C4 14 15 5 28 5 C38 5 46 10 50 18 C54 10 62 5 72 5 C85 5 96 14 96 28 C96 48 80 66 50 88 Z";
const HEART_ICON =
  "M12 21s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12c-2.5 4.6-9.5 9-9.5 9z";
const SPARKLE_ICON =
  "M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z";

const PARTICLE_COLORS = ["#f87171", "#f9a8d4", "#5b9fd6", "#fcd34d"];

// Pseudo-random deterministik agar hasil render stabil
const rnd = (i, k) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// Hati-hati kecil yang beterbangan saat love "pecah"
const PARTICLES = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2 + rnd(i, 1) * 0.4;
  const dist = 110 + rnd(i, 2) * 120;
  return {
    id: i,
    tx: Math.cos(angle) * dist,
    ty: Math.sin(angle) * dist,
    rot: (rnd(i, 3) - 0.5) * 140,
    scale: 0.7 + rnd(i, 4) * 0.9,
    color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    delay: 0.35 + rnd(i, 5) * 0.12,
  };
});

// Dekorasi latar
const DOODLES = [
  {
    d: HEART_ICON,
    pos: "left-[5%] top-[36%]",
    color: "text-pink-300",
    size: "h-7 w-7",
  },
  {
    d: SPARKLE_ICON,
    pos: "right-[6%] top-[20%]",
    color: "text-yellow-300",
    size: "h-6 w-6",
  },
  {
    d: HEART_ICON,
    pos: "right-[8%] top-[68%]",
    color: "text-sky-400",
    size: "h-6 w-6",
  },
  {
    d: SPARKLE_ICON,
    pos: "left-[8%] top-[84%]",
    color: "text-red-300",
    size: "h-7 w-7",
  },
];

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

// Indikator love: kosong -> terisi (cairan bergelombang) -> penuh -> pecah
function Meter({ count, allOpened, stage }) {
  const progress = count / REASONS.length;
  const heartState =
    stage === 1 ? "scale-50 opacity-0" : allOpened ? "anim-beat" : "";

  return (
    <div
      role="status"
      aria-live="polite"
      className="anim-pop sticky top-3 z-30 mx-auto mb-6 flex items-center gap-3 rounded-full border-2 border-[#1e3a5f] bg-white/95 py-1.5 pl-3 pr-5 shadow-[3px_3px_0_#f87171] wide:static wide:mb-0 wide:flex-col wide:gap-1 wide:border-0 wide:bg-transparent wide:p-0 wide:shadow-none"
      style={{ animationDelay: "0.6s" }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 100 92"
        className={`aspect-[100/92] h-10 w-auto overflow-visible transition-[opacity,scale] duration-300 wide:h-[clamp(5rem,30svh,15rem)] ${heartState}`}
      >
        <defs>
          <clipPath id="love-heart-clip">
            <path d={HEART_BIG} />
          </clipPath>
        </defs>
        <path d={HEART_BIG} fill="#fff" />
        <g clipPath="url(#love-heart-clip)">
          <g
            style={{
              transform: `translateY(${100 - 108 * progress}px)`,
              transition: "transform 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <path
              className="wave"
              d="M0 6 Q12.5 0 25 6 T50 6 T75 6 T100 6 T125 6 T150 6 T175 6 T200 6 V130 H0 Z"
              fill="#f87171"
            />
          </g>
        </g>
        <path
          d={HEART_BIG}
          fill="none"
          stroke="#1e3a5f"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </svg>
      <p className="caveat text-xl font-semibold text-[#1e3a5f] wide:text-4xl">
        {stage >= 2 ? "Full of love!" : `${count}/${REASONS.length} reasons`}
      </p>
    </div>
  );
}

function ReasonCard({ reason, index, open, onOpen }) {
  return (
    <li
      className="anim-pop w-[calc(50%-0.5rem)] max-w-[8.75rem] even:mt-5 wide:w-[calc(50%-0.75rem)] wide:max-w-52 xl:w-[calc(33.333%-1rem)]"
      style={{ animationDelay: `${0.9 + index * 0.15}s` }}
    >
      <div
        className={open ? "" : "anim-float"}
        style={{ animationDelay: `${2.2 + index * 0.45}s` }}
      >
        <button
          type="button"
          onClick={onOpen}
          aria-pressed={open}
          aria-label={
            open
              ? `${reason.title}: ${reason.text}`
              : `Open reason ${index + 1} of ${REASONS.length}`
          }
          className={`flip block aspect-[5/6] w-full cursor-pointer text-left transition-[translate] duration-150 wide:aspect-[7/8] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-red-400 ${
            open ? "is-open" : "hover:-translate-y-1"
          } ${reason.tilt}`}
        >
          <span className="flip-inner">
            {/* Sisi depan */}
            <span className="flip-face flex-col items-center justify-between rounded-xl border-2 border-[#1e3a5f] bg-white p-2.5 shadow-[3px_3px_0_#5b9fd6]">
              <span className="caveat block h-6 w-6 self-start rounded-full bg-[#1e3a5f] text-center text-base leading-6 font-semibold text-white">
                {index + 1}
              </span>
              <Icon
                d={HEART_ICON}
                className="anim-beat h-11 w-11 text-red-400 wide:h-14 wide:w-14"
              />
              <span className="caveat text-lg text-[#1e3a5f]/70 wide:text-xl">
                tap me
              </span>
            </span>

            {/* Sisi belakang: alasan */}
            <span className="flip-face flip-back flex-col items-center justify-center rounded-xl border-2 border-[#1e3a5f] bg-yellow-100 p-2.5 text-center shadow-[3px_3px_0_#f87171]">
              <span className="yuyu text-sm text-[#1e3a5f] wide:text-base">
                {reason.title}
              </span>
              <span className="caveat mt-1 text-base leading-5 text-[#1e3a5f] wide:text-xl wide:leading-6">
                {reason.text}
              </span>
              <Icon d={HEART_ICON} className="mt-1.5 h-4 w-4 text-red-400" />
            </span>
          </span>
        </button>
      </div>
    </li>
  );
}

export default function WhyYouAreSpecial() {
  const [opened, setOpened] = useState(() => new Set());
  // 0 = bermain, 1 = love pecah, 2 = selesai (tombol next muncul)
  const [stage, setStage] = useState(0);
  const doneRef = useRef(null);

  const count = opened.size;
  const allOpened = count === REASONS.length;

  useEffect(() => {
    if (!allOpened) return;
    const burst = setTimeout(() => setStage(1), 1000);
    const done = setTimeout(() => setStage(2), 2500);
    return () => {
      clearTimeout(burst);
      clearTimeout(done);
    };
  }, [allOpened]);

  useEffect(() => {
    if (stage !== 2) return;
    doneRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [stage]);

  const openCard = (i) =>
    setOpened((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));

  const reset = () => {
    setOpened(new Set());
    setStage(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      <section className="gingham-blue relative flex min-h-svh flex-col overflow-x-clip wide:flex-row">
        {/* Dekorasi latar */}
        {DOODLES.map((doodle, i) => (
          <Icon
            key={i}
            d={doodle.d}
            className={`anim-float pointer-events-none absolute z-0 ${doodle.pos} ${doodle.color} ${doodle.size}`}
            style={{ animationDelay: `${1.2 + i * 0.5}s` }}
          />
        ))}

        {/* Kolom judul + indikator (di mobile: tersusun vertikal, meter menempel di atas saat scroll) */}
        <div className="contents wide:sticky wide:top-0 wide:z-10 wide:flex wide:h-svh wide:w-5/12 wide:shrink-0 wide:flex-col wide:items-center wide:justify-center wide:gap-[4svh] wide:px-8">
          <header
            className="anim-pop relative z-10 mx-auto mb-4 mt-8 w-fit max-w-[88%] -rotate-2 rounded-xl bg-[#1e3a5f] p-1.5 shadow-[5px_5px_0_#f87171] wide:m-0"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="rounded-lg border-2 border-dashed border-white/60 px-5 py-3 text-center wide:px-8 wide:py-5">
              <h1 className="yuyu text-3xl text-white wide:text-4xl xl:text-5xl">
                Why You Are Special
              </h1>
              <p className="caveat text-xl text-sky-200 wide:text-3xl">
                {REASONS.length} little reasons
              </p>
            </div>
          </header>

          <Meter count={count} allOpened={allOpened} stage={stage} />
        </div>

        {/* Kolom permainan */}
        <div className="relative z-10 w-full px-5 pb-12 wide:flex wide:min-h-svh wide:w-7/12 wide:flex-col wide:justify-center wide:px-10 wide:py-12">
          <p
            className="caveat anim-rise mb-5 text-center text-xl text-[#1e3a5f] wide:text-2xl"
            style={{ animationDelay: "0.8s" }}
          >
            Tap every card to fill up the love meter
          </p>

          <ul className="flex flex-wrap justify-center gap-4 wide:gap-6">
            {REASONS.map((reason, i) => (
              <ReasonCard
                key={reason.title}
                reason={reason}
                index={i}
                open={opened.has(i)}
                onOpen={() => openCard(i)}
              />
            ))}
          </ul>

          {stage >= 2 && (
            <div
              ref={doneRef}
              className="anim-pop mx-auto mt-10 flex w-full max-w-sm flex-col items-center gap-3 rounded-xl border-2 border-dashed border-[#1e3a5f] bg-white/90 px-6 py-6 text-center"
            >
              <p className="yuyu text-2xl text-[#1e3a5f] wide:text-3xl">
                My heart is full of you
              </p>
              <p className="caveat text-xl text-[#1e3a5f]/80 wide:text-2xl">
                and there's still one more thing...
              </p>
              <NextButton to={NEXT_PATH} delay="0.5s" className="mt-2">
                Next
              </NextButton>
              <button
                type="button"
                onClick={reset}
                className="caveat text-lg text-[#1e3a5f]/70 underline underline-offset-4 hover:text-red-500"
              >
                play again
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Efek love pecah (layar penuh, tidak menghalangi interaksi) */}
      {stage === 1 && (
        <div
          aria-hidden="true"
          className="burst-layer pointer-events-none fixed inset-0 z-40 flex items-center justify-center"
        >
          <svg
            viewBox="0 0 100 92"
            fill="#f87171"
            stroke="#1e3a5f"
            strokeWidth="3.5"
            strokeLinejoin="round"
            className="burst-heart aspect-[100/92] h-44 w-auto wide:h-64"
          >
            <path d={HEART_BIG} />
          </svg>
          {PARTICLES.map((p) => (
            <Icon
              key={p.id}
              d={HEART_ICON}
              className="burst-particle absolute h-6 w-6"
              style={{
                color: p.color,
                animationDelay: `${p.delay}s`,
                "--tx": `${p.tx}px`,
                "--ty": `${p.ty}px`,
                "--r": `${p.rot}deg`,
                "--s": p.scale,
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
}
