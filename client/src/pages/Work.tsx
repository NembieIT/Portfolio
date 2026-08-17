import { useCallback, useEffect, useState } from 'react';
import type { ProjectDto } from '@shared/index';
import ProjectCard from '../components/work/ProjectCard';
import Reveal from '../components/common/Reveal';
import { useLanguage } from '../i18n/LanguageContext';
import { ApiClientError, getProjects } from '../lib/api';

type FetchState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; projects: ProjectDto[] };

export default function Work() {
  const { messages } = useLanguage();
  const [state, setState] = useState<FetchState>({ status: 'loading' });

  const loadProjects = useCallback(() => {
    setState({ status: 'loading' });

    let cancelled = false;

    getProjects()
      .then(({ data }) => {
        if (!cancelled) setState({ status: 'ready', projects: data });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message =
          err instanceof ApiClientError
            ? err.message
            : 'Could not load projects. Please try again.';
        setState({ status: 'error', message });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => loadProjects(), [loadProjects]);

  return (
    <div className="flex flex-col w-full px-margin-desktop py-stack-lg gap-stack-lg">
      <Reveal>
        <div className="w-full flex flex-col gap-stack-md border-b border-white/5 pb-gutter md:flex-row md:items-end md:justify-between md:gap-gutter">
          <div className="flex flex-col gap-4 min-w-0">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.2em] flex items-center gap-4">
              <div className="w-8 h-[1px] bg-primary"></div>
              {messages.workPage.kicker}
            </span>
            <h1 className="font-display-xl text-display-lg-mobile md:text-display-lg xl:text-display-xl text-on-background leading-tight">
              {messages.workPage.heading}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              {messages.workPage.description}
              {state.status === 'ready' ? (
                <span className="font-code-md text-code-md text-primary ml-3">
                  ({messages.workPage.projectCount(state.projects.length)})
                </span>
              ) : null}
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-[0.2em] [writing-mode:vertical-rl] transform rotate-180">
              {messages.workPage.kicker}
            </span>
            <div className="h-16 w-px bg-white/20"></div>
            {state.status === 'ready' ? (
              <span className="font-headline-md text-headline-md text-primary italic">
                {messages.workPage.projectCount(state.projects.length)}
              </span>
            ) : null}
          </div>
        </div>
      </Reveal>

      {state.status === 'error' ? (
        <div className="flex flex-col items-center gap-6 py-stack-lg text-center">
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
            {state.message}
          </p>
          <button
            type="button"
            onClick={loadProjects}
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-[#131313] font-label-sm text-label-sm uppercase tracking-widest hover:scale-105 transition-transform duration-300 rounded-sm"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter relative w-full">
          {state.status === 'ready' ? (
            state.projects.map((project) => (
              <Reveal key={project.id}>
                <ProjectCard project={project} />
              </Reveal>
            ))
          ) : (
            <>
              <WorkCardSkeleton />
              <WorkCardSkeleton />
              <WorkCardSkeleton />
            </>
          )}
        </div>
      )}
    </div>
  );
}

function WorkCardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading projects"
      className="relative w-full rounded-2xl overflow-hidden bg-surface-container/40 border border-white/10 animate-pulse"
    >
      <div className="h-1 w-full bg-surface-container-high"></div>
      <div className="aspect-[16/10] bg-surface-container-high"></div>
      <div className="p-gutter flex flex-col gap-3">
        <div className="w-2/3 h-6 bg-surface-container-high rounded-sm"></div>
        <div className="w-full h-4 bg-surface-container-high rounded-sm"></div>
        <div className="w-3/4 h-4 bg-surface-container-high rounded-sm"></div>
        <div className="w-full h-4 bg-surface-container-high rounded-sm mt-2"></div>
      </div>
    </div>
  );
}
