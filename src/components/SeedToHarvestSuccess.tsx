/**
 * SeedToHarvestSuccess — Premium success animation for contact form submissions
 *
 * A three-step, text-led micro-animation (≤4s total) that plays after successful form submission.
 * Uses inline SVG + Framer Motion with brand-aligned tokens. Features a final confirmation message.
 *
 * **Brand Tokens Used:**
 * - Background: `--card` (modal surface)
 * - Text: `--fg` (foreground text)
 * - Copper/Accent: `--accent` (copper #AE5521 light / #CD9A71 dark)
 * - Stroke: `--accent` with opacity for line
 * - Node fill: `--card` (matches background)
 *
 * **Timings (defaults, override via `durations` prop):**
 * - Phase 1 → 2: 900ms (line fill to second node)
 * - Phase 2 → 3: 1000ms (line fill to third node)
 * - Shimmer sweep: 600ms
 * - Final message fade-in: 400ms
 * Total: ~4000ms
 *
 * **Accessibility:**
 * - Respects `prefers-reduced-motion` with instant final state
 * - `role="status"` and `aria-live="polite"` for screen readers
 * - Keyboard-friendly container
 *
 * **Usage:**
 * ```tsx
 * <SeedToHarvestSuccess
 *   onDone={() => {
 *     // Show CTAs or close modal
 *   }}
 * />
 * ```
 *
 * **Analytics:**
 * Fire `contact_submit_success_animated` event when `onDone` callback runs.
 */

"use client";

import React from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";

type Props = {
  className?: string;
  /** Called when the timeline finishes (e.g., reveal CTAs) */
  onDone?: () => void;
  /** Optional: override timings in ms */
  durations?: {
    toSecond?: number; // line fill to node 2
    toThird?: number; // line fill to node 3
    shimmer?: number; // shimmer sweep
  };
};

const LINE_LENGTH = 240; // path length from x=40 to x=280 at y=40
const STEP = LINE_LENGTH / 2; // fill to second node

