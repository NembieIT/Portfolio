import Reveal from '../components/common/Reveal';
import { useLanguage } from '../i18n/LanguageContext';

const TOOLKIT: Record<'frontend' | 'backend' | 'ai', readonly string[]> = {
  frontend: ['ReactJS', 'TailwindCSS', 'Three.js'],
  backend: ['NodeJS', 'Java Spring Boot', 'Express', 'MongoDB'],
  ai: ['Python (AI)', 'AI Agents', 'Figma'],
};

export default function About() {
  const { locale, messages } = useLanguage();
  const { aboutPage } = messages;

  const toolkitSections = [
    { key: 'frontend', title: aboutPage.toolkit.frontend, accent: 'border-l-primary' },
    { key: 'backend', title: aboutPage.toolkit.backend, accent: 'border-l-secondary' },
    { key: 'ai', title: aboutPage.toolkit.ai, accent: 'border-l-inverse-primary' },
  ] as const;

  const languages = [
    aboutPage.languages.vietnamese,
    aboutPage.languages.english,
    aboutPage.languages.japanese,
  ];

  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-background">
      {/* Subtle ambient background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-inverse-primary/10 via-transparent to-transparent rounded-full blur-[100px] pointer-events-none transform -translate-x-1/2 translate-y-1/3"></div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col md:flex-row px-margin-desktop pt-stack-xl pb-stack-lg gap-gutter items-center z-10">
        <div className="w-full md:w-5/12 flex flex-col justify-center relative">
          <div className="absolute -left-margin-desktop top-1/2 -translate-y-1/2 text-outline-variant/10 font-display-xl text-[200px] leading-none select-none tracking-tighter whitespace-nowrap z-0">
            DŨNG
          </div>
          <div className="relative z-10 space-y-8">
            <Reveal className="flex flex-col gap-6">
              <div className="font-label-sm text-label-sm text-primary uppercase tracking-[0.2em] flex items-center gap-4">
                <div className="w-8 h-[1px] bg-primary"></div>
                {aboutPage.kicker}
              </div>
              <h1 className="font-display-lg text-display-lg text-on-background leading-[1.1] tracking-tight">
                {aboutPage.heading}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                {aboutPage.intro}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Right: Visual Card */}
        <div className="w-full md:w-7/12 relative mt-stack-md md:mt-0 flex justify-center md:justify-end">
          <div className="relative w-full max-w-[600px] aspect-[4/5] rounded-xl overflow-hidden group">
            <div className="absolute inset-0 bg-surface/40 backdrop-blur-[20px] z-10 group-hover:bg-surface/20 transition-all duration-700"></div>
            <div className="absolute inset-0 border border-white/10 rounded-xl z-20 pointer-events-none mix-blend-overlay"></div>
            <img
              alt="A highly abstract, macro photography shot of glass layers refracting light in deep charcoal and subtle magenta/cyan hues. Sharp geometric edges intersecting with soft, blurred light flares. Minimalist, high-end digital art aesthetic, evoking themes of precision and fluidity in technology."
              className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7Q3z9qmicuzoUNYr292Kpo9iNr5fXPOqyeCSGh0lzuI34-5yTcHp89e0Kvtxk_vA1Toiq42ZEbFKa5OBbRHOSDdWVxLNDWVlY1YiWednACoUXtYhVeN-DLosvX8tFHXqwIQxJJ9_-uMtZEFRTQiT9SptMncp_aFRWfi3ohqV0XJy2GRJdPEo0A8sIbf6daqTvl_xObH3ENGnuFsMtq1COaJF7rh0dG2sLiqlNXV9dw6cdHd3IiJ7t-w"
              loading="lazy"
            />
          </div>
          {/* Floating Detail Card */}
          <div className="absolute bottom-16 -left-4 md:-left-24 bg-surface-container-high/80 backdrop-blur-[24px] p-8 rounded-lg border border-white/10 shadow-2xl max-w-[320px] z-30 transform hover:-translate-y-2 transition-transform duration-500">
            <div className="flex items-center gap-4 mb-4">
              <span className="material-symbols-outlined text-secondary-fixed-dim">school</span>
              <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest">
                {aboutPage.education.school}
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {aboutPage.education.degree} ·{' '}
              {locale === 'vi' ? 'Cần Thơ, Việt Nam' : 'Cần Thơ, Vietnam'}
            </p>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="relative px-margin-desktop py-stack-xl z-10 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Side Navigation / Labels */}
          <div className="md:col-span-3 flex flex-col space-y-12">
            <div className="sticky top-32">
              <ul className="space-y-6 font-label-sm text-label-sm uppercase tracking-[0.15em] text-on-surface-variant">
                {(['approach', 'toolkit', 'education', 'vision'] as const).map((section, index) => (
                  <li
                    key={section}
                    className="flex items-center gap-4 hover:text-on-surface transition-colors group"
                  >
                    <div className="w-2 h-2 rounded-full bg-surface-variant group-hover:bg-primary transition-colors"></div>
                    <span>
                      {String(index + 1).padStart(2, '0')}. {aboutPage[section].title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Content Blocks */}
          <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
            {/* Approach */}
            <Reveal className="space-y-8 bg-surface/30 p-10 rounded-2xl border border-white/5 backdrop-blur-xl hover:bg-surface/50 transition-colors duration-500">
              <h3 className="font-headline-lg text-headline-lg text-on-background relative z-10">
                {aboutPage.approach.title}
              </h3>
              <ul className="flex flex-col gap-4">
                {aboutPage.approach.items.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></span>
                    <span className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Toolkit */}
            <Reveal
              delay={150}
              className="space-y-8 bg-surface/30 p-10 rounded-2xl border border-white/5 backdrop-blur-xl hover:bg-surface/50 transition-colors duration-500 md:mt-16"
            >
              <h3 className="font-headline-lg text-headline-lg text-on-background relative z-10">
                {aboutPage.toolkit.title}
              </h3>
              <div className="flex flex-col gap-8">
                {toolkitSections.map(({ key, title, accent }) => (
                  <div key={key} className="flex flex-col gap-3">
                    <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest">
                      {title}
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {TOOLKIT[key].map((tool) => (
                        <span
                          key={tool}
                          className={`px-4 py-2 bg-surface-container-high rounded-full font-code-md text-code-md text-on-surface border border-white/5 border-l ${accent} hover:border-l-secondary transition-colors cursor-default`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Education + Certificates */}
            <Reveal className="space-y-8 bg-surface/30 p-10 rounded-2xl border border-white/5 backdrop-blur-xl hover:bg-surface/50 transition-colors duration-500">
              <h3 className="font-headline-lg text-headline-lg text-on-background relative z-10">
                {aboutPage.education.title}
              </h3>
              <div className="flex flex-col gap-2">
                <span className="font-headline-md text-headline-md text-primary">
                  {aboutPage.education.school}
                </span>
                <span className="font-body-lg text-body-lg text-on-surface-variant">
                  {aboutPage.education.degree}
                </span>
              </div>
              <div className="pt-6 border-t border-white/5 flex flex-col gap-6">
                <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest">
                  {aboutPage.certificates.title}
                </span>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-secondary-fixed-dim text-[20px]">
                      verified
                    </span>
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      {aboutPage.certificates.ux}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-secondary-fixed-dim text-[20px]">
                      verified
                    </span>
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      {aboutPage.certificates.use}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Languages */}
            <Reveal
              delay={150}
              className="space-y-8 bg-surface/30 p-10 rounded-2xl border border-white/5 backdrop-blur-xl hover:bg-surface/50 transition-colors duration-500 md:mt-16"
            >
              <h3 className="font-headline-lg text-headline-lg text-on-background relative z-10">
                {aboutPage.languages.title}
              </h3>
              <div className="flex flex-col gap-6">
                {languages.map((language) => (
                  <div key={language.name} className="flex items-center justify-between">
                    <span className="font-body-lg text-body-lg text-on-surface">
                      {language.name}
                    </span>
                    <span className="px-3 py-1 bg-surface-container-high rounded-full font-code-md text-code-md text-primary border border-white/5">
                      {language.level}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Vision (Spans full width of right column) */}
            <Reveal className="md:col-span-2 space-y-8 bg-gradient-to-r from-surface-container to-surface/20 p-12 rounded-2xl border border-white/5 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-1/2">
                  <h3 className="font-headline-lg text-headline-lg text-on-background mb-6">
                    {aboutPage.vision.title}
                  </h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                    {aboutPage.vision.text}
                  </p>
                </div>
                <div className="w-full md:w-1/2 relative h-[300px] rounded-xl overflow-hidden">
                  <div className="absolute inset-0 border border-white/10 z-20 pointer-events-none"></div>
                  <img
                    alt="A futuristic, minimal architectural space. Dark concrete walls with a massive, glowing holographic installation in the center emitting soft magenta and cyan light. The light reflects off a polished black floor. Atmospheric, high-contrast, representing a blend of digital and physical realms."
                    className="w-full h-full object-cover opacity-80"
                    loading="lazy"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuByHpxS62mKy9FlHXg2oqSaFPV1wQVnRxM4Wh6JQDTTkMyUobDacGTmgx0TdU8elpRF2Ml2_TMLQpBmJtBdPXM0uXW5Y2H8qbHD7SDZT-X7MWZG1bDRcsrvYMkX9RVLmPw4tdgOyqWLshc0uzaSvSd5J7rlvcNRbQY1vYqpNj2GMWjWWC3kcVJAEBJ_zvWt6FQCPG-_HaAl7wEG8NAcYJr4NKtz1LFv1mNWgcK3rrkWoAVc9dCYZfXxxw"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
