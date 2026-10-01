import NextButton from "../components/next-button";

import one from "../assets/1.webp";
import two from "../assets/2.webp";
import three from "../assets/3.webp";
import five from "../assets/5.webp";

// Halaman berikutnya setelah pesan spesial
const NEXT_PATH = "/why-you-are-special";

// Ganti isi pesan di sini. Setiap item = satu paragraf.
const GREETING = "Dear Baby,";
const MESSAGE = [
  "Happy birthday, my favorite person! I wanted to make something small and sweet, just for you, because you deserve all the little things that make you smile.",
  "Thank you for being the calm in my busy days, the laugh in my silly moments, and the best part of every plan. Being with you feels like a quiet afternoon by the lake: warm, easy, and exactly where I want to be.",
  "I hope this year brings you everything you wished for, and a little extra. I'll be right here, cheering you on, like always.",
];
const CLOSING = ["With all my love,", "Always yours"];

// 3 frame foto. Biarkan src: null untuk frame kosong (blanko).
// Untuk mengisi foto: import gambarnya lalu isi src, contoh src: foto1
const PHOTOS = [
  {
    src: one,
    alt: "Our first memory",
    caption: "memory #1",
    rotate: "-rotate-6",
    tape: "bg-red-300/70",
  },
  {
    src: two,
    alt: "Our second memory",
    caption: "memory #2",
    rotate: "rotate-2",
    raise: "-translate-y-3",
    tape: "bg-yellow-200/90",
  },
  {
    src: three,
    alt: "Our third memory",
    caption: "memory #3",
    rotate: "rotate-6",
    tape: "bg-sky-300/70",
  },
];

function Heart({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 21s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12c-2.5 4.6-9.5 9-9.5 9z" />
    </svg>
  );
}

function Sparkle({ className = "", style }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" />
    </svg>
  );
}

