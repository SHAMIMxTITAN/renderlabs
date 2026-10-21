import "@/App.css";
import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { createBrowserRouter, Navigate, Outlet, RouterProvider, ScrollRestoration } from "react-router-dom";
import Landing from "@/pages/Landing";
import ServicePage from "@/pages/ServicePage";
import { Toaster } from "@/components/ui/sonner";

// One smooth-scroll instance for every page, so all pages scroll the same way.
// ScrollRestoration handles top-of-page, #hash targets and back/forward positions.
function Root() {
  // shortcut: Framer 11 reads reduced motion on mount; reload after OS changes until its hook supports live updates.
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) return;
    // lerp, not a fixed duration: the page follows the wheel closely and settles
    // in ~0.25s. The old 1.1s glide felt like the site lagging behind the hand.
    const lenis = new Lenis({ lerp: 0.14, smoothWheel: true });
    window.lenis = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.lenis = null;
    };
  }, [reducedMotion]);

  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/services/:key", element: <ServicePage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
