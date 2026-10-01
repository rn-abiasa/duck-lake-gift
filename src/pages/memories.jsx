import NextButton from "../components/next-button";

// Ganti dengan path halaman berikutnya saat route-nya sudah dibuat di main.jsx
const NEXT_PATH = "/our-songs";

// 5 frame foto, masing-masing dengan gaya frame berbeda.
// Biarkan src: null untuk frame kosong (blanko).
// Untuk mengisi foto: import gambarnya lalu isi src, contoh src: foto1
// frame: "polaroid" | "arch" | "film" | "round" | "taped"
const PHOTOS = [
  {
    src: null,
    alt: "Memory one",
    caption: "memory #1",
    frame: "polaroid",
    tilt: "-rotate-3",
    tint: "bg-[#dcecf9]",
    peg: "bg-red-300",
  },
  {
    src: null,
    alt: "Memory two",
    caption: "memory #2",
    frame: "arch",
    tilt: "rotate-2",
    tint: "bg-[#fde2e4]",
    peg: "bg-sky-300",
  },
  {
    src: null,
    alt: "Memory three",
    caption: "memory #3",
    frame: "film",
    tilt: "-rotate-1",
    tint: "bg-[#fff3b8]",
    peg: "bg-yellow-300",
  },
  {
    src: null,
    alt: "Memory four",
    caption: "memory #4",
    frame: "round",
    tilt: "rotate-3",
    tint: "bg-[#d8f3e4]",
    peg: "bg-pink-300",
  },
  {
    src: null,
    alt: "Memory five",
    caption: "memory #5",
    frame: "taped",
    tilt: "-rotate-2",
    tint: "bg-[#e6e0f8]",
    peg: "bg-red-300",
  },
];

function Photo({ photo, className = "" }) {
  return (
    <div className={`overflow-hidden ${photo.tint} ${className}`}>
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
  );
}

function Caption({ children, className = "" }) {
  return (
    <p
      className={`caveat mt-1 text-center text-base leading-6 wide:text-lg wide:leading-7 ${className}`}
    >
      {children}
    </p>
  );
}

// Lima gaya frame: polaroid, lengkung (arch), rol film, bulat (porthole), dan foto ber-tape
function Frame({ photo }) {
  switch (photo.frame) {
    case "arch":
      return (
        <div className="rounded-t-full border-2 border-[#1e3a5f] bg-white p-[8%] pb-[3%] shadow-[4px_4px_0_#f87171]">
          <Photo photo={photo} className="aspect-[4/5] rounded-t-full" />
          <Caption className="text-[#1e3a5f]/80">{photo.caption}</Caption>
        </div>
      );
    case "film":
      return (
        <div className="relative bg-[#1e3a5f] px-[15%] pb-[3%] pt-[8%] shadow-[4px_4px_0_#5b9fd6]">
          <span
            aria-hidden="true"
            className="film-holes absolute inset-y-2 left-[4%] w-[7%]"
          />
          <span
            aria-hidden="true"
            className="film-holes absolute inset-y-2 right-[4%] w-[7%]"
          />
          <Photo photo={photo} className="aspect-[4/5]" />
          <Caption className="text-sky-200">{photo.caption}</Caption>
        </div>
      );
    case "round":
      return (
        <div className="rounded-3xl border-2 border-[#1e3a5f] bg-white p-[9%] pb-[3%] shadow-[4px_4px_0_#5b9fd6]">
          <Photo
            photo={photo}
            className="aspect-square rounded-full border-4 border-[#fde2e4]"
          />
          <Caption className="text-[#1e3a5f]/80">{photo.caption}</Caption>
        </div>
      );
    case "taped":
      return (
        <div className="relative">
          <Photo
            photo={photo}
            className="aspect-square border-[5px] border-white shadow-[3px_4px_0_rgba(30,58,95,0.25)]"
          />
          <span
            aria-hidden="true"
            className="absolute -left-2 top-1 h-4 w-10 -rotate-45 bg-yellow-200/90 shadow-sm"
          />
          <span
            aria-hidden="true"
            className="absolute -right-2 bottom-5 h-4 w-10 -rotate-45 bg-sky-300/70 shadow-sm"
          />
          <Caption className="mx-auto -mt-1 w-fit -rotate-2 bg-yellow-100 px-3 text-[#1e3a5f]">
            {photo.caption}
          </Caption>
        </div>
      );
    default:
      return (
        <div className="border border-[#1e3a5f]/20 bg-white p-[6%] pb-[3%] shadow-[3px_4px_0_rgba(30,58,95,0.25)]">
          <Photo photo={photo} className="aspect-square" />
          <Caption className="text-[#1e3a5f]/80">{photo.caption}</Caption>
        </div>
      );
  }
}

