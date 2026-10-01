import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import Cover from "./pages/cover";
import SpecialMessage from "./pages/special-message";
import WhyYouAreSpecial from "./pages/why-you-are-special";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Cover />,
  },
  {
    path: "/special-message",
    element: <SpecialMessage />,
  },
  {
    path: "/why-you-are-special",
    element: <WhyYouAreSpecial />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
