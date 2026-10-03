import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import Layout from "./components/layout";
import Cover from "./pages/cover";
import Menu from "./pages/menu";
import SpecialMessage from "./pages/special-message";
import WhyYouAreSpecial from "./pages/why-you-are-special";
import Memories from "./pages/memories";
import OurSongs from "./pages/our-songs";
import Wish from "./pages/wish";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Cover />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/special-message",
        element: <SpecialMessage />,
      },
      {
        path: "/why-you-are-special",
        element: <WhyYouAreSpecial />,
      },
      {
        path: "/memories",
        element: <Memories />,
      },
      {
        path: "/our-songs",
        element: <OurSongs />,
      },
      {
        path: "/wish",
        element: <Wish />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
