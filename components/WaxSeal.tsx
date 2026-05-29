"use client";

import { motion } from "framer-motion";
import { wedding } from "@/lib/content";

type WaxSealProps = {
  onClick?: () => void;
  hint?: string;
  size?: number;
};

/**
 * An old-British-style wax seal: an organic bronze blob with embossed
 * monogram initials. Clicking it opens the envelope.
 */
export default function WaxSeal({ onClick, hint, size = 116 }: WaxSealProps) {
  const { initials } = wedding;

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <motion.button
        type="button"
        aria-label="Abrir o convite"
        onClick={onClick}
        className="relative grid place-items-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-wax-light/70 rounded-full"
        style={{ width: size, height: size }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
      >
        {/* Wax blob */}
        <span
          aria-hidden
          className="absolute inset-0"
          style={{
            borderRadius: "47% 53% 70% 30% / 60% 42% 58% 40%",
            background:
              "radial-gradient(circle at 34% 30%, #C58A53 0%, #A9713F 30%, #8A4B26 62%, #5E3015 100%)",
            boxShadow:
              "inset 0 4px 10px rgba(255,255,255,0.35), inset 0 -8px 16px rgba(0,0,0,0.45), 0 10px 22px rgba(0,0,0,0.35)",
          }}
        />
        {/* Inner stamped ring */}
        <span
          aria-hidden
          className="absolute"
          style={{
            inset: size * 0.13,
            borderRadius: "50% 50% 60% 40% / 55% 45% 55% 45%",
            boxShadow:
              "inset 0 2px 5px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(255,255,255,0.18)",
            border: "1px solid rgba(0,0,0,0.18)",
          }}
        />
        {/* Embossed monogram */}
        <span
          aria-hidden
          className="relative font-script leading-none"
          style={{
            fontSize: size * 0.42,
            color: "#3a1d0c",
            textShadow:
              "0 1px 0 rgba(255,255,255,0.28), 0 -1px 1px rgba(0,0,0,0.45)",
          }}
        >
          {initials.left}
          <span style={{ fontSize: size * 0.24, margin: "0 -0.04em" }}>&amp;</span>
          {initials.right}
        </span>
      </motion.button>

      {hint && (
        <motion.span
          className="text-[0.62rem] sm:text-xs tracking-[0.32em] uppercase text-wax-dark/80 animate-soft-pulse"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {hint}
        </motion.span>
      )}
    </div>
  );
}
