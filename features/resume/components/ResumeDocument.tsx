import type { ResumeData } from "@/lib/data/resume-data";

interface ResumeDocumentProps {
  resume: ResumeData;
}

export default function ResumeDocument({ resume }: ResumeDocumentProps) {
  // Ensure array structures even if raw JSON from DB has slight variations
  const skills = Array.isArray(resume.skills) ? resume.skills : [];
  const experience = Array.isArray(resume.experience) ? resume.experience : [];
  const projects = Array.isArray(resume.projects) ? resume.projects : [];
  const education = Array.isArray(resume.education) ? resume.education : [];
  const additionalInfo = Array.isArray(resume.additional_info)
    ? resume.additional_info
    : [];

  return (
    <article
      id="resume-document"
      className="bg-white text-gray-900 mx-auto w-full max-w-[850px] p-8 md:p-14 shadow-xl border border-gray-200 print:border-none print:shadow-none print:p-0 print:max-w-none text-left select-text"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        lineHeight: 1.5,
      }}
    >
      {/* ── HEADER ── */}
      <header className="mb-6 pb-4 border-b-2 border-gray-800">
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-gray-950 mb-1">
          {resume.name}
        </h1>
        <p className="text-sm md:text-base font-bold text-gray-700 tracking-wide mb-2.5">
          {resume.title}
        </p>
        <p className="text-xs text-gray-600 mb-2">
          {resume.location}
        </p>

        {/* Contact Links */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-700">
          {resume.email && (
            <span>
              <strong className="text-gray-900 font-semibold">Email:</strong>{" "}
              <a
                href={`mailto:${resume.email}`}
                className="text-primary-700 hover:underline"
              >
                {resume.email}
              </a>
            </span>
          )}
          {resume.phone && (
            <>
              <span className="text-gray-400">|</span>
              <span>
                <strong className="text-gray-900 font-semibold">Phone:</strong>{" "}
                <a
                  href={`tel:${resume.phone}`}
                  className="text-primary-700 hover:underline"
                >
                  {resume.phone}
                </a>
              </span>
            </>
          )}
          {resume.linkedin_url && (
            <>
              <span className="text-gray-400">|</span>
              <span>
                <a
                  href={resume.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-700 hover:underline font-medium"
                >
                  LinkedIn
                </a>
              </span>
            </>
          )}
          {resume.github_url && (
            <>
              <span className="text-gray-400">|</span>
              <span>
                <a
                  href={resume.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-700 hover:underline font-medium"
                >
                  GitHub
                </a>
              </span>
            </>
          )}
          {resume.portfolio_url && (
            <>
              <span className="text-gray-400">|</span>
              <span>
                <a
                  href={resume.portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-700 hover:underline font-medium"
                >
                  Portfolio
                </a>
              </span>
            </>
          )}
        </div>
      </header>

      {/* ── PROFESSIONAL SUMMARY ── */}
      <section className="mb-6">
        <h2 className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-1 mb-2.5">
          Professional Summary
        </h2>
        <div className="space-y-2 text-xs md:text-[13px] text-gray-800 leading-relaxed font-normal">
          {resume.summary.split("\n\n").map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </section>

      {/* ── TECHNICAL SKILLS ── */}
      <section className="mb-6">
        <h2 className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-1 mb-2.5">
          Technical Skills
        </h2>
        <div className="space-y-1.5 text-xs md:text-[13px] text-gray-800 leading-snug">
          {skills.map((skill, idx) => (
            <p key={idx}>
              <strong className="font-bold text-gray-950">
                {skill.category}:
              </strong>{" "}
              <span className="text-gray-800">{skill.items}</span>
            </p>
          ))}
        </div>
      </section>

      {/* ── PROFESSIONAL EXPERIENCE ── */}
      <section className="mb-6">
        <h2 className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-1 mb-3">
          Professional Experience
        </h2>
        <div className="space-y-4">
          {experience.map((exp, idx) => (
            <div key={idx} className="experience-item">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-0.5">
                <h3 className="font-bold text-gray-950 text-sm">
                  {exp.company}
                </h3>
                <span className="text-xs text-gray-600 font-medium">
                  {exp.period}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs text-gray-700 font-semibold mb-1.5">
                <span>{exp.role}</span>
                {exp.location && (
                  <span className="text-xs text-gray-500 font-normal">
                    {exp.location}
                  </span>
                )}
              </div>
              <ul className="list-disc list-outside ml-4 space-y-1 text-xs md:text-[12.5px] text-gray-800 leading-relaxed">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── SELECTED PROJECTS ── */}
      <section className="mb-6">
        <h2 className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-1 mb-3">
          Selected Projects
        </h2>
        <div className="space-y-4">
          {projects.map((proj, idx) => (
            <div key={idx} className="project-item">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-0.5">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-bold text-gray-950 text-sm">
                    {proj.title}
                  </h3>
                  {proj.subtitle && (
                    <span className="text-xs text-gray-600 font-medium">
                      — {proj.subtitle}
                    </span>
                  )}
                </div>
                {proj.url && (
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary-700 hover:underline font-medium"
                  >
                    View Project
                  </a>
                )}
              </div>
              {proj.technologies && (
                <p className="text-xs text-gray-700 mb-1.5">
                  <strong className="font-semibold text-gray-900">
                    Technologies:
                  </strong>{" "}
                  {proj.technologies}
                </p>
              )}
              <ul className="list-disc list-outside ml-4 space-y-1 text-xs md:text-[12.5px] text-gray-800 leading-relaxed">
                {proj.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section className="mb-6">
        <h2 className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-1 mb-2.5">
          Education
        </h2>
        <div className="space-y-2.5">
          {education.map((edu, idx) => (
            <div key={idx}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <h3 className="font-bold text-gray-950 text-xs md:text-sm">
                  {edu.degree}
                </h3>
                <span className="text-xs text-gray-600 font-medium">
                  {edu.period}
                </span>
              </div>
              <p className="text-xs text-gray-700">
                {edu.institution}
                {edu.details ? ` (${edu.details})` : ""}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ADDITIONAL INFORMATION ── */}
      {additionalInfo.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-1 mb-2">
            Additional Information
          </h2>
          <ul className="list-disc list-outside ml-4 space-y-1 text-xs md:text-[12.5px] text-gray-800 leading-relaxed">
            {additionalInfo.map((info, idx) => (
              <li key={idx}>{info}</li>
            ))}
          </ul>
        </section>
      )}

      {/* ── REFERENCES ── */}
      <section>
        <h2 className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-1 mb-1.5">
          References
        </h2>
        <p className="text-xs text-gray-700">{resume.references_text}</p>
      </section>
    </article>
  );
}
