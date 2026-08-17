import { useEffect, useRef } from 'react';

type LightboxProps = {
  src: string;
  alt: string;
  caption?: string;
  closeLabel: string;
  onClose: () => void;
};

export default function Lightbox({
  src,
  alt,
  caption,
  closeLabel,
  onClose,
}: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      lastFocusedRef.current?.focus();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[100] flex items-center justify-center p-margin-desktop"
    >
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fade-in_0.25s_ease-out]"
      ></button>
      <div
        className="relative w-full max-w-[min(90vw,1280px)] animate-[modal-in_0.25s_ease-out]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bg-surface-container-high/95 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl p-3 md:p-4">
          <img
            src={src}
            alt={alt}
            className="w-full max-h-[70vh] object-contain rounded-xl"
          />
          {caption ? (
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest text-center mt-3 px-2">
              {caption}
            </p>
          ) : null}
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
          className="absolute -top-4 -right-4 w-11 h-11 rounded-full bg-surface-container-high border border-white/15 flex items-center justify-center shadow-lg hover:border-primary/50 hover:text-primary transition-colors duration-300"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>
    </div>
  );
}