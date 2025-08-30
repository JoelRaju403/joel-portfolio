"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";

export function NavBar() {
  const pathname = usePathname() || "/";
  const menuItems = ["Home", "About", "Projects", "Skills"];
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const [isDesktop, setIsDesktop] = useState(false);

  // Hide/show on scroll
  useEffect(() => {
    let prev = window.scrollY;
    const onScroll = () => {
      const curr = window.scrollY;
      setVisible(curr <= 0 || curr < prev);
      prev = curr;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sync highlight when route changes
  useLayoutEffect(() => {
    const key = pathname === "/" ? "home" : pathname.slice(1);
    const el = itemRefs.current[key];
    if (el) {
      setPosition({
        top: el.offsetTop,
        left: el.offsetLeft,
        width: el.offsetWidth,
        height: el.offsetHeight,
      });
    }
  }, [pathname]);

  // Desktop breakpoint
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 768);
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const setItemRef = useCallback(
    (id: string) => (node: HTMLLIElement | null) => {
      itemRefs.current[id] = node;
    },
    []
  );

  const handleItemClick = (label: string) => {
    const id = label.toLowerCase();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

    const el = itemRefs.current[id];
    if (el) {
      setPosition({
        top: el.offsetTop,
        left: el.offsetLeft,
        width: el.offsetWidth,
        height: el.offsetHeight,
      });
    }
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : "-100%" }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="sticky top-0 z-50 bg-black/80 backdrop-blur px-6 py-6"
    >
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-white">Joel Raju</div>

        {/* Hamburger (mobile only) */}
        <button
          className="relative grid h-10 w-10 place-items-center md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`mt-1 block h-0.5 w-6 bg-white transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`mt-1 block h-0.5 w-6 bg-white transition-transform duration-300 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex">
          <ul className="relative flex gap-6">
            {menuItems.map((label, i) => {
              const key = label.toLowerCase();
              const isActive =
                (pathname === "/" && key === "home") ||
                pathname.slice(1) === key;

              return (
                <motion.li
                  key={key}
                  ref={setItemRef(key)}
                  onClick={() => handleItemClick(label)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className={`relative cursor-pointer px-6 py-3 ${
                    isActive
                      ? "font-semibold text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {label}
                </motion.li>
              );
            })}

            {isDesktop &&
              ["tl", "tr", "bl", "br"].map((corner) => {
                const ox = corner.includes("r") ? position.width - 12 : 0;
                const oy = corner.includes("b") ? position.height - 12 : 0;
                const cls = {
                  tl: "border-t-2 border-l-2",
                  tr: "border-t-2 border-r-2",
                  bl: "border-b-2 border-l-2",
                  br: "border-b-2 border-r-2",
                }[corner];
                return (
                  <motion.span
                    key={corner}
                    className={`pointer-events-none absolute h-3 w-3 border-white ${cls}`}
                    initial={{ opacity: 0 }}
                    animate={{
                      left: position.left + ox,
                      top: position.top + oy,
                      opacity: 1,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                );
              })}
          </ul>
        </nav>
      </div>

      {/* Mobile overlay + menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Click-away overlay */}
            <motion.div
              key="overlay"
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              key="drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-x-0 top-full z-50 bg-black/95 shadow-md md:hidden"
            >
              <ul className="flex flex-col items-center gap-4 py-6 text-xl text-white">
                {menuItems.map((label) => {
                  const key = label.toLowerCase();
                  const isActive =
                    (pathname === "/" && key === "home") ||
                    pathname.slice(1) === key;
                  return (
                    <li
                      key={key}
                      className={`cursor-pointer px-6 py-2 ${
                        isActive ? "font-semibold" : "opacity-90"
                      }`}
                      onClick={() => handleItemClick(label)}
                    >
                      {label}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
