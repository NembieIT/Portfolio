import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/common/Reveal';
import { useLanguage } from '../i18n/LanguageContext';

const ShaderBackground = lazy(() => import('../components/three/ShaderBackground'));
const TorusKnotScene = lazy(() => import('../components/three/TorusKnotScene'));

export default function Home() {
  const { messages } = useLanguage();

  return (
    <div className="flex flex-col w-full relative min-h-screen">
      {/* Interactive Shader Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute inset-0 w-full h-full opacity-60" style={{ display: 'block' }}>
          <Suspense fallback={null}>
            <ShaderBackground />
          </Suspense>
        </div>
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[10px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center px-margin-desktop py-stack-xl">
        <div className="max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col gap-stack-md z-10 relative">
            <div className="absolute -left-12 -top-12 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
            <Reveal className="flex flex-col gap-unit">
              <span className="font-label-sm text-label-sm uppercase tracking-[0.3em] text-primary">
                {messages.hero.kicker}
              </span>
              <h1 className="font-display-xl text-display-xl text-on-background leading-tight">
                {messages.hero.greeting}
                <br />
                <span className="italic font-light text-surface-tint mix-blend-screen relative">
                  {messages.hero.name}
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-transparent opacity-50"></span>
                </span>
              </h1>
              <p className="font-display-lg-mobile text-display-lg-mobile text-on-surface-variant max-w-2xl leading-relaxed">
                <span className="text-on-background">{messages.hero.role}</span>
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="font-body-lg text-body-lg text-outline-variant max-w-lg">
                {messages.hero.description}
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="pt-8 flex flex-wrap items-center gap-6">
                <Link
                  to="/work"
                  className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-primary to-secondary-fixed-dim px-8 py-4 rounded-full overflow-hidden transition-transform duration-500 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                  <span className="relative font-label-sm text-label-sm text-on-primary tracking-widest uppercase">
                    {messages.hero.cta}
                  </span>
                  <span className="relative material-symbols-outlined text-on-primary group-hover:translate-x-2 transition-transform duration-500">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  to="/contact"
                  className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest border-b border-outline-variant pb-1 hover:text-primary hover:border-primary transition-colors duration-300"
                >
                  {messages.hero.ctaSecondary}
                </Link>
              </div>
            </Reveal>
          </div>

          {/* 3D Interactive Element */}
          <Reveal initialScale delay={500} className="lg:col-span-5 h-[600px] relative z-0">
            <div className="absolute inset-0 bg-secondary/5 rounded-full blur-[100px]"></div>
            <div
              className="absolute inset-0 w-full h-full mix-blend-screen"
              style={{ display: 'block' }}
            >
              <Suspense fallback={null}>
                <TorusKnotScene />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About / Intro Section */}
      <section className="relative w-full py-stack-xl px-margin-desktop bg-surface-container-lowest/80 backdrop-blur-3xl border-t border-white/[0.02]">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-4 flex flex-col justify-between">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              {messages.homeAbout.kicker}
            </h2>
            <div className="w-12 h-[1px] bg-primary mt-8 md:mt-0"></div>
          </div>
          <div className="md:col-span-8 flex flex-col gap-8">
            <h3 className="font-display-lg-mobile text-display-lg-mobile text-on-background leading-tight">
              {messages.homeAbout.heading}
            </h3>
            {messages.homeAbout.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
            <div className="flex items-center gap-4 mt-8">
              <span className="font-code-md text-code-md text-outline uppercase tracking-widest text-[10px]">
                {messages.homeAbout.skillHeading}
              </span>
              <div className="flex flex-wrap gap-2">
                {messages.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-surface-container-high rounded-full font-label-sm text-label-sm text-on-surface border border-white/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
