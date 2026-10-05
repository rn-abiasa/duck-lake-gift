import { useEffect, useRef, useState } from "react";
import NextButton from "../components/next-button";
import wrapper from "../assets/vinyl_wrapper_sketch.webp";
import two from "../assets/2.webp";
import three from "../assets/3.webp";
import five from "../assets/5.webp";

// Halaman berikutnya setelah daftar lagu
const NEXT_PATH = "/wish";

// 1 lagu. Isi `url` dengan link YouTube (watch?v=..., youtu.be/..., atau ID 11 karakter).
// Selama url masih kosong, kartu tampil tetapi tombol play dinonaktifkan.
const SONGS = [
  {
    title: "Shape Of My Heart",
    artist: "Backstreet Boys",
    url: "OT5msu-dap8",
    tint: "bg-[#fff3b8]",
    label: "#fcd34d",
    shadow: "shadow-[5px_5px_0_#f87171]",
    tilt: "-rotate-1",
    side: "mx-auto",
    stagger: "",
  },
];

// Not musik melayang di sekitar gambar vinyl
const NOTES = [
  {
    pos: "left-[6%] top-[40%]",
    color: "#f87171",
    dur: "4.2s",
    d: "1.6s",
    dx: "-14px",
  },
  {
    pos: "left-[22%] top-[8%]",
    color: "#5b9fd6",
    dur: "3.8s",
    d: "2.2s",
    dx: "10px",
  },
  {
    pos: "right-[22%] top-[4%]",
    color: "#e0a526",
    dur: "4.6s",
    d: "1.9s",
    dx: "-8px",
  },
  {
    pos: "right-[6%] top-[38%]",
    color: "#6f8f5e",
    dur: "4s",
    d: "2.6s",
    dx: "14px",
  },
  {
    pos: "left-[46%] top-[0%]",
    color: "#f9a8d4",
    dur: "5s",
    d: "3s",
    dx: "6px",
  },
];

function getYoutubeId(input) {
  if (!input) return null;
  const text = input.trim();
  const match = text.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  if (match) return match[1];
  return /^[\w-]{11}$/.test(text) ? text : null;
}

// Load YouTube IFrame API sekali saja untuk semua kartu lagu.
// Player dibuat lebih awal (eager) agar saat user menekan play, player sudah siap
// dan playVideo() berjalan tepat di dalam jendela user activation browser (~5 detik).
let youtubeApiPromise = null;
function loadYoutubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeApiPromise) return youtubeApiPromise;
  youtubeApiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previous === "function") previous();
      resolve(window.YT);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => {
      youtubeApiPromise = null; // izinkan percobaan ulang di mount berikutnya
      resolve(null);
    };
    document.head.appendChild(script);
  });
  return youtubeApiPromise;
}

function NoteIcon({ className = "", style }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M9 18V6l10-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </svg>
  );
}

function PlayIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function StopIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}

