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

const cardShell =
  "backface-hidden texture-paper absolute inset-0 flex overflow-y-auto rounded-[10px] bg-burgundy text-blush";
const cardShadow =
  "inset 0 0 0 1px rgba(255,235,255,0.18), inset 0 0 60px rgba(0,0,0,0.25)";

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
        <article className={`${cardShell} px-7 py-8`} style={{ boxShadow: cardShadow }}>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-3 rounded-[7px] border border-blush/25"
          />
          <div className="m-auto flex w-full flex-col items-center gap-3.5 text-center">
            <p className="text-[0.7rem] sm:text-sm uppercase tracking-[0.28em] text-blush/80">
              {invite.overline}
            </p>

            <h1 className="font-script leading-[0.95] text-[clamp(2.8rem,13vw,4.8rem)]">
              {wedding.bride}
              <span className="block text-[0.6em] -my-2 text-blush/90">&amp;</span>
              {wedding.groom}
            </h1>

            <p className="max-w-[24ch] text-base text-blush/90">{invite.intro}</p>

            <Divider />

            <p className="text-xs uppercase tracking-[0.28em] text-blush/80">
              {wedding.dayOfWeek} · {wedding.dateLong}
            </p>

            <div className="flex flex-col gap-3 text-blush/95">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.3em] text-blush/65">
                  {invite.ceremony.label}
                </p>
                <p className="text-lg">{invite.ceremony.venue}</p>
                <p className="text-sm text-blush/80">{invite.ceremony.time}</p>
              </div>
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.3em] text-blush/65">
                  {invite.reception.label}
                </p>
                <p className="text-lg">{invite.reception.venue}</p>
                <p className="text-sm text-blush/80">{invite.reception.time}</p>
              </div>
            </div>

            <Divider />

            <p className="max-w-[28ch] text-sm italic text-blush/85">
              {invite.closing}
            </p>
          </div>
        </article>

        {/* ---------------- BACK: more details ---------------- */}
        <article
          className={`${cardShell} px-8 py-8`}
          style={{ transform: "rotateY(180deg)", boxShadow: cardShadow }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-3 rounded-[7px] border border-blush/25"
          />
          <div className="m-auto flex w-full flex-col gap-6">
            <h2 className="text-center font-script text-[clamp(2.4rem,10vw,3.6rem)] leading-none">
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
          </div>
        </article>
      </motion.div>
    </div>
  );
}
