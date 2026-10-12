import { useEffect, useRef, useState } from 'react';

const DURATION = 2000;

// "226 000", "350+", "117": text before, the digits (spaces allowed as thousands separators), text after.
const PARSE = /^(\D*)(\d(?:[\d\s ]*\d)?)(\D*)$/;

export function parseNumber(value: string) {
  const match = PARSE.exec(value.trim());
  if (!match) return null;
  const digits = match[2];
  const end = Number(digits.replace(/[\s ]/g, ''));
  if (!Number.isFinite(end)) return null;
  return { prefix: match[1], end, grouped: /\d[\s ]\d/.test(digits), suffix: match[3] };
}

export const groupThousands = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/**
 * Counts up to the number in `value` when it scrolls into view. Anything that isn't
 * a number is shown as it is, and so is everything for visitors who prefer less motion.
 */
export function AnimatedNumber({ value }: { value: string }) {
  const parsed = parseNumber(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animate = parsed !== null && !reducedMotion;

  useEffect(() => {
    if (!animate || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animate]);

  useEffect(() => {
    if (!started || !parsed) return;
    const startTime = Date.now();
    let frame = 0;
    const tick = () => {
      const progress = Math.min((Date.now() - startTime) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // ease-out
      setCount(progress < 1 ? Math.floor(eased * parsed.end) : parsed.end);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, value]);

  if (!parsed || !animate) return <span className="tabular-nums">{value}</span>;

  const shown = `${parsed.prefix}${parsed.grouped ? groupThousands(count) : count}${parsed.suffix}`;
  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