function Polaroid({ photo, index }) {
  return (
    <figure
      className={`anim-pop relative w-[clamp(6rem,29vw,9rem)] wide:w-[clamp(5.5rem,min(13vw,22svh),11rem)] ${
        index > 0 ? "-ml-4 wide:-ml-5" : ""
      } ${photo.rotate} ${photo.raise ?? ""}`}
      style={{ animationDelay: `${1.4 + index * 0.2}s` }}
    >
      <div
        className="anim-float"
        style={{ animationDelay: `${2.6 + index * 0.6}s` }}
      >
        <div className="relative border border-[#1e3a5f]/20 bg-white p-[6%] pb-[3%] shadow-[3px_4px_0_rgba(30,58,95,0.25)]">
          {/* washi tape */}
          <span
            aria-hidden="true"
            className={`absolute -top-3 left-1/2 h-5 w-[45%] -translate-x-1/2 -rotate-3 shadow-sm ${photo.tape}`}
          />
          <div className="aspect-square overflow-hidden bg-[#dcecf9]">
            {photo.src ? (
              <img
                src={photo.src}
                alt={photo.alt}
                draggable={false}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                role="img"
                aria-label={`${photo.alt} (photo placeholder)`}
                className="flex h-full w-full items-center justify-center"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-1/3 w-1/3 text-[#1e3a5f]/25"
                >
                  <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                  <circle cx="12" cy="13" r="3.5" />
                </svg>
              </div>
            )}
          </div>
          <figcaption className="caveat mt-1 h-6 text-center text-base leading-6 text-[#1e3a5f]/70 wide:h-7 wide:text-lg wide:leading-7">
            {photo.caption}
          </figcaption>
        </div>
      </div>
    </figure>
  );
}

function PhotoFan({ className = "" }) {
  return (
    <div className={`items-end justify-center ${className}`}>
      {PHOTOS.map((photo, i) => (
        <Polaroid key={photo.caption} photo={photo} index={i} />
      ))}
    </div>
  );
}

export default function SpecialMessage() {
  return (
    <main>
      <section className="flex min-h-svh flex-col overflow-x-clip bg-gray-200 wide:flex-row">
        {/* Area strip biru + judul utama */}
        <div className="stripes-blue anim-stripes relative flex h-[26svh] min-h-44 flex-col items-center justify-center wide:sticky wide:top-0 wide:h-svh wide:min-h-0 wide:w-1/2 wide:shrink-0 wide:gap-[5svh]">
          <Sparkle
            className="anim-tag absolute left-[10%] top-[14%] h-5 w-5 text-white wide:h-8 wide:w-8"
            style={{ animationDelay: "1s" }}
          />
          <Sparkle
            className="anim-tag absolute bottom-[26%] right-[9%] h-4 w-4 text-white wide:bottom-[12%] wide:h-6 wide:w-6"
            style={{ animationDelay: "1.2s" }}
          />

          <div
            className="anim-pop -rotate-2 border-2 border-[#1e3a5f] bg-white px-6 py-3 text-center shadow-[5px_5px_0_#f87171] wide:px-10 wide:py-5"
            style={{ animationDelay: "0.6s" }}
          >
            <h1 className="yuyu text-3xl text-[#1e3a5f] wide:text-5xl xl:text-6xl">
              Special Message
            </h1>
            <p className="caveat text-xl text-red-500 wide:text-3xl">
              just for you, baby
            </p>
          </div>

          {/* Foto dekorasi versi desktop (di atas strip) */}
          <PhotoFan className="hidden wide:flex" />
        </div>

        {/* Area pesan */}
        <div className="relative z-10 -mt-8 flex flex-col items-center px-5 pb-[calc(2.5rem+env(safe-area-inset-bottom))] wide:mt-0 wide:min-h-svh wide:w-1/2 wide:justify-center wide:px-10 wide:py-14">
          <article
            className="paper-lines anim-rise relative w-full max-w-md -rotate-1 border-2 border-[#1e3a5f] pb-[var(--lh)] pl-[var(--pl)] pr-5 pt-[var(--lh)] text-2xl text-[#1e3a5f] shadow-[6px_6px_0_#5b9fd6] [--lh:2rem] [--pl:3.25rem] wide:max-w-lg wide:pr-8 wide:text-3xl wide:[--lh:2.25rem] wide:[--pl:4rem] xl:max-w-xl"
            style={{ animationDelay: "1s" }}
          >
            {/* washi tape */}
            <span
              aria-hidden="true"
              className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-2 bg-yellow-200/90 shadow-sm"
            />
            {/* dekorasi */}
            <Heart className="anim-float absolute -bottom-4 -right-2 h-10 w-10 rotate-12 text-red-400 wide:-right-4 wide:h-12 wide:w-12" />
            <Sparkle className="anim-nudge absolute -left-3 top-1/3 h-6 w-6 text-yellow-300 wide:-left-5 wide:h-8 wide:w-8" />

            <p
              className="caveat anim-rise mb-[var(--lh)] font-semibold leading-[var(--lh)]"
              style={{ animationDelay: "1.3s" }}
            >
              {GREETING}
            </p>
            {MESSAGE.map((text, i) => (
              <p
                key={i}
                className="caveat anim-rise mb-[var(--lh)] leading-[var(--lh)]"
                style={{ animationDelay: `${1.5 + i * 0.25}s` }}
              >
                {text}
              </p>
            ))}
            <p
              className="caveat anim-rise leading-[var(--lh)]"
              style={{ animationDelay: `${1.5 + MESSAGE.length * 0.25}s` }}
            >
              {CLOSING[0]}
              <br />
              <span className="font-semibold text-red-500">{CLOSING[1]}</span>
            </p>
          </article>

          {/* Foto dekorasi versi mobile (di bawah pesan) */}
          <PhotoFan className="mt-10 flex wide:hidden" />

          <NextButton to={NEXT_PATH} delay="2.4s" className="mt-10 wide:mt-12">
            One more thing
          </NextButton>
        </div>
      </section>
    </main>
  );
}
