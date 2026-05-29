"use client";

import { motion } from "framer-motion";
import WaxSeal from "./WaxSeal";
import { wedding } from "@/lib/content";

type EnvelopeProps = {
  flipped: boolean;
  opened: boolean;
  onFlip: () => void;
  onOpen: () => void;
};

const linenBody =
  "linear-gradient(135deg, #E7DDC6 0%, #D8CBB0 45%, #C9BB9C 100%)";

/**
 * A beige linen envelope that flips between its monogram front and its
 * wax-sealed flap back, and whose top flap lifts open.
 */
export default function Envelope({
  flipped,
  opened,
  onFlip,
  onOpen,
}: EnvelopeProps) {
  const { initials } = wedding;

  return (
    <div
      className="perspective-1200 h-full w-full"
      style={{
        filter:
          "drop-shadow(0 26px 30px rgba(70,52,30,0.35)) drop-shadow(0 6px 10px rgba(70,52,30,0.25))",
      }}
    >
      <motion.div
        className="preserve-3d relative h-full w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
      >
        {/* ---------- FRONT FACE: monogram ---------- */}
        <button
          type="button"
          aria-label="Virar o envelope"
          onClick={onFlip}
          className="backface-hidden texture-linen absolute inset-0 grid place-items-center overflow-hidden rounded-[6px] cursor-pointer focus:outline-none"
          style={{ background: linenBody }}
        >
          {/* woven-linen grain */}
          <span
            aria-hidden
            className="texture-noise pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
          />
          {/* edge vignette for paper depth */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow:
                "inset 0 0 36px rgba(120,98,66,0.32), inset 0 2px 2px rgba(255,255,255,0.45)",
            }}
          />
          {/* embossed inner frame */}
          <span
            aria-hidden
            className="absolute inset-[7%] rounded-[4px]"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.4), inset 0 0 0 2px rgba(120,98,66,0.25)",
            }}
          />
          <span className="font-script text-wax-dark/85 leading-none text-[clamp(3rem,16vw,7rem)] flex items-baseline gap-1">
            {initials.left}
            <span className="text-[0.5em] translate-y-[-0.15em]">&amp;</span>
            {initials.right}
          </span>
        </button>

        {/* ---------- BACK FACE: flaps + wax seal ---------- */}
        <div
          className="backface-hidden absolute inset-0 rounded-[6px] overflow-hidden"
          style={{ transform: "rotateY(180deg)", background: linenBody }}
        >
          {/* clickable backdrop to flip back to front (behind the flaps) */}
          <button
            type="button"
            aria-label="Virar o envelope"
            onClick={onFlip}
            className="absolute inset-0 z-0 cursor-pointer focus:outline-none"
            tabIndex={-1}
          />

          {/* left pocket triangle */}
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: "polygon(0% 0%, 50% 50%, 0% 100%)",
              background:
                "linear-gradient(90deg, #CFC1A2 0%, #DCD0B6 100%)",
            }}
          />
          {/* right pocket triangle */}
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: "polygon(100% 0%, 50% 50%, 100% 100%)",
              background:
                "linear-gradient(270deg, #CFC1A2 0%, #DCD0B6 100%)",
            }}
          />
          {/* bottom pocket triangle (front of the pocket) */}
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: "polygon(0% 100%, 50% 46%, 100% 100%)",
              background:
                "linear-gradient(0deg, #C6B894 0%, #D6C9AB 100%)",
              boxShadow: "inset 0 0 24px rgba(120,98,66,0.18)",
            }}
          />
          {/* soft shadow cast where the flap overlaps the pocket */}
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 50% 60%)",
              background:
                "linear-gradient(180deg, transparent 60%, rgba(90,70,44,0.28) 100%)",
            }}
          />
          {/* woven-linen grain over the whole back */}
          <span
            aria-hidden
            className="texture-noise pointer-events-none absolute inset-0 z-10 opacity-[0.12] mix-blend-multiply"
          />
          {/* edge vignette */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              boxShadow:
                "inset 0 0 40px rgba(120,98,66,0.34), inset 0 2px 2px rgba(255,255,255,0.4)",
            }}
          />

          {/* top flap — lifts open */}
          <motion.div
            className="preserve-3d absolute inset-0 z-20 pointer-events-none"
            style={{ transformOrigin: "top center" }}
            animate={{ rotateX: opened ? -172 : 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            {/* visible triangular flap */}
            <span
              aria-hidden
              className="backface-hidden absolute inset-0"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 50% 56%)",
                background:
                  "linear-gradient(168deg, #EADFC6 0%, #DCCEAE 55%, #CDBE9C 100%)",
                boxShadow: "inset 0 -12px 22px rgba(120,98,66,0.28)",
              }}
            />
            {/* grain on the flap */}
            <span
              aria-hidden
              className="texture-noise backface-hidden absolute inset-0 opacity-[0.12] mix-blend-multiply"
              style={{ clipPath: "polygon(0% 0%, 100% 0%, 50% 56%)" }}
            />
            {/* subtle highlight along the folded edges */}
            <span
              aria-hidden
              className="backface-hidden absolute inset-0"
              style={{
                clipPath:
                  "polygon(0% 0%, 1.5% 0.6%, 50% 53%, 98.5% 0.6%, 100% 0%, 50% 56%)",
                background: "rgba(255,255,255,0.35)",
              }}
            />
            {/* back side of the flap, seen once it is lifted */}
            <span
              aria-hidden
              className="backface-hidden absolute inset-0"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 50% 56%)",
                background:
                  "linear-gradient(0deg, #C6B894 0%, #D8CBB0 100%)",
                transform: "rotateX(180deg)",
              }}
            />

            {/* wax seal at the flap tip — travels with the flap */}
            <div className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto">
              <WaxSeal
                onClick={onOpen}
                size={108}
                hint={opened ? undefined : wedding.cover.hintOpen}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
