"use client";

import { withBasePath } from "@/lib/basePath";
import { wedding } from "@/lib/content";
import { motion } from "framer-motion";

type LetterProps = {
  face: "front" | "back";
};

const cardShell =
  "backface-hidden texture-paper absolute inset-0 overflow-hidden rounded-[10px] bg-burgundy text-blush [container-type:inline-size]";
const cardShadow =
  "inset 0 0 0 1px rgba(243,234,216,0.18), inset 0 0 60px rgba(0,0,0,0.28)";

export default function Letter({ face }: LetterProps) {
  const { invite, details } = wedding;
  const { rsvp, site } = details;
  const telHref = (phone: string) => `tel:+351${phone.replace(/\s/g, "")}`;

  return (
    <div className="perspective-2000 h-full w-full">
      <motion.div
        className="preserve-3d relative h-full w-full"
        animate={{ rotateY: face === "back" ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 16 }}
      >
        {/* ---------------- FRONT: the invitation ---------------- */}
        <article
          className={`${cardShell} flex items-center justify-center px-[7%] py-[6%]`}
          style={{ boxShadow: cardShadow }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-3 rounded-[7px] border border-blush/25"
          />
          <div className="flex h-full w-full flex-col items-center justify-between py-[2%] text-center">
            {/* intertwined monogram */}
            <div className="flex items-center justify-center font-script font-light leading-none text-[clamp(2rem,10cqw,4rem)] text-blush">
              <span>{wedding.initials.left}</span>
              <span
                className="-ml-[0.32em]"
                style={{ transform: "translate(-13px, 20px)" }}
              >
                {wedding.initials.right}
              </span>
            </div>

            <p className="max-w-[80ch] text-[clamp(0.6rem,2.3cqw,0.95rem)] leading-relaxed text-blush/90">
              {invite.intro}
            </p>

            {/* names + date kept together */}
            <div className="flex flex-col items-center gap-[2%]">
              <h1 className="font-script font-light leading-[0.95] text-[clamp(1.9rem,9.5cqw,3.8rem)]">
                {wedding.bride}
                <span className="mx-[0.18em] text-[0.62em]">e</span>
                {wedding.groom}
              </h1>
              <p className="text-[clamp(0.74rem,2.7cqw,1.1rem)] font-semibold uppercase tracking-[0.18em] text-blush">
                {wedding.dateLong}
              </p>
            </div>

            <p className="max-w-[60ch] text-[clamp(0.62rem,2.4cqw,0.98rem)] leading-relaxed text-blush/90">
              {invite.ceremony.pre}
              <strong className="font-semibold text-blush">
                {invite.ceremony.highlight}
              </strong>
              {invite.ceremony.post}
            </p>

            {/* RSVP deadline note */}
            <div className=" text-[clamp(0.56rem,2.1cqw,0.88rem)] italic leading-relaxed text-blush/80">
              <p>
                {invite.rsvp.pre}
                <strong className="font-semibold not-italic text-blush">
                  {invite.rsvp.highlight}
                </strong>
              </p>
              <p>{invite.note}</p>
            </div>
          </div>
        </article>

        {/* ---------------- BACK: Mais detalhes (recreates the card) ------- */}
        <article
          className={`${cardShell} px-[7%] py-[6%]`}
          style={{ transform: "rotateY(180deg)", boxShadow: cardShadow }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-3 rounded-[7px] border border-blush/20"
          />

          {/* script title, top-right */}
          <h2 className="text-right font-script leading-none text-[clamp(1.7rem,6.4cqw,3.2rem)] text-blush">
            {details.title}
          </h2>

          {/* RSVP */}
          <section className="mt-[3.2%]">
            <h3 className="text-[clamp(1rem,3.2cqw,1.6rem)] font-semibold uppercase tracking-[0.22em]">
              {rsvp.label}
            </h3>
            <p className="mt-[1.6%] max-w-[62%] text-[clamp(0.68rem,2.5cqw,1.05rem)] leading-snug text-blush/90">
              {rsvp.text}
            </p>
            <ul className="mt-[2.4%] space-y-0.5 text-[clamp(0.76rem,2.8cqw,1.2rem)] text-blush/95">
              {rsvp.contacts.map((c) => (
                <li key={c.name}>
                  {c.name} -{" "}
                  <a
                    href={telHref(c.phone)}
                    className="underline decoration-blush/40 underline-offset-4 transition hover:decoration-blush"
                  >
                    {c.phone}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* SITE */}
          <section className="mt-[3.2%]">
            <h3 className="text-[clamp(1rem,3.2cqw,1.6rem)] font-semibold uppercase tracking-[0.22em]">
              {site.label}
            </h3>
            <p className="mt-[1.6%] max-w-[58%] text-[clamp(0.68rem,2.5cqw,1.05rem)] leading-snug text-blush/90">
              {site.text}
            </p>
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[2.2%] inline-block max-w-[58%] break-all text-[clamp(0.64rem,2.35cqw,1rem)] text-blush/95 underline decoration-blush/40 underline-offset-4 transition hover:decoration-blush"
            >
              {site.url}
            </a>
          </section>

          {/* QR code (links to the site) — bottom-right, as on the card */}
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={site.url}
            className="absolute bottom-[7%] right-[7%] block w-[clamp(74px,21%,148px)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blush"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBasePath(site.qr)}
              alt="Código QR para o site do casamento"
              className="h-auto w-full"
              draggable={false}
            />
          </a>
        </article>
      </motion.div>
    </div>
  );
}
