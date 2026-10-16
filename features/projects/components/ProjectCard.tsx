import Image from "next/image";
import type { ProjectProps } from "../data/projectListData";

function resolveImage(value: string): string {
  if (/^https?:\/\//.test(value) || value.startsWith("/")) return value;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/rabin/${value}`;
}

interface ProjectCardProps {
  project: ProjectProps;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasImages = project.images && project.images.length > 0;

  return (
    <div className="group relative w-full rounded-3xl p-px bg-gradient-to-br from-primary-400/60 via-gray-200/60 to-primary-600/40 dark:from-primary-500/40 dark:via-dark-border dark:to-primary-700/30 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative flex flex-col bg-white dark:bg-dark-card/90 rounded-[calc(1.5rem-1px)] border border-gray-100 dark:border-dark-border overflow-hidden h-full">
        <div className="w-full overflow-hidden relative aspect-[4/3] bg-gray-100 dark:bg-dark-bg/50">
          {hasImages && (
            <Image
              src={resolveImage(project.images[0])}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {!hasImages && (
            <div className="w-full h-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-primary-500 to-primary-700">
              <span className="text-5xl font-bold opacity-30">
                {project.name.substring(0, 2).toUpperCase()}
              </span>
              <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
                {project.type}
              </span>
            </div>
          )}

          {/* Bottom gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

          {/* Quick action buttons on hover */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
            {project.urlBtnLinks.map((btn, i) => {
              if (!btn.link) return null;
              const iconName = i === 0 ? "visibility" : "code";
              return (
                <a
                  key={i}
                  href={btn.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-primary-600 text-white flex items-center justify-center transition-transform hover:scale-110 shadow-lg hover:bg-white hover:text-primary-600"
                  title={btn.name}
                >
                  <span className="material-icons text-lg">{iconName}</span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="p-7 flex flex-col gap-3 flex-grow">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {project.name}
              </h2>
              <h3 className="text-[10px] font-semibold text-primary-600 uppercase tracking-wider mt-0.5">
                {project.type}
              </h3>
            </div>
            {project.projectType && (
              <span className="flex-shrink-0 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-primary-100 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300 border border-primary-300/40">
                {project.projectType}
              </span>
            )}
          </div>

          <p className="text-gray-500 dark:text-gray-400 line-clamp-2 text-xs leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {project.technologiesUsed.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 bg-gray-100 dark:bg-dark-bg/80 text-gray-700 dark:text-gray-300 rounded-md text-[9px] font-semibold uppercase tracking-wide border border-gray-200 dark:border-dark-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
