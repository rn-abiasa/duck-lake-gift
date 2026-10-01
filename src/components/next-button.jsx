import { Link } from "react-router-dom";

// Tombol "next" bergaya sticker, dipakai di halaman-halaman setelah cover
export default function NextButton({
  to,
  children,
  delay = "0s",
  className = "",
}) {
  return (
    <Link
      to={to}
      className={`anim-rise caveat group inline-flex items-center gap-3 rounded-full border-2 border-[#1e3a5f] bg-white px-6 py-2 text-2xl font-semibold text-[#1e3a5f] shadow-[4px_4px_0_#5b9fd6] transition-[translate,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#5b9fd6] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-red-400 active:translate-x-1 active:translate-y-1 active:shadow-none wide:px-8 wide:py-3 wide:text-3xl ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
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
  );
}
