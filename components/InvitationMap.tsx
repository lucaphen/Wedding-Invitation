"use client";

import { wedding } from "@/lib/content";

/**
 * Hand-drawn route map rendered entirely in SVG — a code recreation of the
 * printed card: cream line-art on a deep-wine field. Two illustrated venues
 * (the Quinta on the left, the Basílica on the right) joined by a labelled
 * road grid (R. Gen. Humberto da Silva Delgado · Estrada da Cunca · N115 ·
 * Aldeia Gavinha · N9).
 *
 * The drawing lives in a 1060×730 viewBox and scales to its container.
 */

const INK = "#f3ead8";

export default function InvitationMap({
  className = "",
}: {
  className?: string;
}) {
  const { map } = wedding;
  const { roads } = map;

  return (
    <svg
      viewBox="0 0 1060 730"
      className={className}
      role="img"
      aria-label={map.caption}
      fill="none"
      stroke={INK}
    >
      <rect width="1060" height="730" fill="#5d1e28" />

      {/* ---------------- title ---------------- */}
      <text
        x="58"
        y="104"
        fill={INK}
        stroke="none"
        fontFamily="var(--font-script), cursive"
        fontSize="78"
      >
        {map.title}
      </text>

      {/* ---------------- road grid ----------------
          A loose orthogonal network of roads that reaches the card edges,
          reading like a stylised street map. */}
      <g
        strokeWidth="2.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        opacity="0.92"
      >
        {/* top rail (begins just right of the title) */}
        <path d="M232 92 H1018" />
        {/* main verticals dropping from the top rail */}
        <path d="M430 92 V662" />
        <path d="M600 92 V470" />
        <path d="M795 92 V150" />
        <path d="M1018 92 V250" />

        {/* Quinta → first junction: along R. Gen. Humberto da Silva Delgado */}
        <path d="M200 300 H360 V406 H430" />

        {/* left frame down to the bottom rail */}
        <path d="M120 300 V662 H430" />

        {/* Aldeia Gavinha cross-road (N9) between N115 and the x=600 vertical */}
        <path d="M430 466 H600" />

        {/* stepped road from the x=600 vertical across to the Basílica side */}
        <path d="M600 432 H700 V486 H812 V604 H1018" />
        {/* right frame */}
        <path d="M1018 250 V604" />

        {/* short spur from the stepped road up toward the Basílica forecourt */}
        <path d="M812 486 H905" />
      </g>

      {/* ---------------- road labels ---------------- */}
      <g
        fill={INK}
        stroke="none"
        fontFamily="var(--font-serif), serif"
        fontSize="17"
        letterSpacing="0.5"
        fontWeight={500}
      >
        {/* R. Gen. Humberto da Silva Delgado (two lines, above the top road) */}
        <text x="232" y="262">
          {roads.humberto.replace(" DA SILVA DELGADO", "")}
        </text>
        <text x="232" y="282">DA SILVA DELGADO</text>

        {/* Estrada da Cunca — rotated down the vertical at x≈360 */}
        <text
          x="352"
          y="318"
          transform="rotate(90 352 318)"
          letterSpacing="1"
        >
          {roads.cunca}
        </text>

        {/* N115 — rotated down the main vertical */}
        <text
          x="422"
          y="420"
          transform="rotate(90 422 420)"
          fontSize="15"
        >
          {roads.n115}
        </text>

        {/* Aldeia Gavinha (two lines) */}
        <text x="446" y="448">{roads.gavinha.split(" ")[0]}</text>
        <text x="446" y="468">{roads.gavinha.split(" ")[1]}</text>

        {/* N9 markers along the network */}
        <text x="372" y="430" fontSize="15">{roads.n9}</text>
        <text x="540" y="488" fontSize="15">{roads.n9}</text>
        <text x="850" y="596" fontSize="15">{roads.n9}</text>
      </g>

      {/* ---------------- Quinta da Grilla (left venue) ---------------- */}
      <g
        transform="translate(40 232)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* ground line */}
        <path d="M2 96 H196" />
        {/* central pavilion: low dome on an arcaded body */}
        <path d="M64 96 V44 H134 V96" />
        <path d="M64 44 Q99 6 134 44" />
        <path d="M92 24 V12 M99 11 a2 2 0 1 0 0.1 0" />
        {/* arched openings across the central body */}
        <path d="M74 96 V60 Q82 50 90 60 V96" />
        <path d="M99 96 V60 Q107 50 115 60 V96" />
        {/* left wing */}
        <path d="M64 70 H20 V96" />
        <path d="M28 96 V74 H40 V96" />
        <path d="M48 96 V74 H58 V96" />
        {/* right wing */}
        <path d="M134 70 H178 V96" />
        <path d="M140 96 V74 H152 V96" />
        <path d="M160 96 V74 H172 V96" />
        {/* low front terrace steps */}
        <path d="M10 96 H188 M4 104 H194" />
      </g>

      {/* ---------------- Basílica de Santa Quitéria de Meca (right) ------- */}
      <g
        transform="translate(842 250)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* base line */}
        <path d="M0 168 H184" />

        {/* twin bell-towers */}
        <g>
          {/* left tower */}
          <path d="M14 168 V58 H52 V168" />
          <path d="M14 58 L33 30 L52 58" />
          <path d="M33 30 V16 M30 16 h6 M33 16 V8" />
          <path d="M24 80 h18 M24 104 h18" />
          <path d="M28 130 V168 M38 130 V168" />
          {/* right tower */}
          <path d="M132 168 V58 H170 V168" />
          <path d="M132 58 L151 30 L170 58" />
          <path d="M151 30 V16 M148 16 h6 M151 16 V8" />
          <path d="M142 80 h18 M142 104 h18" />
          <path d="M146 130 V168 M156 130 V168" />
        </g>

        {/* central body + pediment */}
        <path d="M52 168 V70 H132 V168" />
        <path d="M52 70 L92 40 L132 70" />
        {/* rose window */}
        <circle cx="92" cy="62" r="9" />
        {/* upper windows */}
        <path d="M70 96 V112 Q70 120 78 120 Q86 120 86 112 V96 Z" />
        <path d="M98 96 V112 Q98 120 106 120 Q114 120 114 112 V96 Z" />
        {/* great door */}
        <path d="M80 168 V124 Q92 110 104 124 V168" />
        {/* steps */}
        <path d="M44 168 H140 M36 176 H148" />
      </g>

      {/* ---------------- venue labels ---------------- */}
      <g
        fill={INK}
        stroke="none"
        fontFamily="var(--font-serif), serif"
        fontWeight={600}
        letterSpacing="2"
      >
        <text x="138" y="372" fontSize="22" textAnchor="middle">
          QUINTA DA
        </text>
        <text x="138" y="402" fontSize="22" textAnchor="middle">
          GRILLA
        </text>

        <text x="906" y="476" fontSize="22" textAnchor="middle">
          BASÍLICA DE SANTA
        </text>
        <text x="906" y="506" fontSize="22" textAnchor="middle">
          QUITÉRIA DE MECA
        </text>
      </g>
    </svg>
  );
}
