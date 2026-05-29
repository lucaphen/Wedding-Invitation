"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Envelope from "@/components/Envelope";
import Letter from "@/components/Letter";
import MapModal from "@/components/MapModal";
import { wedding } from "@/lib/content";

type Stage = "front" | "back" | "open";

export default function Home() {
  const [stage, setStage] = useState<Stage>("front");
  const [cardFace, setCardFace] = useState<"front" | "back">("front");
  const [showMap, setShowMap] = useState(false);

  const isOpen = stage === "open";
  const flipped = stage !== "front";

  const flipEnvelope = () =>
    setStage((s) => (s === "front" ? "back" : s === "back" ? "front" : s));
  const open = () => setStage("open");
  const close = () => {
    setStage("back");
    setCardFace("front");
  };

  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 py-8">
      {/* soft floating petals */}
      <Petals />

      {/* names / overline — visible until the card is open */}
      <AnimatePresence>
        {!isOpen && (
          <motion.header
            key="title"
            className="z-10 mb-6 text-center"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs sm:text-sm uppercase tracking-[0.42em] text-wax-dark/80">
              {wedding.cover.overline}
            </p>
            <h1 className="font-script leading-[0.9] text-wax-dark text-[clamp(3.5rem,18vw,7rem)]">
              {wedding.bride}
              <span className="block text-[0.5em] -my-3">&amp;</span>
              {wedding.groom}
            </h1>
          </motion.header>
        )}
      </AnimatePresence>

      {/* stage: envelope + letter share a centered area */}
      <div className="relative z-10 grid w-full max-w-[480px] place-items-center">
        {/* the letter sits behind the envelope and rises out as it opens */}
        <motion.div
          className="absolute"
          style={{
            width: "min(86vw, 400px)",
            height: "min(calc(min(86vw, 400px) / 0.72), 70vh)",
            zIndex: 10,
          }}
          initial={false}
          animate={
            isOpen
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.7, y: 70 }
          }
          transition={{
            type: "spring",
            stiffness: 70,
            damping: 16,
            delay: isOpen ? 0.18 : 0,
          }}
        >
          <div
            className="h-full w-full"
            style={{ pointerEvents: isOpen ? "auto" : "none" }}
          >
            <Letter face={cardFace} onSeeMap={() => setShowMap(true)} />
          </div>
        </motion.div>

        {/* the envelope */}
        <motion.div
          style={{
            width: "min(86vw, 440px)",
            aspectRatio: "1.45",
            zIndex: 20,
            pointerEvents: isOpen ? "none" : "auto",
          }}
          initial={false}
          animate={
            isOpen
              ? { opacity: 0, scale: 0.85, y: 40 }
              : { opacity: 1, scale: 1, y: 0 }
          }
          transition={{ duration: 0.6, delay: isOpen ? 0.5 : 0 }}
        >
          <Envelope
            flipped={flipped}
            opened={isOpen}
            onFlip={flipEnvelope}
            onOpen={open}
          />
        </motion.div>
      </div>

      {/* hint to flip while on the front */}
      <AnimatePresence>
        {stage === "front" && (
          <motion.p
            key="flip-hint"
            className="z-10 mt-6 text-[0.7rem] uppercase tracking-[0.3em] text-wax-dark/70 animate-soft-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {wedding.cover.hintFlip}
          </motion.p>
        )}
      </AnimatePresence>

      {/* controls once the card is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="controls"
            className="fixed inset-x-0 bottom-0 z-40 flex flex-wrap items-center justify-center gap-3 bg-gradient-to-t from-[#f4efe4] via-[#f4efe4]/90 to-transparent px-4 pb-6 pt-12"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ delay: 0.6 }}
          >
            <button
              type="button"
              onClick={() =>
                setCardFace((f) => (f === "front" ? "back" : "front"))
              }
              className="rounded-full bg-burgundy px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-blush shadow-md transition hover:bg-burgundy-light focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40"
            >
              {wedding.controls.flipCard}
            </button>
            <button
              type="button"
              onClick={() => setShowMap(true)}
              className="rounded-full border border-burgundy/50 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-burgundy transition hover:bg-burgundy hover:text-blush focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40"
            >
              {wedding.controls.seeMap}
            </button>
            <button
              type="button"
              onClick={close}
              className="rounded-full border border-wax-dark/40 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-wax-dark/80 transition hover:bg-wax-dark/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-wax/40"
            >
              {wedding.controls.close}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <MapModal open={showMap} onClose={() => setShowMap(false)} />
    </main>
  );
}

/** A few softly floating petals for ambience. */
function Petals() {
  const petals = [
    { left: "8%", top: "12%", size: 130, delay: 0 },
    { left: "82%", top: "20%", size: 90, delay: 1.5 },
    { left: "70%", top: "78%", size: 150, delay: 0.8 },
    { left: "14%", top: "72%", size: 110, delay: 2.2 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full blur-2xl"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background:
              "radial-gradient(circle, rgba(216,203,176,0.35), rgba(216,203,176,0.08) 65%, transparent)",
          }}
          animate={{ y: [0, -16, 0], opacity: [0.35, 0.55, 0.35] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
