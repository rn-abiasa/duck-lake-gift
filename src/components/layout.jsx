import { Outlet, ScrollRestoration } from "react-router-dom";

// Pembungkus semua halaman: setiap pindah halaman, scroll otomatis kembali ke atas
export default function Layout() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
