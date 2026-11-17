/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Heart, RotateCcw, X } from 'lucide-react';

const MOBILE_IMAGE_PATH = '/src/assets/images/assia_mobile_roses_portrait_1794950189141.jpg';
const DESKTOP_IMAGE_PATH = '/src/assets/images/assia_pink_red_roses_1794950044166.jpg';
const NAME_LETTERS = ['A', 's', 's', 'i', 'a'];

interface FlyingHeart {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  rotate: number;
  color: string;
  stroke?: string;
}

const FLYING_HEARTS: FlyingHeart[] = [
  { id: 1, left: '8%', size: 18, duration: 9.5, delay: 0, sway: 20, rotate: -14, color: '#E11D48' },
  { id: 2, left: '16%', size: 14, duration: 11.5, delay: 1.8, sway: -16, rotate: 16, color: '#F472B6' },
  { id: 3, left: '24%', size: 22, duration: 10.5, delay: 3.1, sway: 22, rotate: -10, color: '#FFFFFF', stroke: '#FDA4AF' },
  { id: 4, left: '34%', size: 15, duration: 12.2, delay: 0.7, sway: -20, rotate: 18, color: '#FB7185' },
  { id: 5, left: '45%', size: 20, duration: 9.8, delay: 4.2, sway: 18, rotate: -16, color: '#E11D48' },
  { id: 6, left: '56%', size: 14, duration: 11.0, delay: 2.5, sway: -15, rotate: 12, color: '#FFFFFF', stroke: '#F43F5E' },
  { id: 7, left: '66%', size: 23, duration: 10.2, delay: 1.1, sway: 20, rotate: -12, color: '#F472B6' },
  { id: 8, left: '75%', size: 16, duration: 12.6, delay: 3.7, sway: -18, rotate: 20, color: '#E11D48' },
  { id: 9, left: '84%', size: 19, duration: 9.4, delay: 0.4, sway: 16, rotate: -15, color: '#FDA4AF' },
  { id: 10, left: '91%', size: 15, duration: 11.8, delay: 2.9, sway: -18, rotate: 14, color: '#FFFFFF', stroke: '#FB7185' },
];

const POP_BURST_HEARTS = [
  { id: 1, x: -110, y: -120, size: 18, color: '#E11D48', delay: 0.02 },
  { id: 2, x: 115, y: -105, size: 16, color: '#F472B6', delay: 0.06 },
  { id: 3, x: -85, y: -60, size: 15, color: '#FFFFFF', stroke: '#F43F5E', delay: 0.04 },
  { id: 4, x: 95, y: -55, size: 20, color: '#FB7185', delay: 0.08 },
  { id: 5, x: 0, y: -145, size: 17, color: '#E11D48', delay: 0.05 },
];

