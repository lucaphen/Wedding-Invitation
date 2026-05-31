"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import WaxSeal from "./WaxSeal";
import { wedding } from "@/lib/content";
import { withBasePath } from "@/lib/basePath";

type EnvelopeProps = {
  flipped: boolean;
  opened: boolean;
  onFlip: () => void;
  onOpen: () => void;
};

// Ivory linen tones (matched to the reference photo)
const BASE = "#e9dfcd";
const BASE_DARK = "#d9cdb6";
const BASE_DEEP = "#cabd9f";

const { envelope } = wedding;

/**
 * Shared SVG filter/gradient definitions for the procedural (fallback)
 * envelope. The linen filter lights a turbulence bump map with diffuse +
 * specular distant lights, tinted by the base fill — so fibres catch light.
 */
function EnvelopeDefs() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        <filter id="linen" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.09 0.11"
            numOctaves={3}
            seed={6}
            stitchTiles="stitch"
            result="noise"
          />
          <feDiffuseLighting
            in="noise"
            surfaceScale="3.2"
            diffuseConstant="1.05"
            lightingColor="#f5ecd7"
            result="diffuse"
          >
            <feDistantLight azimuth="235" elevation="58" />
          </feDiffuseLighting>
          <feSpecularLighting
            in="noise"
            surfaceScale="3.2"
            specularConstant="0.45"
            specularExponent="16"
            lightingColor="#fffaf0"
            result="spec"
          >
            <feDistantLight azimuth="235" elevation="58" />
          </feSpecularLighting>
          <feComposite
            in="diffuse"
            in2="SourceGraphic"
            operator="arithmetic"
            k1="1"
            k2="0"
            k3="0"
            k4="0"
            result="lit"
          />
          <feComposite in="spec" in2="lit" operator="in" result="specClip" />
          <feComposite
            in="specClip"
            in2="lit"
            operator="arithmetic"
            k1="0"
            k2="0.7"
            k3="1"
            k4="0"
          />
        </filter>
        <filter id="flapShadow" x="-30%" y="-30%" width="160%" height="200%">
          <feDropShadow
            dx="0"
            dy="14"
            stdDeviation="16"
            floodColor="#4a3a22"
            floodOpacity="0.4"
          />
        </filter>
        <filter id="seamBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <radialGradient id="formLight" cx="42%" cy="34%" r="75%">
          <stop offset="0%" stopColor="#fffaf0" stopOpacity="0.5" />
          <stop offset="55%" stopColor="#fffaf0" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#fffaf0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vignette" cx="50%" cy="50%" r="62%">
          <stop offset="62%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#5a4427" stopOpacity="0.34" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function Envelope({
  flipped,
  opened,
  onFlip,
  onOpen,
}: EnvelopeProps) {
  const { initials } = wedding;
  const [photoFailed, setPhotoFailed] = useState(false);
  const [frontPhotoFailed, setFrontPhotoFailed] = useState(false);
  const usePhoto = Boolean(envelope.photo) && !photoFailed;
  const photoSrc = envelope.photo ? withBasePath(envelope.photo) : "";
  const useFrontPhoto = Boolean(envelope.frontPhoto) && !frontPhotoFailed;
  const frontPhotoSrc = envelope.frontPhoto
    ? withBasePath(envelope.frontPhoto)
    : "";

  return (
    <div
      className="perspective-1200 h-full w-full"
      style={{
        filter:
          "drop-shadow(0 30px 34px rgba(64,46,24,0.38)) drop-shadow(0 8px 12px rgba(64,46,24,0.26))",
      }}
    >
      <EnvelopeDefs />

      <motion.div
        className="preserve-3d relative h-full w-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
      >
        {/* ---------- FRONT FACE: ivory field + monogram ---------- */}
        <button
          type="button"
          aria-label="Virar o envelope"
          onClick={onFlip}
          className="backface-hidden absolute inset-0 grid place-items-center overflow-hidden rounded-[10px] cursor-pointer focus:outline-none"
        >
          {useFrontPhoto ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={frontPhotoSrc}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
              onError={() => setFrontPhotoFailed(true)}
            />
          ) : (
            <>
              <svg
                viewBox="0 0 1450 1000"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                <rect
                  width="1450"
                  height="1000"
                  fill={BASE}
                  filter="url(#linen)"
                />
                <rect width="1450" height="1000" fill="url(#formLight)" />
                <rect width="1450" height="1000" fill="url(#vignette)" />
                <rect
                  x="96"
                  y="86"
                  width="1258"
                  height="828"
                  rx="6"
                  fill="none"
                  stroke="#5a4427"
                  strokeOpacity="0.26"
                  strokeWidth="2"
                />
                <rect
                  x="93"
                  y="83"
                  width="1258"
                  height="828"
                  rx="6"
                  fill="none"
                  stroke="#fffaf0"
                  strokeOpacity="0.5"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="relative font-script text-[#6a4a26] leading-none text-[clamp(3rem,16vw,7rem)] flex items-baseline gap-1 drop-shadow-[0_1px_0_rgba(255,250,240,0.5)]">
                {initials.left}
                <span className="text-[0.5em] translate-y-[-0.15em]">&amp;</span>
                {initials.right}
              </span>
            </>
          )}
        </button>

        {/* ---------- BACK FACE: sealed side ---------- */}
        <div
          className="backface-hidden absolute inset-0 overflow-hidden rounded-[10px]"
          style={{ transform: "rotateY(180deg)" }}
        >
          {/* flip-back backdrop */}
          <button
            type="button"
            aria-label="Virar o envelope"
            onClick={onFlip}
            className="absolute inset-0 z-0 cursor-pointer focus:outline-none"
            tabIndex={-1}
          />

          {usePhoto ? (
            <PhotoBack
              src={photoSrc}
              onOpen={onOpen}
              onError={() => setPhotoFailed(true)}
            />
          ) : (
            <ProceduralBack opened={opened} onOpen={onOpen} />
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------- Photographic sealed side ---------------- */
function PhotoBack({
  src,
  onOpen,
  onError,
}: {
  src: string;
  onOpen: () => void;
  onError: () => void;
}) {
  const { seal } = envelope;
  return (
    <>
      {/* the sealed envelope as a single, seamless photo (no clip-path
          flap/pocket split — that left faint diagonal lines on the join) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Envelope"
        onError={onError}
        draggable={false}
        className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
      />

      {/* invisible click target over the wax seal */}
      <button
        type="button"
        aria-label="Abrir o convite"
        onClick={onOpen}
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-wax-light/70"
        style={{
          left: `${seal.x}%`,
          top: `${seal.y}%`,
          width: `${seal.size}%`,
          aspectRatio: "1",
        }}
      />
    </>
  );
}

/* ---------------- Procedural (fallback) sealed side ---------------- */
function ProceduralBack({
  opened,
  onOpen,
}: {
  opened: boolean;
  onOpen: () => void;
}) {
  return (
    <>
      <svg
        viewBox="0 0 1450 1000"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      >
        <rect width="1450" height="1000" fill={BASE_DARK} filter="url(#linen)" />
        <path d="M0 0 L725 500 L0 1000 Z" fill={BASE} filter="url(#linen)" />
        <path d="M1450 0 L725 500 L1450 1000 Z" fill={BASE} filter="url(#linen)" />
        <path d="M0 1000 L725 470 L1450 1000 Z" fill={BASE_DEEP} filter="url(#linen)" />
        <path d="M0 0 L725 500 L0 1000 Z" fill="#3a2c16" fillOpacity="0.06" />
        <path d="M1450 0 L725 500 L1450 1000 Z" fill="#000000" fillOpacity="0.05" />
        <path d="M0 1000 L725 470 L1450 1000 Z" fill="#3a2c16" fillOpacity="0.1" />
        <g
          filter="url(#seamBlur)"
          stroke="#4a3a22"
          strokeOpacity="0.3"
          strokeWidth="3"
          fill="none"
        >
          <path d="M0 0 L725 500" />
          <path d="M1450 0 L725 500" />
          <path d="M0 1000 L725 470" />
          <path d="M1450 1000 L725 470" />
        </g>
        <g stroke="#fffaf0" strokeOpacity="0.4" strokeWidth="1.2" fill="none">
          <path d="M0 1000 L725 470 L1450 1000" />
        </g>
        <rect width="1450" height="1000" fill="url(#vignette)" />
      </svg>

      <motion.div
        className="preserve-3d pointer-events-none absolute inset-0 z-20"
        style={{ transformOrigin: "top center" }}
        animate={{ rotateX: 0 }}
        transition={{ duration: 0 }}
      >
        <svg
          viewBox="0 0 1450 1000"
          preserveAspectRatio="none"
          className="backface-hidden absolute inset-0 h-full w-full"
          style={{ overflow: "visible" }}
        >
          <g filter="url(#flapShadow)">
            <path d="M0 0 L1450 0 L725 560 Z" fill={BASE} filter="url(#linen)" />
          </g>
          <path d="M0 0 L1450 0 L725 560 Z" fill="#fffaf0" fillOpacity="0.12" />
          <path d="M0 0 L725 560 L1450 0" fill="none" stroke="#fffaf0" strokeOpacity="0.5" strokeWidth="1.4" />
        </svg>

        <div className="pointer-events-auto absolute left-1/2 top-[50%] z-30 -translate-x-1/2 -translate-y-1/2">
          <WaxSeal
            onClick={onOpen}
            size={120}
            hint={opened ? undefined : wedding.cover.hintOpen}
          />
        </div>
      </motion.div>
    </>
  );
}
