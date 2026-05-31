"use client";

import { withBasePath } from "@/lib/basePath";
import { wedding } from "@/lib/content";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type MapModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function MapModal({ open, onClose }: MapModalProps) {
  const { map, controls } = wedding;

  // Close on Escape + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* backdrop */}
          <button
            type="button"
            aria-label={controls.close}
            onClick={onClose}
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
          />

          {/* dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={map.title}
            className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl bg-[#732030] text-blush shadow-2xl"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            {/* close button, floating over the map */}
            <button
              type="button"
              onClick={onClose}
              aria-label={controls.close}
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-[#732030]/80 text-blush backdrop-blur transition hover:bg-blush hover:text-[#732030] focus:outline-none focus-visible:ring-2 focus-visible:ring-blush"
            >
              &#10005;
            </button>

            {/* the map image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBasePath(map.image)}
              alt={map.caption}
              className="mx-auto block h-auto w-full max-h-[78dvh] object-contain"
              draggable={false}
            />

            <div className="flex justify-center px-6 pb-5 pt-3">
              <a
                href={map.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-blush px-3.5 py-1.5 text-[0.62rem] uppercase tracking-[0.18em] text-[#732030] transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blush focus-visible:ring-offset-2 focus-visible:ring-offset-[#732030]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {map.googleMapsLabel}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
