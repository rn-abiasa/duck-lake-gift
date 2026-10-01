import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

// Matikan pemulihan scroll bawaan browser (iOS/Android sering mengembalikan posisi lama)
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

// Pembungkus semua halaman: setiap pindah halaman, scroll kembali ke atas
export default function Layout() {
  const { pathname, key } = useLocation();

  useLayoutEffect(() => {
    scrollToTop();
    // Ulangi setelah frame berikutnya, karena browser HP kadang menggeser scroll
    // lagi sesudah layout halaman baru selesai dihitung.
    const frame = requestAnimationFrame(scrollToTop);
    return () => cancelAnimationFrame(frame);
  }, [pathname, key]);

  return <Outlet />;
}
