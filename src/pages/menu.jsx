import { Link } from "react-router-dom";

const HEART_ICON =
  "M12 21s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12c-2.5 4.6-9.5 9-9.5 9z";
const SPARKLE_ICON = "M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z";

const NAVY = "#1e3a5f";

// 5 pilihan hadiah. `art` = nama ilustrasi di ARTS di bawah.
const GIFTS = [
  {
    to: "/special-message",
    title: "Special Message",
    sub: "a letter for you",
    art: "envelope",
    tint: "bg-[#fff3b8]",
    shadow: "shadow-[5px_5px_0_#f87171]",
    tilt: "-rotate-2",
  },
  {
    to: "/why-you-are-special",
    title: "Reasons",
    sub: "why you are special",
    art: "cards",
    tint: "bg-[#fde2e4]",
    shadow: "shadow-[5px_5px_0_#5b9fd6]",
    tilt: "rotate-1",
  },
  {
    to: "/memories",
    title: "Memories",
    sub: "our little moments",
    art: "polaroid",
    tint: "bg-[#dcecf9]",
    shadow: "shadow-[5px_5px_0_#f4c95d]",
    tilt: "-rotate-1",
  },
  {
    to: "/our-songs",
    title: "Songs",
    sub: "tunes that sound like us",
    art: "vinyl",
    tint: "bg-[#d8f3e4]",
    shadow: "shadow-[5px_5px_0_#f9a8d4]",
    tilt: "rotate-2",
  },
  {
    to: "/wish",
    title: "Wish",
    sub: "blow the candle",
    art: "cake",
    tint: "bg-[#e6e0f8]",
    shadow: "shadow-[5px_5px_0_#86efac]",
    tilt: "-rotate-1",
  },
];

// Dekorasi latar yang melayang pelan
const DOODLES = [
  { d: HEART_ICON, pos: "left-[5%] top-[30%]", color: "text-pink-300", size: "h-7 w-7" },
  { d: SPARKLE_ICON, pos: "right-[6%] top-[22%]", color: "text-yellow-300", size: "h-6 w-6" },
  { d: HEART_ICON, pos: "right-[8%] top-[62%]", color: "text-sky-400", size: "h-6 w-6" },
  { d: SPARKLE_ICON, pos: "left-[7%] top-[80%]", color: "text-red-300", size: "h-7 w-7" },
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

/* ---------- Ilustrasi (SVG 100x100) dengan animasi idle masing-masing ---------- */

// Amplop: surat naik-turun dari dalam amplop, segel hati berdenyut
function EnvelopeArt() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="h-full w-full overflow-visible">
      <rect x="12" y="34" width="76" height="52" rx="5" fill="#fbbf24" stroke={NAVY} strokeWidth="3" />
      <path d="M12 34 L50 10 L88 34Z" fill="#f9a8d4" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" />
      <g className="menu-letter">
        <rect x="22" y="26" width="56" height="46" rx="3" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
        <path d="M30 38h40M30 47h40M30 56h26" stroke="#5b9fd6" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <path
        d="M12 40 L50 66 L88 40 V81 a5 5 0 0 1 -5 5 H17 a5 5 0 0 1 -5 -5Z"
        fill="#fde2e4"
        stroke={NAVY}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M12 86 L40 60 M88 86 L60 60" stroke={NAVY} strokeOpacity="0.3" strokeWidth="2" />
      <g className="menu-pulse">
        <circle cx="50" cy="68" r="9" fill="#f87171" stroke={NAVY} strokeWidth="2.5" />
        <path d={HEART_ICON} transform="translate(42 60) scale(0.67)" fill="#fff" />
      </g>
    </svg>
  );
}

// Kartu alasan: tumpukan kartu, kartu depan berbalik menampilkan sisi lain
function CardsArt() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="h-full w-full overflow-visible">
      <g transform="rotate(-14 50 50)">
        <rect x="30" y="20" width="42" height="60" rx="7" fill="#dcecf9" stroke={NAVY} strokeWidth="3" />
      </g>
      <g transform="rotate(12 50 50)">
        <rect x="28" y="20" width="42" height="60" rx="7" fill="#fff3b8" stroke={NAVY} strokeWidth="3" />
      </g>
      <g className="menu-flipcard">
        <rect x="29" y="18" width="42" height="62" rx="7" fill="#fff" stroke={NAVY} strokeWidth="3" />
        <g className="menu-face-a">
          <path d={HEART_ICON} transform="translate(34.5 34) scale(1.3)" fill="#f87171" />
        </g>
        <g className="menu-face-b">
          <rect x="34" y="23" width="32" height="52" rx="4" fill="#fde2e4" />
          <path d={SPARKLE_ICON} transform="translate(40 32) scale(0.85)" fill="#fbbf24" />
          <path d={SPARKLE_ICON} transform="translate(52 52) scale(0.55)" fill="#f87171" />
          <path d={SPARKLE_ICON} transform="translate(38 56) scale(0.45)" fill="#5b9fd6" />
        </g>
      </g>
    </svg>
  );
}

