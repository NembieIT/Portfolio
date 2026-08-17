import { useCallback, useEffect, useRef, useState } from 'react';
import Lightbox from '../components/common/Lightbox';
import Reveal from '../components/common/Reveal';
import { useLanguage } from '../i18n/LanguageContext';
import portraitImg from '../pics/gioithieu.jpg';
import uxCertificateImg from '../pics/CERTIFICATE_UX.jpeg';
import useContestImg from '../pics/useContest.jpg';

type TimelineStage = {
  period: string;
  title: string;
  text: string;
};

const TIMELINE_IMAGES: ReadonlyArray<string | undefined> = [
  undefined,
  uxCertificateImg,
  useContestImg,
  undefined,
  undefined,
];

const TOOLKIT: Record<'frontend' | 'backend' | 'ai', readonly string[]> = {
  frontend: ['ReactJS', 'TypeScript', 'TailwindCSS', 'Three.js'],
  backend: ['NodeJS', 'Express', 'Java Spring Boot', 'MongoDB', 'MySQL'],
  ai: ['Python', 'YOLOv8', 'AI Agents', 'Figma'],
};

function TimelineItem({
  stage,
  index,
  image,
  viewFullImageLabel,
  onOpenImage,
}: {
  stage: TimelineStage;
  index: number;
  image?: string;
  viewFullImageLabel: string;
  onOpenImage: () => void;
}) {
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
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative md:grid md:grid-cols-2 md:gap-gutter items-center">
      {/* Node */}
      <div className="absolute left-4 md:left-1/2 top-1 -translate-x-1/2 z-10">
        <div
          className={`w-4 h-4 rounded-full border-2 bg-background transition-all duration-700 ${
            visible ? 'border-primary scale-100 shadow-[0_0_18px_rgba(236,178,255,0.6)]' : 'border-white/30 scale-50'
          }`}
        ></div>
      </div>

      {/* Card */}
      <div
        className={`ml-12 md:ml-0 [perspective:1200px] ${
          isLeft ? 'md:col-start-1' : 'md:col-start-2'
        }`}
      >
        <div
          className={`group transition-all duration-1000 ease-out ${
            visible
              ? 'opacity-100 translate-y-0 [transform:rotateX(0deg)]'
              : 'opacity-0 translate-y-10 [transform:rotateX(18deg)]'
          } bg-surface-container-low/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1`}
        >
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
            {stage.period}
          </span>
          <h3 className="font-headline-md text-headline-md text-on-background leading-tight mt-3">
            {stage.title}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mt-3">
            {stage.text}
          </p>
          {image ? (
            <button
              type="button"
              aria-label={`${stage.title} — ${viewFullImageLabel}`}
              onClick={onOpenImage}
              className="group/img relative mt-6 w-full rounded-xl overflow-hidden border border-white/10 transition-colors duration-500 cursor-zoom-in text-left"
            >
              <img
                src={image}
                alt=""
                loading="lazy"
                className="w-full max-h-72 object-cover object-top"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 group-hover/img:opacity-100 group-focus-visible/img:opacity-100 transition-opacity duration-300">
                <span className="w-12 h-12 rounded-full bg-primary/90 text-on-primary flex items-center justify-center shadow-xl backdrop-blur-md">
                  <span className="material-symbols-outlined text-[24px]">
                    zoom_in
                  </span>
                </span>
              </span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const { locale, messages } = useLanguage();
  const { aboutPage } = messages;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const lightboxStage =
    lightboxIndex !== null ? aboutPage.timeline.stages[lightboxIndex] : undefined;
  const lightboxSrc =
    lightboxIndex !== null ? TIMELINE_IMAGES[lightboxIndex] : undefined;

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

      {/* Hero */}
      <section className="relative min-h-[85vh] flex flex-col md:flex-row px-margin-desktop pt-stack-xl pb-stack-lg gap-gutter items-center z-10">
        <div className="w-full md:w-3/5 flex flex-col gap-8">
          <Reveal className="flex flex-col gap-6">
            <div className="font-label-sm text-label-sm text-primary uppercase tracking-[0.2em] flex items-center gap-4">
              <div className="w-8 h-[1px] bg-primary"></div>
              {aboutPage.kicker}
            </div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background leading-[1.15] tracking-tight">
              {aboutPage.heading}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
              {aboutPage.intro}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex flex-wrap gap-3">
              {messages.skills.slice(0, 5).map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-surface-container-high rounded-full font-code-md text-code-md text-on-surface border border-white/5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Portrait */}
        <Reveal initialScale delay={300} className="w-full md:w-2/5 flex justify-center md:justify-end">
          <div className="relative w-full max-w-[380px]">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/25 via-secondary/15 to-transparent rounded-[2rem] blur-2xl pointer-events-none"></div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/5]">
              <img
                src={portraitImg}
                alt="Mai Tiến Dũng — full-stack developer"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 left-6 right-6 bg-surface-container-high/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex items-center gap-4">
              <span className="material-symbols-outlined text-secondary-fixed-dim">school</span>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest">
                  {aboutPage.education.school}
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  {aboutPage.education.degree} ·{' '}
                  {locale === 'vi' ? 'Cần Thơ, Việt Nam' : 'Cần Thơ, Vietnam'}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 3D Timeline */}
      <section className="relative px-margin-desktop py-stack-xl z-10 border-t border-white/5">
        <div className="max-w-container-max mx-auto">
          <Reveal className="flex flex-col gap-4 mb-stack-lg">
            <div className="font-label-sm text-label-sm text-primary uppercase tracking-[0.2em] flex items-center gap-4">
              <div className="w-8 h-[1px] bg-primary"></div>
              {aboutPage.timeline.title}
            </div>
          </Reveal>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-gradient-to-b from-primary/60 via-white/15 to-transparent"></div>
            <div className="md:hidden absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-white/15 to-transparent"></div>
            <div className="flex flex-col gap-12 md:gap-16">
              {aboutPage.timeline.stages.map((stage, index) => (
                <TimelineItem
                  key={stage.title}
                  stage={stage}
                  index={index}
                  image={TIMELINE_IMAGES[index]}
                  viewFullImageLabel={aboutPage.viewFullImage}
                  onOpenImage={() => openLightbox(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Toolkit + Languages */}
      <section className="relative px-margin-desktop py-stack-xl z-10 border-t border-white/5">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          <Reveal className="bg-surface-container-low/60 backdrop-blur-xl border border-white/10 rounded-2xl p-10">
            <h2 className="font-headline-md text-headline-md text-on-background mb-8">
              {aboutPage.toolkit.title}
            </h2>
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

          <div className="flex flex-col gap-gutter">
            <Reveal delay={100} className="bg-surface-container-low/60 backdrop-blur-xl border border-white/10 rounded-2xl p-10">
              <h2 className="font-headline-md text-headline-md text-on-background mb-8">
                {aboutPage.languages.title}
              </h2>
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
            <Reveal delay={200} className="flex flex-col gap-4 bg-surface-container-low/60 backdrop-blur-xl border border-white/10 rounded-2xl p-10">
              <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest">
                {aboutPage.certificates.title}
              </span>
              {[aboutPage.certificates.ux, aboutPage.certificates.use].map((cert) => (
                <div key={cert} className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary-fixed-dim text-[20px]">
                    verified
                  </span>
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    {cert}
                  </span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="relative px-margin-desktop py-stack-xl z-10 border-t border-white/5">
        <div className="max-w-container-max mx-auto">
          <Reveal className="bg-gradient-to-r from-surface-container to-surface/20 p-10 md:p-12 rounded-2xl border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
              <h2 className="font-headline-md text-headline-md text-on-background">
                {aboutPage.vision.title}
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                {aboutPage.vision.text}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {lightboxStage && lightboxSrc ? (
        <Lightbox
          src={lightboxSrc}
          alt={lightboxStage.title}
          caption={`${lightboxStage.period} · ${lightboxStage.title}`}
          closeLabel={aboutPage.closeImage}
          onClose={closeLightbox}
        />
      ) : null}
    </div>
  );
}
