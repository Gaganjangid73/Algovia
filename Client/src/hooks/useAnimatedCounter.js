import { useState, useEffect, useRef } from "react";

/**
 * Custom Hook for Viewport-Triggered Animated Number Counter
 * Triggers counting animation from 0 to targetCount when element intersects viewport
 *
 * @param {number} targetCount Final target number to count up to
 * @param {number} duration Duration of count animation in ms (default: 2000)
 * @returns {{ count: number, formattedCount: string, elementRef: React.RefObject }}
 */
export const useAnimatedCounter = (targetCount = 0, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    if (!targetCount) return;

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let start = 0;
          const end = Number(targetCount);
          const startTime = performance.now();

          const updateCount = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // Smooth cubic ease-out calculation
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeOutProgress * (end - start) + start);

            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            }
          };

          requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [targetCount, duration, hasAnimated]);

  const formattedCount = count.toLocaleString("en-IN");

  return { count, formattedCount, elementRef };
};