function HeartSvg({
  size,
  color,
  stroke,
}: {
  size: number;
  color: string;
  stroke?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke={stroke ?? 'none'}
      strokeWidth={stroke ? 1.5 : 0}
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [revealKey, setRevealKey] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const handleReplay = () => {
    setIsMessageOpen(false);
    setRevealKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (!isMessageOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMessageOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMessageOpen]);

  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-[#FFF7F9] text-[#4A1525] flex flex-col justify-between">
      {/* Responsive Single-Image Floral Backdrop (9:16 Portrait on Mobile, 16:9 on Desktop) */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {!imageError ? (
          <picture>
            <source media="(min-width: 768px)" srcSet={DESKTOP_IMAGE_PATH} />
            <img
              src={MOBILE_IMAGE_PATH}
              alt="Blush pink, crimson red, and white garden roses beside sunlit sheer white curtains"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover object-top md:object-center animate-gentle-drift select-none"
            />
          </picture>
        ) : (
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_50%_25%,#FDE2E8_0%,#FFF1F5_55%,#FFFFFF_100%)]" />
        )}

        {/* Mobile bottom-up scrim keeping upper roses bright & lower thumb zone crisp; Desktop left-to-right scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF7F9]/95 via-[#FFF7F9]/75 to-transparent md:bg-gradient-to-r md:from-[#FFF7F9]/95 md:via-[#FFF7F9]/75 md:to-[#FFF7F9]/15" />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#FFF7F9]/75 via-transparent to-[#FFF7F9]/45" />

        {/* Flying Pink, Red & White Hearts */}
        {!prefersReducedMotion &&
          FLYING_HEARTS.map((heart) => (
            <motion.div
              key={heart.id}
              style={{ left: heart.left, bottom: '-36px' }}
              className="absolute pointer-events-none drop-shadow-[0_4px_10px_rgba(225,29,72,0.18)]"
              initial={{ opacity: 0, y: 0, x: 0, scale: 0.75, rotate: 0 }}
              animate={{
                opacity: [0, 0.85, 0.85, 0],
                y: ['0vh', '-112vh'],
                x: [0, heart.sway, -heart.sway * 0.6, heart.sway * 0.4],
                scale: [0.75, 1.05, 0.95],
                rotate: [0, heart.rotate, -heart.rotate * 0.6],
              }}
              transition={{
                duration: heart.duration,
                delay: heart.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <HeartSvg size={heart.size} color={heart.color} stroke={heart.stroke} />
            </motion.div>
          ))}
      </div>

      {/* Compact Mobile-Safe Top Bar */}
      <header className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-10 pt-[max(1rem,env(safe-area-inset-top))] md:pt-8 flex items-center justify-between gap-4">
        <span className="font-display italic font-semibold text-xl sm:text-2xl tracking-wide text-[#9F1239] bg-white/75 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none px-3 py-1 md:p-0 rounded-lg whitespace-nowrap shrink-0">
          For Assia
        </span>

        <button
          type="button"
          onClick={handleReplay}
          className="inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-3.5 sm:px-4 py-2 text-xs font-medium tracking-wide text-[#7D3B4D] hover:text-[#4A1525] bg-white/85 hover:bg-white backdrop-blur-sm border border-[#F3C6D3] hover:border-[#E11D48]/40 rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
        >
          <RotateCcw className="w-4 h-4 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
          <span>Replay</span>
        </button>
      </header>

      {/* Mobile Thumb-Zone Bottom Stack / Desktop Left-Aligned Composition */}
      <section className="relative z-10 flex-1 w-full max-w-[1280px] mx-auto px-5 sm:px-10 pt-8 pb-5 md:py-14 flex flex-col justify-end md:justify-center">
        <div key={revealKey} className="w-full max-w-xl">
          {/* Unboxed Editorial Kicker */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 text-xs sm:text-sm font-medium tracking-wide text-[#BE123C] mb-2 sm:mb-4"
          >
            <span>Assia</span>
            <span aria-hidden="true">·</span>
            <span>Just for you</span>
          </motion.div>

          {/* Animated Special Calligraphic Name */}
          <h1 className="relative inline-block mb-4 sm:mb-6">
            <span className="sr-only">Assia</span>
            <span
              aria-hidden="true"
              className="font-display italic font-semibold tracking-[-0.02em] leading-[0.95] text-[clamp(4.25rem,18vw,8.75rem)] text-[#4A1525] flex"
            >
              {NAME_LETTERS.map((letter, index) => (
                <motion.span
                  key={`${revealKey}-${index}`}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 28, filter: 'blur(6px)' }
                  }
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.75,
                    delay: prefersReducedMotion ? 0 : 0.12 + index * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </span>

            {/* Animated Hand-Drawn Calligraphic Flourish */}
            <svg
              viewBox="0 0 280 22"
              fill="none"
              className="w-[78%] max-w-[260px] h-auto mt-1 text-[#E11D48]"
              aria-hidden="true"
            >
              <motion.path
                d="M4 15.5C58 5.5 142 3.5 274 11.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                initial={
                  prefersReducedMotion
                    ? { pathLength: 1, opacity: 0.9 }
                    : { pathLength: 0, opacity: 0 }
                }
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{
                  pathLength: {
                    duration: 1.0,
                    delay: prefersReducedMotion ? 0 : 0.58,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  opacity: { duration: 0.3, delay: prefersReducedMotion ? 0 : 0.58 },
                }}
              />
            </svg>
          </h1>

          {/* Sweet Lead Line Setting Up the Reveal */}
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: prefersReducedMotion ? 0 : 0.72,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display italic text-[clamp(1.25rem,5vw,1.85rem)] leading-[1.35] text-[#7D3B4D] max-w-md mb-6 sm:mb-8 text-balance"
          >
            There&apos;s something on my mind I&apos;ve been wanting to say to you.
          </motion.p>

          {/* Full-Width Thumb-Zone CTA on Mobile, Auto-Width on Desktop */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: prefersReducedMotion ? 0 : 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <button
              type="button"
              onClick={() => setIsMessageOpen(true)}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 min-h-[52px] px-6 py-3.5 bg-[#E11D48] hover:bg-[#BE123C] active:scale-[0.98] text-white text-[15px] font-semibold rounded-2xl md:rounded-xl shadow-[0_12px_28px_-6px_rgba(225,29,72,0.45)] transition-all duration-150 md:whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A1525] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF7F9]"
            >
              <Heart className="w-4 h-4 fill-white/90 shrink-0" aria-hidden="true" />
              <span>I want to tell you something important</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Quiet Safe-Area Footer */}
      <footer className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-10 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:pb-8 flex items-center justify-between text-xs text-[#7D3B4D]">
        <span>Written for Assia</span>
        <span>From the heart</span>
      </footer>

      {/* Mobile Bottom Sheet / Desktop Centered Modal */}
      <AnimatePresence>
        {isMessageOpen && (
          <motion.div
            key="message-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMessageOpen(false)}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6 bg-[#4A1525]/45 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="assia-popout-message"
          >
            <div className="relative w-full sm:max-w-md flex items-center justify-center">
              {/* Heart Burst Around Pop-Out */}
              {!prefersReducedMotion &&
                POP_BURST_HEARTS.map((burst) => (
                  <motion.div
                    key={burst.id}
                    className="absolute pointer-events-none z-10"
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: burst.x,
                      y: burst.y,
                      scale: [0.4, 1.15, 0.9],
                    }}
                    transition={{
                      duration: 1.4,
                      delay: burst.delay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <HeartSvg size={burst.size} color={burst.color} stroke={burst.stroke} />
                  </motion.div>
                ))}

              <motion.div
                key="message-card"
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 48, scale: 0.96 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 36, scale: 0.97 }
                }
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                onClick={(event) => event.stopPropagation()}
                className="relative w-full rounded-t-3xl sm:rounded-2xl bg-white border-t sm:border border-[#F5D0DA] px-6 pt-4 pb-[max(1.75rem,env(safe-area-inset-bottom))] sm:p-8 shadow-[0_-16px_50px_-10px_rgba(159,18,57,0.28)] sm:shadow-[0_24px_60px_-15px_rgba(159,18,57,0.28)]"
              >
                {/* Mobile Sheet Drag Indicator */}
                <div
                  className="w-10 h-1.5 bg-[#F3C6D3] rounded-full mx-auto mb-5 sm:hidden"
                  aria-hidden="true"
                />

                <button
                  type="button"
                  onClick={() => setIsMessageOpen(false)}
                  aria-label="Close message"
                  className="absolute top-4 right-4 inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl text-[#7D3B4D] hover:text-[#4A1525] hover:bg-[#FFF1F5] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]"
                >
                  <X className="w-5 h-5 sm:w-4 sm:h-4" aria-hidden="true" />
                </button>

                <p className="text-xs font-medium tracking-wide text-[#E11D48] mb-3">
                  For Assia
                </p>

                <p
                  id="assia-popout-message"
                  className="font-display italic font-semibold text-[clamp(1.9rem,7vw,2.6rem)] leading-[1.2] text-[#4A1525] mb-7"
                >
                  hhhhhh ada7ak m3ak sf ghayriha
                </p>

                <button
                  type="button"
                  onClick={() => setIsMessageOpen(false)}
                  className="w-full sm:w-auto min-h-[48px] px-6 py-3 bg-[#E11D48] hover:bg-[#BE123C] active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A1525]"
                >
                  Close
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
