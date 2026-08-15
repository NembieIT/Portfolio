import { useEffect, useRef, useState, type ReactNode } from 'react';

const DELAY_CLASSES: Record<number, string> = {
  0: '',
  200: 'delay-200',
  300: 'delay-300',
  500: 'delay-500',
};

type RevealProps = {
  children: ReactNode;
  delay?: number;
  initialScale?: boolean;
  className?: string;
};

export default function Reveal({
  children,
  delay = 0,
  initialScale = false,
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const hiddenClasses = initialScale ? 'opacity-0 scale-95' : 'opacity-0 translate-y-8';

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${visible ? '' : hiddenClasses} ${DELAY_CLASSES[delay] ?? ''} ${className}`}
    >
      {children}
    </div>
  );
}
