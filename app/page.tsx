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
    <main className="relative flex min-h-[100dvh] flex-col items-center">
      {/* soft floating petals */}
      <Petals />

      {/* ---- hero: envelope + card, centered in the first screen ---- */}
      <section className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 py-8">
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
      <div className="relative z-10 grid w-full max-w-[620px] place-items-center">
        {/* the letter sits behind the envelope and rises out as it opens.
            Mobile: a taller, near-full-width portrait card with larger text.
            Desktop (md+): a wider landscape card with bigger margins reclaimed. */}
        <motion.div
          className="absolute z-10 w-[92vw] aspect-[2/3] md:w-[min(92vw,860px)] md:aspect-[1060/730]"
          initial={false}
          animate={
            isOpen
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.7, y: 70 }
          }
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <div
            className="h-full w-full"
            style={{ pointerEvents: isOpen ? "auto" : "none" }}
          >
            <Letter face={cardFace} />
          </div>
        </motion.div>

        {/* the envelope */}
        <motion.div
          style={{
            width: "min(88vw, 460px)",
            aspectRatio: `${wedding.envelope.aspect}`,
            zIndex: 20,
            pointerEvents: isOpen ? "none" : "auto",
          }}
          initial={false}
          animate={
            isOpen
              ? { opacity: 0, scale: 0.86, y: 46 }
              : { opacity: 1, scale: 1, y: 0 }
          }
          transition={{ duration: 0.25 }}
        >
          <Envelope
            flipped={flipped}
            opened={isOpen}
            onFlip={flipEnvelope}
            onOpen={open}
          />
        </motion.div>
      </div>

      {/* hint to flip while on the front — height reserved so toggling it
          doesn't reflow the vertically-centered column (which would nudge
          the title as the envelope flips) */}
      <div className="z-10 mt-6 flex min-h-[1.25rem] items-center justify-center">
        <AnimatePresence>
          {stage === "front" && (
            <motion.p
              key="flip-hint"
              className="text-[0.7rem] uppercase tracking-[0.3em] text-wax-dark/70 animate-soft-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {wedding.cover.hintFlip}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      </section>

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
              className="inline-flex items-center gap-2 rounded-full border border-burgundy/50 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-burgundy transition hover:bg-burgundy hover:text-blush focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40"
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
                <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
                <path d="M15 5.764v15" />
                <path d="M9 3.236v15" />
              </svg>
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
