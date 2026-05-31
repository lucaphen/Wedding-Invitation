"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { wedding } from "@/lib/content";
import { withBasePath } from "@/lib/basePath";

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
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl bg-burgundy text-blush shadow-2xl"
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
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-burgundy/80 text-blush backdrop-blur transition hover:bg-blush hover:text-burgundy focus:outline-none focus-visible:ring-2 focus-visible:ring-blush"
            >
              &#10005;
            </button>

            {/* the map image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBasePath(map.image)}
              alt={map.caption}
              className="block h-auto w-full"
              draggable={false}
            />

            <div className="flex justify-center px-6 pb-6 pt-4">
              <a
                href={map.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-blush px-5 py-3 text-xs uppercase tracking-[0.2em] text-burgundy transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blush focus-visible:ring-offset-2 focus-visible:ring-offset-burgundy"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
