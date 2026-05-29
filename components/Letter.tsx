"use client";

import { motion } from "framer-motion";
import { wedding } from "@/lib/content";

type LetterProps = {
  face: "front" | "back";
  onSeeMap: () => void;
};

/** A small decorative flourish / divider. */
function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 text-blush/70">
      <span className="h-px w-10 bg-blush/40" />
      <span className="text-base leading-none">&#10070;</span>
      <span className="h-px w-10 bg-blush/40" />
    </div>
  );
}

export default function Letter({ face, onSeeMap }: LetterProps) {
  const { invite, details } = wedding;

  return (
    <div className="perspective-2000 h-full w-full">
      <motion.div
        className="preserve-3d relative h-full w-full"
        animate={{ rotateY: face === "back" ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 16 }}
      >
        {/* ---------------- FRONT: the invitation ---------------- */}
        <article
          className="backface-hidden texture-paper absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-y-auto rounded-[10px] bg-burgundy px-7 py-9 text-center text-blush"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(255,235,255,0.18), inset 0 0 60px rgba(0,0,0,0.25)",
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-3 rounded-[7px] border border-blush/25"
          />
          <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-blush/80">
            {invite.overline}
          </p>

          <h1 className="font-script leading-[0.95] text-[clamp(3rem,15vw,5.5rem)]">
            {wedding.bride}
            <span className="block text-[0.62em] -my-2 text-blush/90">&amp;</span>
            {wedding.groom}
          </h1>

          <p className="max-w-[24ch] text-base sm:text-lg text-blush/90">
            {invite.intro}
          </p>

          <Divider />

          <p className="text-sm uppercase tracking-[0.3em] text-blush/80">
            {wedding.dayOfWeek} · {wedding.dateLong}
          </p>

          <div className="mt-1 flex flex-col gap-3 text-blush/95">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-blush/65">
                {invite.ceremony.label}
              </p>
              <p className="text-lg sm:text-xl">{invite.ceremony.venue}</p>
              <p className="text-sm text-blush/80">{invite.ceremony.time}</p>
            </div>
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-blush/65">
                {invite.reception.label}
              </p>
              <p className="text-lg sm:text-xl">{invite.reception.venue}</p>
              <p className="text-sm text-blush/80">{invite.reception.time}</p>
            </div>
          </div>

          <Divider />

          <p className="max-w-[28ch] text-sm italic text-blush/85">
            {invite.closing}
          </p>
        </article>

        {/* ---------------- BACK: more details ---------------- */}
        <article
          className="backface-hidden texture-paper absolute inset-0 flex flex-col justify-center gap-6 overflow-y-auto rounded-[10px] bg-burgundy px-8 py-9 text-blush"
          style={{
            transform: "rotateY(180deg)",
            boxShadow:
              "inset 0 0 0 1px rgba(255,235,255,0.18), inset 0 0 60px rgba(0,0,0,0.25)",
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-3 rounded-[7px] border border-blush/25"
          />

          <h2 className="text-center font-script text-[clamp(2.6rem,11vw,4rem)] leading-none">
            {details.title}
          </h2>

          <section className="space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-blush/80">
              {details.rsvp.label}
            </p>
            <p className="text-sm leading-relaxed text-blush/90">
              {details.rsvp.text}
            </p>
            <ul className="space-y-0.5 text-base">
              {details.rsvp.contacts.map((c) => (
                <li key={c.name}>
                  {c.name} —{" "}
                  <a
                    href={`tel:+351${c.phone.replace(/\s/g, "")}`}
                    className="underline decoration-blush/40 underline-offset-4 hover:decoration-blush"
                  >
                    {c.phone}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-blush/80">
              {details.site.label}
            </p>
            <p className="text-sm leading-relaxed text-blush/90">
              {details.site.text}
            </p>
            <button
              type="button"
              onClick={onSeeMap}
              className="inline-flex items-center gap-2 rounded-full border border-blush/60 px-5 py-2 text-sm uppercase tracking-[0.2em] text-blush transition hover:bg-blush hover:text-burgundy focus:outline-none focus-visible:ring-2 focus-visible:ring-blush"
            >
              <span aria-hidden>&#9906;</span>
              {wedding.controls.seeMap}
            </button>
          </section>
        </article>
      </motion.div>
    </div>
  );
}
