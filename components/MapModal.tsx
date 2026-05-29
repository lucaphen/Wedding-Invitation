"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { wedding } from "@/lib/content";

type MapModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function MapModal({ open, onClose }: MapModalProps) {
  const { map, controls } = wedding;

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-burgundy text-blush shadow-2xl"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <div className="flex items-center justify-between px-6 pt-5">
              <h3 className="font-script text-3xl leading-none">{map.title}</h3>
              <button
                type="button"
                onClick={onClose}
                aria-label={controls.close}
                className="grid h-9 w-9 place-items-center rounded-full border border-blush/40 text-blush transition hover:bg-blush hover:text-burgundy focus:outline-none focus-visible:ring-2 focus-visible:ring-blush"
              >
                &#10005;
              </button>
            </div>

            <p className="px-6 pt-1 text-sm text-blush/85">{map.caption}</p>

            {/* stylized map image (swap /public/map-placeholder.svg later) */}
            <div className="mx-6 my-4 overflow-hidden rounded-xl border border-blush/25 bg-burgundy-dark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={map.image}
                alt={map.caption}
                className="h-auto w-full object-contain"
              />
            </div>

            <div className="px-6 pb-6">
              <a
                href={map.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-blush px-5 py-3 text-sm uppercase tracking-[0.2em] text-burgundy transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blush focus-visible:ring-offset-2 focus-visible:ring-offset-burgundy"
              >
                <span aria-hidden>&#128205;</span>
                {map.googleMapsLabel}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
