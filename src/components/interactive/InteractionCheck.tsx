import { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { reveal } from '@/lib/animations/reveal';

export default function InteractionCheck() {
  const [count, setCount] = useState(0);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const element = button.current;
    if (!element) return;
    element.disabled = false;
    const cleanup = reveal(element, true);
    return () => {
      element.disabled = true;
      cleanup();
    };
  }, []);
  return (
    <div className="space-y-4">
      <button
        ref={button}
        type="button"
        disabled
        onClick={() => setCount((value) => value + 1)}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-neutral-900 px-5 py-3 text-white disabled:opacity-60"
      >
        <Plus size={18} aria-hidden="true" /> Test interaction
      </button>
      <p role="status" aria-live="polite" className="text-sm text-neutral-600">
        Interactions: {count}
      </p>
    </div>
  );
}