// Polaroid yang tergantung di tali dan berayun
function PolaroidArt() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="h-full w-full overflow-visible">
      <path d="M2 16 H98" stroke="#f87171" strokeWidth="3.5" strokeDasharray="7 5" strokeLinecap="round" />
      <path d="M2 16 H98" stroke={NAVY} strokeWidth="1" strokeOpacity="0.5" />
      <g className="menu-swing">
        <rect x="26" y="22" width="48" height="64" fill="#fff" stroke={NAVY} strokeWidth="3" />
        <rect x="31" y="27" width="38" height="38" fill="#bfe3f7" />
        <circle cx="58" cy="37" r="5" fill="#fcd34d" />
        <path d="M31 65 L45 45 L54 56 L60 49 L69 65Z" fill="#86efac" stroke={NAVY} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M34 76h22" stroke={NAVY} strokeOpacity="0.5" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="45" y="9" width="10" height="20" rx="2.5" fill="#fcd34d" stroke={NAVY} strokeWidth="2.5" />
        <path d="M50 12v14" stroke={NAVY} strokeOpacity="0.4" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

// Piringan vinyl berputar dengan not musik yang naik
function VinylArt() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="h-full w-full overflow-visible">
      <g className="menu-spin">
        <circle cx="50" cy="54" r="36" fill="#1f2433" stroke={NAVY} strokeWidth="3" />
        {[30, 25, 20].map((r) => (
          <circle key={r} cx="50" cy="54" r={r} fill="none" stroke="#3a4157" strokeWidth="1" />
        ))}
        <path d="M26 40 A28 28 0 0 1 44 28" stroke="#fff" strokeOpacity="0.28" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="50" cy="54" r="13" fill="#f87171" />
        <circle cx="50" cy="54" r="2.5" fill="#fff8ec" />
      </g>
      {[0, 1.2].map((delay, i) => (
        <g key={i} className="menu-note" style={{ animationDelay: `${delay}s` }}>
          <g
            transform={`translate(${i ? 8 : 72} ${i ? 14 : 18}) scale(0.8)`}
            fill="none"
            stroke={i ? "#f87171" : "#5b9fd6"}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18V6l10-2v12" />
            <circle cx="6.5" cy="18" r="2.5" />
            <circle cx="16.5" cy="16" r="2.5" />
          </g>
        </g>
      ))}
    </svg>
  );
}

// Kue dengan lilin yang apinya berkedip
function CakeArt() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="h-full w-full overflow-visible">
      <ellipse cx="50" cy="88" rx="40" ry="5" fill="#cfe6f7" stroke={NAVY} strokeWidth="2.5" />
      <rect x="18" y="62" width="64" height="24" rx="4" fill="#fde2e4" stroke={NAVY} strokeWidth="3" />
      <g fill="#f87171">
        <rect x="19.5" y="63.5" width="61" height="6" />
        {[24.5, 34.5, 44.5, 54.5, 64.5, 74.5].map((cx) => (
          <circle key={cx} cx={cx} cy="69.5" r="5" />
        ))}
      </g>
      <rect x="30" y="42" width="40" height="20" rx="4" fill="#dcecf9" stroke={NAVY} strokeWidth="3" />
      <g fill="#5b9fd6">
        <rect x="31.5" y="43.5" width="37" height="4" />
        {[34, 42, 50, 58, 66].map((cx) => (
          <circle key={cx} cx={cx} cy="47.5" r="4" />
        ))}
      </g>
      <rect x="47" y="27" width="6" height="15" rx="1.5" fill="#fff" stroke={NAVY} strokeWidth="2" />
      <path d="M50 27v-3" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" />
      <path
        className="menu-flame"
        d="M50 24 C45 19 47 13 50 8 C53 13 55 19 50 24Z"
        fill="#fcd34d"
        stroke={NAVY}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <g transform="translate(14 14) scale(0.6)">
        <path className="menu-pulse" d={SPARKLE_ICON} fill="#fbbf24" />
      </g>
      <g transform="translate(74 28) scale(0.5)">
        <path
          className="menu-pulse"
          d={SPARKLE_ICON}
          fill="#f9a8d4"
          style={{ animationDelay: "0.8s" }}
        />
      </g>
    </svg>
  );
}

