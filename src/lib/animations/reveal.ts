/** Browser-only, cancellable initialization. Safe to call from a React effect. */
export function reveal(element: HTMLElement, onScroll = false): () => void {
  if (
    typeof window === 'undefined' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
    return () => {};
  let disposed = false;
  let revert: (() => void) | undefined;
  void (async () => {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    if (disposed) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      // Essential content stays opaque and readable even if loading fails.
      gsap.from(element, {
        y: 12,
        duration: 0.45,
        ease: 'power2.out',
        ...(onScroll
          ? {
              scrollTrigger: { trigger: element, start: 'top 90%', once: true },
            }
          : {}),
      });
    });
    revert = () => media.revert();
  })().catch((error: unknown) => {
    if (import.meta.env.DEV)
      console.warn('Optional animation unavailable:', error);
  });
  return () => {
    disposed = true;
    revert?.();
  };
}
