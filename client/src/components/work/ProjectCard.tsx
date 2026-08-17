import type { ProjectDto } from '@shared/index';
import { useLanguage } from '../../i18n/LanguageContext';
import { resolveProjectImage } from './projectImages';

type AccentStyles = {
  bar: string;
  text: string;
  chip: string;
  hoverShadow: string;
  hoverBorder: string;
  buttonSolid: string;
};

const ACCENT_STYLES: Record<ProjectDto['accent'], AccentStyles> = {
  primary: {
    bar: 'bg-primary',
    text: 'text-primary',
    chip: 'bg-primary/15 border-primary/40 text-primary',
    hoverShadow: 'hover:shadow-primary/25',
    hoverBorder: 'hover:border-primary/40',
    buttonSolid: 'bg-primary text-on-primary',
  },
  secondary: {
    bar: 'bg-secondary',
    text: 'text-secondary',
    chip: 'bg-secondary/15 border-secondary/40 text-secondary',
    hoverShadow: 'hover:shadow-secondary/25',
    hoverBorder: 'hover:border-secondary/40',
    buttonSolid: 'bg-secondary text-on-secondary',
  },
  'inverse-primary': {
    bar: 'bg-inverse-primary',
    text: 'text-inverse-primary',
    chip: 'bg-inverse-primary/15 border-inverse-primary/40 text-inverse-primary',
    hoverShadow: 'hover:shadow-inverse-primary/25',
    hoverBorder: 'hover:border-inverse-primary/40',
    buttonSolid: 'bg-inverse-primary text-white',
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
  const imageSrc = resolveProjectImage(project.title, project.imageUrl);

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface-container/40 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${accent.hoverShadow} ${accent.hoverBorder} ${className}`}
    >
      <div className={`h-1 w-full ${accent.bar}`} />
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          alt={project.alt}
          src={imageSrc}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container/70 via-transparent to-transparent" />
        <span
          className={`absolute top-4 left-4 font-label-sm text-label-sm uppercase tracking-widest px-3 py-1.5 rounded-sm border backdrop-blur-md ${accent.chip}`}
        >
          {project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-gutter">
        <h3 className="font-headline-md text-headline-md text-on-background leading-tight">
          {title}
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          {description}
        </p>
        <div className="mt-auto pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-label-sm text-label-sm uppercase tracking-widest transition-transform duration-300 hover:scale-[1.03] ${accent.buttonSolid}`}
            aria-label={`${messages.workCard.viewGithub} — ${title}`}
          >
            <span className="material-symbols-outlined text-base">code</span>
            {messages.workCard.viewGithub}
          </a>
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-label-sm text-label-sm uppercase tracking-widest border transition-colors duration-300 hover:bg-white/10 ${accent.text}`}
              aria-label={`${messages.workCard.viewDemo} — ${title}`}
            >
              <span className="material-symbols-outlined text-base">open_in_new</span>
              {messages.workCard.viewDemo}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
