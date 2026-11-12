import React from "react";
import type { ServiceCategory } from "@/data/mockServices";

/**
 * Flat pictograms for the five advice categories.
 * Drawn as simple printed shapes (like a seed packet or feed sack) so they are
 * recognisable at a glance and weigh almost nothing.
 */

const INK = "#12261b";
const MUSTARD = "#f4c430";
const POND = "#bee3da";

interface PictogramProps {
  className?: string;
}

function Paddy({ className }: PictogramProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round">
        <path d="M22 58C23 42 29 28 44 16" />
        <path d="M22 58C18 48 12 42 8 40" />
      </g>
      <g fill={MUSTARD}>
        <ellipse cx="46" cy="13" rx="3.2" ry="6" transform="rotate(48 46 13)" />
        <ellipse cx="38.5" cy="15" rx="3.2" ry="6" transform="rotate(-8 38.5 15)" />
        <ellipse cx="45.5" cy="23" rx="3.2" ry="6" transform="rotate(78 45.5 23)" />
        <ellipse cx="32" cy="22.5" rx="3.2" ry="6" transform="rotate(-18 32 22.5)" />
        <ellipse cx="39.5" cy="31" rx="3.2" ry="6" transform="rotate(70 39.5 31)" />
        <ellipse cx="26.5" cy="31" rx="3.2" ry="6" transform="rotate(-22 26.5 31)" />
        <ellipse cx="34" cy="40" rx="3.2" ry="6" transform="rotate(64 34 40)" />
      </g>
    </svg>
  );
}

function Cow({ className }: PictogramProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <g fill={INK}>
        <path d="M19 17C14 15 11 10 12 5C16 7 21 10 24 15Z" />
        <path d="M45 17C50 15 53 10 52 5C48 7 43 10 40 15Z" />
        <ellipse cx="11" cy="27" rx="8" ry="4.6" transform="rotate(18 11 27)" />
        <ellipse cx="53" cy="27" rx="8" ry="4.6" transform="rotate(-18 53 27)" />
        <path d="M32 13C43 13 48 21 47 31C46.4 37 45 42 44 47L20 47C19 42 17.6 37 17 31C16 21 21 13 32 13Z" />
      </g>
      <ellipse cx="32" cy="48" rx="13.5" ry="9.5" fill="#ffffff" stroke={INK} strokeWidth="2.4" />
      <g fill={INK}>
        <ellipse cx="27" cy="48.5" rx="1.9" ry="2.6" />
        <ellipse cx="37" cy="48.5" rx="1.9" ry="2.6" />
      </g>
      <g fill="#ffffff">
        <circle cx="25" cy="30" r="2.4" />
        <circle cx="39" cy="30" r="2.4" />
      </g>
    </svg>
  );
}

function Hen({ className }: PictogramProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <g fill={INK}>
        <path d="M10 20C12 30 14 36 20 40L26 30C20 28 14 25 10 20Z" />
        <path d="M14 38C14 50 22 54 31 54C42 54 49 47 50 36L50 24C50 19 46 16 42 16C37.5 16 35 20 35 25C35 30 32 33 27 33C21 33 16 34 14 38Z" />
        <rect x="25" y="53" width="2.6" height="8" rx="1.3" />
        <rect x="33" y="53" width="2.6" height="8" rx="1.3" />
        <rect x="22" y="59.5" width="8" height="2.6" rx="1.3" />
        <rect x="30" y="59.5" width="8" height="2.6" rx="1.3" />
      </g>
      <g fill="#c8371f">
        <circle cx="39" cy="14" r="3" />
        <circle cx="43.5" cy="12.5" r="3.2" />
        <circle cx="47.5" cy="15" r="2.8" />
        <ellipse cx="49" cy="31" rx="2.2" ry="3.4" />
      </g>
      <path d="M50 22L58 25.5L50 28Z" fill="#ffffff" />
      <circle cx="44.5" cy="22.5" r="1.7" fill={MUSTARD} />
      <path d="M22 41C26 46 33 46 37 41" fill="none" stroke={MUSTARD} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function Fish({ className }: PictogramProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <g fill={INK}>
        <path d="M6 32C14 18 30 14 44 26L56 18C54 27 54 37 56 46L44 38C30 50 14 46 6 32Z" />
        <path d="M24 19.5C27 13 33 12 37 14L33 22Z" />
      </g>
      <circle cx="16" cy="30" r="2.3" fill="#ffffff" />
      <path d="M24 25C27 29 27 35 24 39" fill="none" stroke={POND} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function Paw({ className }: PictogramProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <g fill={INK}>
        <ellipse cx="15" cy="30" rx="5" ry="6.5" transform="rotate(-18 15 30)" />
        <ellipse cx="25.5" cy="19" rx="5" ry="7" />
        <ellipse cx="38.5" cy="19" rx="5" ry="7" />
        <ellipse cx="49" cy="30" rx="5" ry="6.5" transform="rotate(18 49 30)" />
        <path d="M32 30C40 30 47 38 47 45.5C47 51 43 53 39 52C36 51.2 34 51 32 51C30 51 28 51.2 25 52C21 53 17 51 17 45.5C17 38 24 30 32 30Z" />
      </g>
    </svg>
  );
}

const PICTOGRAMS: Record<ServiceCategory, (props: PictogramProps) => React.ReactElement> = {
  agri: Paddy,
  veterinary: Cow,
  poultry: Hen,
  fisheries: Fish,
  pet: Paw,
};

export function CategoryPictogram({
  category,
  className,
}: PictogramProps & { category: ServiceCategory }) {
  const Glyph = PICTOGRAMS[category];
  return <Glyph className={className} />;
}

/** The brand line: স্রোত means "current", so the mark is a single flowing stroke. */
export function StreamLine({ className }: PictogramProps) {
  return (
    <svg
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2 7C14 1 24 1 36 6S60 11 72 6S96 1 118 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