const ARTS = {
  envelope: EnvelopeArt,
  cards: CardsArt,
  polaroid: PolaroidArt,
  vinyl: VinylArt,
  cake: CakeArt,
};

function GiftTile({ gift, index }) {
  const Art = ARTS[gift.art];
  return (
    <li
      className="anim-pop w-[calc(50%-0.625rem)] max-w-44 even:mt-6 wide:w-[clamp(9rem,17vw,13.5rem)] wide:max-w-none"
      style={{ animationDelay: `${0.9 + index * 0.15}s` }}
    >
      <Link
        to={gift.to}
        aria-label={`${gift.title}: ${gift.sub}`}
        className={`group block rounded-2xl border-2 border-[#1e3a5f] bg-white p-2.5 transition-[translate,rotate,box-shadow] duration-200 hover:-translate-y-1.5 hover:rotate-0 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-red-400 active:translate-y-0.5 wide:p-3 ${gift.shadow} ${gift.tilt}`}
      >
        <span
          className={`block aspect-square rounded-xl border-2 border-[#1e3a5f]/15 p-3 ${gift.tint}`}
        >
          <span
            className="menu-bob block h-full w-full transition-[scale] duration-200 group-hover:scale-110"
            style={{ "--d": `${index * 0.5}s` }}
          >
            <Art />
          </span>
        </span>
        <span className="yuyu mt-2 block text-center text-base text-[#1e3a5f] wide:text-lg">
          {gift.title}
        </span>
        <span className="caveat block text-center text-lg leading-5 text-[#1e3a5f]/70 wide:text-xl">
          {gift.sub}
        </span>
      </Link>
    </li>
  );
}

export default function Menu() {
  return (
    <main>
      <section className="giftwrap-bg relative flex min-h-svh flex-col items-center overflow-x-clip px-5 pb-14 pt-4 wide:pt-6">
        {/* Dekorasi latar */}
        {DOODLES.map((doodle, i) => (
          <Icon
            key={i}
            d={doodle.d}
            className={`anim-float pointer-events-none absolute z-0 ${doodle.pos} ${doodle.color} ${doodle.size}`}
            style={{ animationDelay: `${1.2 + i * 0.5}s` }}
          />
        ))}

        {/* Judul: label hadiah yang tergantung di pita */}
        <header className="relative z-10 flex flex-col items-center text-center">
          {/* pita */}
          <svg
            aria-hidden="true"
            viewBox="0 0 80 44"
            className="anim-pop h-11 w-20"
            style={{ animationDelay: "0.1s" }}
          >
            <path d="M40 30 C28 8 6 4 6 16 C6 26 26 30 40 30Z" fill="#f87171" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M40 30 C52 8 74 4 74 16 C74 26 54 30 40 30Z" fill="#f87171" stroke={NAVY} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M40 30 L28 42 M40 30 L52 42" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="40" cy="28" r="6" fill="#fda4af" stroke={NAVY} strokeWidth="2.5" />
          </svg>

          <div
            className="anim-swing flex flex-col items-center"
            style={{ "--d": "0.3s", "--sway": "5s" }}
          >
            <span aria-hidden="true" className="-mt-1 block h-6 w-0.5 bg-[#1e3a5f]" />
            <div className="drop-shadow-[3px_3px_0_#1e3a5f]">
              <div className="gift-tag relative bg-[#fda4af] px-10 pb-4 pt-8 wide:px-16 wide:pb-5 wide:pt-10">
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-3 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-[#1e3a5f] bg-[#fff1f2]"
                />
                <h1 className="yuyu text-3xl text-[#1e3a5f] wide:text-5xl xl:text-6xl">
                  Choose Your Gift
                </h1>
              </div>
            </div>
          </div>

          <p
            className="anim-rise caveat mt-4 text-xl text-red-500 wide:text-3xl"
            style={{ animationDelay: "0.8s" }}
          >
            tap a gift to open it
          </p>
        </header>

        {/* 5 hadiah */}
        <ul className="relative z-10 mt-8 flex w-full max-w-6xl flex-wrap justify-center gap-x-5 gap-y-8 wide:mt-12 wide:gap-x-6">
          {GIFTS.map((gift, i) => (
            <GiftTile key={gift.to} gift={gift} index={i} />
          ))}
        </ul>
      </section>
    </main>
  );
}