export default function SeedToHarvestSuccess({
  className,
  onDone,
  durations,
}: Props) {
  const reduce = useReducedMotion();
  const lineCtl = useAnimationControls();
  const shimmerCtl = useAnimationControls();
  const node1Ctl = useAnimationControls();
  const node2Ctl = useAnimationControls();
  const node3Ctl = useAnimationControls();
  const labelCtl = useAnimationControls();
  const finalMessageCtl = useAnimationControls();
  const [phase, setPhase] = React.useState<0 | 1 | 2 | 3>(0);
  const [showFinalMessage, setShowFinalMessage] = React.useState(false);

  // Map timings (tweakable; keep total under ~4000ms)
  // Convert from ms to seconds for Framer Motion
  // Memoize to prevent useEffect from re-running unnecessarily
  const d = React.useMemo(
    () => ({
      toSecond: (durations?.toSecond ?? 900) / 1000, // Convert ms to seconds
      toThird: (durations?.toThird ?? 1000) / 1000,
      shimmer: (durations?.shimmer ?? 600) / 1000,
    }),
    [durations?.toSecond, durations?.toThird, durations?.shimmer]
  );

  React.useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        if (reduce) {
          // Instant final state for reduced motion
          lineCtl.set({ strokeDashoffset: 0 });
          node1Ctl.set({ scale: 1, opacity: 1 });
          node2Ctl.set({ scale: 1, opacity: 1 });
          node3Ctl.set({ scale: 1, opacity: 1 });
          setPhase(3);
          setShowFinalMessage(true);
          onDone?.();
          return;
        }

        // Reset all animations to initial state
        lineCtl.set({ strokeDashoffset: LINE_LENGTH });
        shimmerCtl.set({ x: -260, opacity: 0 });
        node1Ctl.set({ scale: 0.6, opacity: 0 });
        node2Ctl.set({ scale: 0.6, opacity: 0 });
        node3Ctl.set({ scale: 0.6, opacity: 0 });
        labelCtl.set({ opacity: 0, y: 6 });
        finalMessageCtl.set({ opacity: 0, y: 8 });
        setPhase(0);
        setShowFinalMessage(false);

        // Small delay to ensure reset is applied before starting animations
        await new Promise((resolve) => setTimeout(resolve, 50));

        if (cancelled) return;

        // Phase 1 — Planting the Seed
        setPhase(1);
        await Promise.all([
          node1Ctl.start({
            scale: 1,
            opacity: 1,
            transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
          }),
          lineCtl.start({
            strokeDashoffset: LINE_LENGTH - STEP,
            transition: { duration: d.toSecond, ease: "easeInOut" },
          }),
          labelCtl.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.25 },
          }),
        ]);

        if (cancelled) return;

        await labelCtl.start({
          opacity: 0,
          y: -6,
          transition: { delay: 0.35, duration: 0.25 },
        });

        if (cancelled) return;

        // Phase 2 — Cultivating the Connection
        setPhase(2);
        await Promise.all([
          node2Ctl.start({
            scale: 1,
            opacity: 1,
            transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
          }),
          lineCtl.start({
            strokeDashoffset: 0,
            transition: { duration: d.toThird, ease: "easeInOut" },
          }),
          labelCtl.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.25 },
          }),
        ]);

        if (cancelled) return;

        await labelCtl.start({
          opacity: 0,
          y: -6,
          transition: { delay: 0.35, duration: 0.25 },
        });

        if (cancelled) return;

        // Phase 3 — Harvesting the Response
        setPhase(3);
        await node3Ctl.start({
          scale: 1,
          opacity: 1,
          transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
        });

        if (cancelled) return;

        // Shimmer sweep
        shimmerCtl.set({ x: -260, opacity: 0.0 });
        await shimmerCtl.start({
          x: 260,
          opacity: [0, 1, 0],
          transition: { duration: d.shimmer, times: [0, 0.2, 1], ease: "easeOut" },
        });

        if (cancelled) return;

        // Small delay before showing final message
        await new Promise((resolve) => setTimeout(resolve, 200));

        if (cancelled) return;

        // Show final confirmation message - set state first
        setShowFinalMessage(true);
        
        // Force a re-render to ensure the message DOM element exists
        await new Promise((resolve) => setTimeout(resolve, 100));
        
        if (cancelled) return;

        // Animate the message in (ensure we start from the right state)
        finalMessageCtl.set({ opacity: 0, y: 8 });
        await finalMessageCtl.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        });

        if (!cancelled) {
          onDone?.();
        }
      } catch (error) {
        console.error("Animation error:", error);
        // Still call onDone even if there's an error
        if (!cancelled) {
          onDone?.();
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
    // Only re-run if reduce motion preference or durations change
    // Animation controls are stable and don't need to be in deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, onDone, d]);

  return (
    <div
      className={className}
      role="status"
      aria-live="polite"
      style={{
        // Map to existing brand tokens
        background: "transparent",
        color: "var(--fg)",
        width: "100%",
      }}
    >
      <div style={{ width: 320, height: 80, margin: "0 auto" }}>
        <svg viewBox="0 0 320 80" width="320" height="80" aria-hidden="true">
          <defs>
            <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
            <clipPath id="lineClip">
              <path d="M40 40 L280 40" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </clipPath>
          </defs>

          {/* Track (subtle background line) */}
          <path
            d="M40 40 L280 40"
            stroke="var(--muted)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity={0.3}
          />

          {/* Animated line */}
          <motion.path
            d="M40 40 L280 40"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            style={{ strokeDasharray: LINE_LENGTH } as React.CSSProperties}
            animate={lineCtl}
            opacity={0.7}
          />

          {/* Shimmer sweep clipped to the line */}
          <motion.rect
            x="-260"
            y="34"
            width="260"
            height="12"
            fill="url(#copperGrad)"
            clipPath="url(#lineClip)"
            animate={shimmerCtl}
          />

          {/* Nodes */}
          <motion.circle
            cx="40"
            cy="40"
            r="7"
            fill="var(--card)"
            stroke="var(--accent)"
            strokeWidth="2.5"
            animate={node1Ctl}
          />

          <motion.circle
            cx="160"
            cy="40"
            r="7"
            fill="var(--card)"
            stroke="var(--accent)"
            strokeWidth="2.5"
            animate={node2Ctl}
          />

          <motion.circle
            cx="280"
            cy="40"
            r="7"
            fill="var(--card)"
            stroke="var(--accent)"
            strokeWidth="2.5"
            animate={node3Ctl}
          />

        </svg>
      </div>

      {/* Phase labels (visible text) */}
      {!reduce && !showFinalMessage && (
        <motion.div
          animate={labelCtl}
          style={{
            fontSize: 14,
            marginTop: 12,
            letterSpacing: 0.2,
            fontFamily: "var(--font-body)",
            color: "var(--fg)",
            textAlign: "center",
            minHeight: 40,
          }}
        >
          {phase === 1 && (
            <>
              <strong>Planting the Seed.</strong> Message received.
            </>
          )}
          {phase === 2 && (
            <>
              <strong>Cultivating the Connection.</strong> We&apos;re reviewing.
            </>
          )}
          {phase === 3 && (
            <>
              <strong>Harvesting the Response.</strong> We&apos;ll reach out shortly.
            </>
          )}
        </motion.div>
      )}

      {/* Final confirmation message */}
      {showFinalMessage && (
        <motion.div
          animate={finalMessageCtl}
          initial={{ opacity: 1, y: 0 }}
          style={{
            fontSize: 15,
            marginTop: 16,
            fontFamily: "var(--font-body)",
            color: "var(--fg)",
            textAlign: "center",
            lineHeight: 1.6,
            padding: "0 8px",
            width: "100%",
          }}
        >
          <div style={{ marginBottom: 6, fontWeight: 600 }}>
            Thank you for reaching out.
          </div>
          <div style={{ fontSize: 14, color: "var(--secondary)", opacity: 0.9 }}>
            We&apos;ve received your message and will get back to you within 1–2 business days.
          </div>
        </motion.div>
      )}

      {/* Reduced motion: show final text instantly */}
      {reduce && (
        <div
          style={{
            fontSize: 15,
            marginTop: 8,
            fontFamily: "var(--font-body)",
            color: "var(--fg)",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          <div style={{ marginBottom: 4 }}>
            <strong>Thank you for reaching out.</strong>
          </div>
          <div style={{ fontSize: 14, color: "var(--secondary)", opacity: 0.9 }}>
            We&apos;ve received your message and will get back to you within 1–2 business days.
          </div>
        </div>
      )}
    </div>
  );
}