// Piringan vinyl (CSS) dengan label berwarna
function Disc({ color, className = "", style }) {
  return (
    <span className={`vinyl ${className}`} style={style}>
      <span
        className="absolute inset-[34%] rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="absolute left-1/2 top-1/2 h-[5%] w-[5%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#eaf4fc]" />
    </span>
  );
}

function SongCard({ song, index, active, onToggle }) {
  const id = getYoutubeId(song.url);
  const playable = Boolean(id);
  const name = `${song.title} by ${song.artist}`;

  const mountRef = useRef(null);
  const playerRef = useRef(null);
  const wantPlayRef = useRef(active);

  // Buat player secara eager saat kartu dimount (tanpa autoplay).
  // Node container dikelola React; iframe dari YT.Player dimasukkan ke dalamnya
  // lewat elemen turunan agar aman terhadap StrictMode (mount/unmount ganda).
  useEffect(() => {
    if (!id) return undefined;
    const mount = mountRef.current;
    if (!mount) return undefined;
    let cancelled = false;

    loadYoutubeApi().then((YT) => {
      if (cancelled || !YT) return;
      const target = document.createElement("div");
      mount.appendChild(target);
      playerRef.current = new YT.Player(target, {
        videoId: id,
        playerVars: {
          autoplay: 0,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          origin: window.location.origin,
          host: "https://www.youtube-nocookie.com",
        },
        events: {
          onReady: () => {
            if (cancelled || !playerRef.current) return;
            playerRef.current.getIframe()?.setAttribute("title", name);
            // Jika user menekan play sebelum player sempat siap, langsung putar
            if (wantPlayRef.current) playerRef.current.playVideo();
          },
        },
      });
    });

    return () => {
      cancelled = true;
      wantPlayRef.current = false;
      try {
        playerRef.current?.destroy?.();
      } catch {
        // iframe sudah dilepas browser — abaikan
      }
      playerRef.current = null;
      mount.replaceChildren();
    };
  }, [id, name]);

  // Play/pause mengikuti state active (hanya satu lagu yang bunyi dalam satu waktu)
  useEffect(() => {
    wantPlayRef.current = active;
    const player = playerRef.current;
    if (!player) return; // player belum siap — akan ditangani saat onReady
    if (active) player.playVideo();
    else player.pauseVideo();
  }, [active]);

  return (
    <li
      className={`anim-rise relative w-[90%] ${song.side} ${song.stagger} wide:w-full wide:max-w-md wide:justify-self-center`}
      style={{ animationDelay: `${1.2 + index * 0.2}s` }}
    >
      <div
        className={`relative rounded-2xl border-2 border-[#1e3a5f] bg-white p-3 transition-[rotate,translate] duration-300 ${
          song.shadow
        } ${active ? "rotate-0 -translate-y-1" : song.tilt}`}
      >
        {/* washi tape */}
        <span
          aria-hidden="true"
          className="absolute -top-3 left-1/2 z-20 h-5 w-16 -translate-x-1/2 -rotate-2 bg-yellow-200/90 shadow-sm"
        />

        {active && (
          <span className="caveat absolute -top-4 right-3 z-20 flex -rotate-3 items-center gap-2 rounded-full border-2 border-[#1e3a5f] bg-[#f4c95d] px-3 text-base font-semibold text-[#1e3a5f]">
            <span aria-hidden="true" className="flex h-3 items-end gap-0.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="eq-bar block h-3 w-1 rounded-sm bg-[#1e3a5f]"
                  style={{ "--d": `${i * 0.2}s` }}
                />
              ))}
            </span>
            now playing
          </span>
        )}

        {/* Area media: thumbnail video (cover) -> player YouTube saat dimainkan */}
        <div
          className={`relative aspect-[4/3] overflow-hidden rounded-xl border-2 border-[#1e3a5f] ${song.tint}`}
        >
          {playable && (
            <div
              ref={mountRef}
              inert={!active}
              className="absolute inset-0 [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0"
            />
          )}
          {!active && (
            <button
              type="button"
              onClick={onToggle}
              disabled={!playable}
              aria-label={
                playable ? `Play ${name}` : `${name} (add a YouTube link first)`
              }
              className="absolute inset-0 z-10 block w-full cursor-pointer transition-[filter] duration-150 focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-red-400 hover:brightness-110 disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
              {id && (
                <img
                  src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full select-none object-cover"
                />
              )}
              {!playable && (
                <span className="caveat absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-3 text-base text-[#1e3a5f]">
                  add a YouTube link
                </span>
              )}
            </button>
          )}
        </div>

        {/* Info lagu + tombol */}
        <div className="mt-3 flex items-center gap-3">
          <Disc
            color={song.label}
            className={`relative block h-11 w-11 shrink-0 ${active ? "spin-disc-fast" : ""}`}
          />
          <div className="min-w-0 flex-1">
            <p className="yuyu truncate text-lg text-[#1e3a5f] wide:text-xl">
              {song.title}
            </p>
            <p className="caveat truncate text-xl leading-5 text-[#1e3a5f]/70 wide:text-2xl">
              {song.artist}
            </p>
          </div>
          <button
            type="button"
            onClick={onToggle}
            disabled={!playable}
            aria-pressed={active}
            className="caveat inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 border-[#1e3a5f] bg-white px-4 py-1 text-xl font-semibold text-[#1e3a5f] shadow-[3px_3px_0_#5b9fd6] transition-[translate,box-shadow] duration-150 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-red-400 enabled:hover:-translate-y-0.5 enabled:active:translate-x-0.5 enabled:active:translate-y-0.5 enabled:active:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {active ? (
              <StopIcon className="h-4 w-4 text-red-400" />
            ) : (
              <PlayIcon className="h-4 w-4 text-red-400" />
            )}
            {active ? "Stop" : "Play"}
          </button>
        </div>
      </div>
    </li>
  );
}

// Foto kenangan di samping kartu lagu (collage 3 polaroid).
// pos = posisi di dalam collage (persen), ratio = rasio foto di dalam frame.
const MEMORIES = [
  {
    src: two,
    alt: "Us, laughing together",
    caption: "me & you",
    pos: "left-0 top-0 z-10 w-[64%]",
    ratio: "aspect-[4/3]",
    tilt: "-rotate-6",
    tape: "bg-red-300/70",
  },
  {
    src: three,
    alt: "Us, sitting by the flowers",
    caption: "my favorite place",
    pos: "right-0 top-[27%] z-20 w-[50%]",
    ratio: "aspect-[4/5]",
    tilt: "rotate-6",
    tape: "bg-yellow-200/90",
  },
  {
    src: five,
    alt: "Us, sitting on the steps",
    caption: "always us",
    pos: "bottom-0 left-[6%] z-30 w-[62%]",
    ratio: "aspect-[4/3]",
    tilt: "-rotate-3",
    tape: "bg-sky-300/70",
  },
];