function HangingPhoto({ photo, index }) {
  return (
    <li
      className="anim-rise relative w-[40vw] max-w-40 wide:w-[clamp(6.5rem,15vw,12rem)] wide:max-w-none"
      style={{ animationDelay: `${0.6 + index * 0.2}s` }}
    >
      {/* tali jemuran */}
      <span
        aria-hidden="true"
        className="twine absolute -left-3 -right-3 top-0 h-1"
      />

      {/* wrapper ayunan: berayun dari titik jepitan */}
      <div
        className="anim-swing pt-1"
        style={{
          "--d": `${0.8 + index * 0.25}s`,
          "--sway": `${4.6 + index * 0.5}s`,
        }}
      >
        <div
          className={`relative origin-top transition-[scale] duration-200 hover:scale-105 ${photo.tilt}`}
        >
          {/* jepitan */}
          <span
            aria-hidden="true"
            className={`absolute -top-3 left-1/2 z-10 h-7 w-3 -translate-x-1/2 rounded-[3px] border-2 border-[#1e3a5f] ${photo.peg}`}
          >
            <span className="absolute inset-x-0 top-1/2 h-0.5 bg-[#1e3a5f]/40" />
          </span>
          <Frame photo={photo} />
        </div>
      </div>
    </li>
  );
}

export default function Memories() {
  return (
    <main>
      <section className="dots-blue relative flex min-h-svh flex-col items-center overflow-x-clip">
        {/* Judul utama */}
        <header className="relative z-10 w-full text-center">
          <div
            aria-hidden="true"
            className="bunting anim-rise w-full"
            style={{ animationDelay: "0.1s" }}
          />
          <div className="px-5 pt-5 wide:pt-8">
            <h1
              className="anim-pop yuyu text-4xl text-[#1e3a5f] wide:text-6xl"
              style={{ animationDelay: "0.4s" }}
            >
              Our Memories
            </h1>
            <svg
              aria-hidden="true"
              viewBox="0 0 164 16"
              fill="none"
              stroke="#f87171"
              strokeWidth="3"
              strokeLinecap="round"
              className="mx-auto mt-1 h-3 w-40 wide:h-4 wide:w-56"
            >
              <path className="draw" d="M2 8 Q22 0 42 8 T82 8 T122 8 T162 8" />
            </svg>
            <p
              className="anim-rise caveat mt-2 text-xl text-[#1e3a5f] wide:text-3xl"
              style={{ animationDelay: "0.7s" }}
            >
              little moments, kept close to my heart
            </p>
          </div>
        </header>

        {/* 5 foto tergantung di tali jemuran */}
        <ul className="relative z-10 mt-12 flex w-full max-w-6xl flex-wrap justify-center gap-x-6 gap-y-14 px-5 wide:mt-16 wide:gap-x-5 wide:px-8">
          {PHOTOS.map((photo, i) => (
            <HangingPhoto key={photo.caption} photo={photo} index={i} />
          ))}
        </ul>

        <div className="relative z-10 mt-14 pb-20 wide:mt-16">
          <NextButton to={NEXT_PATH} delay="2.2s">
            Next
          </NextButton>
        </div>

        {/* Gelombang danau di dasar halaman */}
        <div
          aria-hidden="true"
          className="waves pointer-events-none absolute inset-x-0 bottom-0 h-8"
        />
      </section>
    </main>
  );
}
