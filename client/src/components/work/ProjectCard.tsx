import type { ProjectDto } from '@shared/index';
import { useLanguage } from '../../i18n/LanguageContext';

type AccentStyles = {
  text: string;
  border: string;
  hoverShadow: string;
  hoverBorder: string;
  arrow: string;
};

const ACCENT_STYLES: Record<ProjectDto['accent'], AccentStyles> = {
  primary: {
    text: 'text-primary',
    border: 'border-l-primary',
    hoverShadow: 'hover:shadow-primary/20',
    hoverBorder: 'hover:border-primary/30',
    arrow: 'text-primary',
  },
  secondary: {
    text: 'text-secondary',
    border: 'border-l-secondary',
    hoverShadow: 'hover:shadow-secondary/20',
    hoverBorder: 'hover:border-secondary/30',
    arrow: 'text-secondary',
  },
  'inverse-primary': {
    text: 'text-inverse-primary',
    border: 'border-l-inverse-primary',
    hoverShadow: 'hover:shadow-inverse-primary/20',
    hoverBorder: 'hover:border-inverse-primary/30',
    arrow: 'text-inverse-primary',
  },
};

type ProjectCardProps = {
  project: ProjectDto;
  className?: string;
};

export default function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const { locale, messages } = useLanguage();
  const accent = ACCENT_STYLES[project.accent];

  const isVietnamese = locale === 'vi';
  const title = isVietnamese && project.titleVi ? project.titleVi : project.title;
  const description =
    isVietnamese && project.descriptionVi ? project.descriptionVi : project.description;

  return (
    <a
      className={`group relative w-full aspect-square rounded-xl overflow-hidden bg-surface-container/40 backdrop-blur-md border border-white/10 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl ${accent.hoverShadow} ${accent.hoverBorder} ${className}`}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} — ${project.category}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-70"></div>
      <img
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        alt={project.alt}
        src={project.imageUrl}
        loading="lazy"
      />
      <div className="absolute top-gutter right-gutter w-12 h-12 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500 delay-100">
        <span className={`material-symbols-outlined ${accent.arrow}`}>arrow_outward</span>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-gutter z-20 flex flex-col gap-4 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
        <div className="flex items-center gap-4">
          <span
            className={`font-label-sm text-label-sm ${accent.text} uppercase tracking-widest bg-surface/80 backdrop-blur-md px-3 py-1 rounded-sm border-l ${accent.border}`}
          >
            {project.category}
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.tech}
          </span>
        </div>
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-background mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md line-clamp-2">
            {description}
          </p>
          <span className="inline-flex items-center gap-2 font-label-sm text-label-sm text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mt-3">
            {messages.workCard.viewProject}
          </span>
        </div>
      </div>
    </a>
  );
}
