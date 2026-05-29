"use client";

import { motion } from "framer-motion";
import { wedding } from "@/lib/content";

type WaxSealProps = {
  onClick?: () => void;
  hint?: string;
  size?: number;
};

/**
 * A photorealistic old-British-style wax seal, drawn entirely in SVG:
 * turbulence-displaced organic edge, layered bronze gradient, specular
 * gloss, grain, a stamped bevel ring, and an embossed monogram.
 */
export default function WaxSeal({ onClick, hint, size = 124 }: WaxSealProps) {
  const { initials } = wedding;

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <motion.button
        type="button"
        aria-label="Abrir o convite"
        onClick={onClick}
        className="relative block cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-wax-light/70"
        style={{ width: size, height: size }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
      >
        <svg
          viewBox="0 0 120 120"
          width={size}
          height={size}
          aria-hidden
          style={{ display: "block", overflow: "visible" }}
        >
          <defs>
            {/* molten bronze wax */}
            <radialGradient id="waxBronze" cx="40%" cy="32%" r="78%">
              <stop offset="0%" stopColor="#e0b079" />
              <stop offset="26%" stopColor="#c08a4f" />
              <stop offset="58%" stopColor="#94572c" />
              <stop offset="84%" stopColor="#6c3c1c" />
              <stop offset="100%" stopColor="#42230f" />
            </radialGradient>

            {/* roughen the edge so it reads as poured wax, not a disc */}
            <filter id="waxRough" x="-25%" y="-25%" width="150%" height="150%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.028 0.034"
                numOctaves={2}
                seed={7}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={9}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>

            {/* fine matte grain confined to the wax body */}
            <filter id="waxGrain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves={2}
                seed={4}
                result="g"
              />
              <feColorMatrix
                in="g"
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0"
                result="ga"
              />
              <feComposite in="ga" in2="SourceAlpha" operator="in" />
            </filter>

            {/* soft contact shadow under the seal */}
            <filter id="waxShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="3.5"
                stdDeviation="4.5"
                floodColor="#2a1606"
                floodOpacity="0.5"
              />
            </filter>

            {/* top-left specular gloss */}
            <radialGradient id="waxGloss" cx="38%" cy="30%" r="42%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="55%" stopColor="#ffe9cf" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>

            {/* bevel for the embossed monogram */}
            <filter id="emboss" x="-20%" y="-20%" width="140%" height="140%">
              <feOffset in="SourceAlpha" dx="0.7" dy="1" result="d" />
              <feFlood floodColor="#1f0e03" floodOpacity="0.55" />
              <feComposite in2="d" operator="in" result="dark" />
              <feOffset in="SourceAlpha" dx="-0.7" dy="-1" result="u" />
              <feFlood floodColor="#f4d6ab" floodOpacity="0.5" />
              <feComposite in2="u" operator="in" result="light" />
              <feMerge>
                <feMergeNode in="light" />
                <feMergeNode in="dark" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#waxShadow)">
            {/* poured wax body */}
            <g filter="url(#waxRough)">
              <circle cx="60" cy="60" r="47" fill="url(#waxBronze)" />
              {/* darker pooled rim */}
              <circle
                cx="60"
                cy="60"
                r="47"
                fill="none"
                stroke="#3a1d0c"
                strokeOpacity="0.4"
                strokeWidth="5"
              />
            </g>

            {/* matte grain */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="#3a1f0c"
              opacity="0.16"
              filter="url(#waxGrain)"
            />

            {/* stamped bevel ring */}
            <circle
              cx="60"
              cy="60"
              r="37"
              fill="none"
              stroke="#2e1708"
              strokeOpacity="0.45"
              strokeWidth="2.2"
            />
            <circle
              cx="60"
              cy="59"
              r="37"
              fill="none"
              stroke="#eccfa4"
              strokeOpacity="0.3"
              strokeWidth="1"
            />

            {/* specular gloss */}
            <ellipse cx="49" cy="43" rx="31" ry="23" fill="url(#waxGloss)" />

            {/* embossed monogram */}
            <g filter="url(#emboss)">
              <text
                x="60"
                y="60"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#2c1505"
                style={{ fontFamily: "var(--font-script)" }}
              >
                <tspan fontSize="40">{initials.left}</tspan>
                <tspan fontSize="22" dy="-3">
                  &amp;
                </tspan>
                <tspan fontSize="40" dy="3">
                  {initials.right}
                </tspan>
              </text>
            </g>
          </g>
        </svg>
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