function MemoryPolaroid({ memory, index }) {
  return (
    <div
      className={`anim-pop absolute ${memory.pos}`}
      style={{ animationDelay: `${1.4 + index * 0.25}s` }}
    >
      <div
        className="anim-float"
        style={{ animationDelay: `${2.6 + index * 0.7}s` }}
      >
        <div
          className={`relative border border-[#1e3a5f]/20 bg-white p-[6%] pb-[3%] shadow-[4px_5px_0_rgba(30,58,95,0.25)] transition-[rotate,scale] duration-200 hover:rotate-0 hover:scale-105 ${memory.tilt}`}
        >
          {/* washi tape */}
          <span
            aria-hidden="true"
            className={`absolute -top-3 left-1/2 h-5 w-[42%] -translate-x-1/2 -rotate-3 shadow-sm ${memory.tape}`}
          />
          <img
            src={memory.src}
            alt={memory.alt}
            draggable={false}
            loading="lazy"
            className={`w-full select-none object-cover ${memory.ratio}`}
          />
          <p className="caveat mt-1 text-center text-base leading-6 text-[#1e3a5f]/80 wide:text-lg wide:leading-7">
            {memory.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

function MemoryCollage() {
  return (
    <div
      role="group"
      aria-label="Our memories"
      className="relative aspect-[10/13] w-[min(88vw,22rem)] shrink-0 wide:w-[clamp(16rem,34vw,25rem)]"
    >
      {/* sticker hati & bintang di sekitar collage */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="anim-float absolute -right-2 -top-3 z-40 h-8 w-8 rotate-12 text-red-400"
        style={{ animationDelay: "2.2s" }}
      >
        <path d="M12 21s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12c-2.5 4.6-9.5 9-9.5 9z" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="anim-float absolute -left-3 bottom-[34%] z-40 h-6 w-6 text-yellow-400"
        style={{ animationDelay: "3s" }}
      >
        <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" />
      </svg>

      {MEMORIES.map((memory, i) => (
        <MemoryPolaroid key={memory.caption} memory={memory} index={i} />
      ))}
    </div>
  );
}

export default function OurSongs() {
  // Hanya satu lagu yang aktif: iframe lagu lain otomatis dilepas sehingga tidak bisa bunyi bersamaan
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (i) => setActiveIndex((current) => (current === i ? null : i));

  return (
    <main>
      <section className="staff-bg relative flex min-h-svh flex-col items-center overflow-x-clip">
        {/* Dekorasi sampul vinyl di pinggir halaman */}
        <img
          src={wrapper}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="anim-float pointer-events-none absolute -left-16 top-[48%] z-0 w-44 -rotate-12 select-none opacity-80 wide:-left-10 wide:w-60"
          style={{ animationDelay: "2.4s" }}
        />
        <img
          src={wrapper}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="anim-float pointer-events-none absolute -right-20 bottom-[8%] z-0 w-48 rotate-12 select-none opacity-80 wide:-right-12 wide:w-64"
          style={{ animationDelay: "3s" }}
        />

        {/* Judul utama */}
        <header className="relative z-10 flex flex-col items-center px-5 pt-8 text-center wide:pt-10">
          <div
            className="anim-pop -rotate-1 drop-shadow-[3px_3px_0_#1e3a5f]"
            style={{ animationDelay: "0.3s" }}
          >
            <h1 className="ribbon yuyu bg-[#f4c95d] px-12 py-3 text-3xl text-[#1e3a5f] wide:px-16 wide:text-5xl xl:text-6xl">
              Our Songs
            </h1>
          </div>
          <p
            className="anim-rise caveat mt-3 text-xl text-red-500 wide:text-3xl"
            style={{ animationDelay: "0.7s" }}
          >
            songs that sound like us
          </p>

          <div className="relative mt-4 px-10 wide:px-16">
            {NOTES.map((note, i) => (
              <NoteIcon
                key={i}
                className={`note pointer-events-none absolute h-6 w-6 wide:h-8 wide:w-8 ${note.pos}`}
                style={{
                  color: note.color,
                  "--dur": note.dur,
                  "--d": note.d,
                  "--dx": note.dx,
                }}
              />
            ))}
          </div>
        </header>

        {/* Kartu lagu + foto kenangan di sampingnya (desktop) / di bawahnya (HP) */}
        <div className="relative z-10 mt-10 flex w-full max-w-5xl flex-col items-center gap-14 px-5 wide:mt-14 wide:flex-row wide:justify-center wide:gap-16 wide:px-8">
          <ul className="w-full wide:w-auto wide:flex-1">
            {SONGS.map((song, i) => (
              <SongCard
                key={i}
                song={song}
                index={i}
                active={activeIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </ul>

          <MemoryCollage />
        </div>

        <div className="relative z-10 mt-14 pb-16 wide:mt-16">
          <NextButton to={NEXT_PATH} delay="2.4s">
            Next
          </NextButton>
        </div>
      </section>
    </main>
  );
}
