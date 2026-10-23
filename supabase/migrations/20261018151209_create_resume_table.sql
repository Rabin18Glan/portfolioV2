-- ============================================================================
-- Migration: create_resume_table
-- Purpose:   Schema and initial seed data for the ATS Resume page (/resume)
-- ============================================================================

begin;

create table if not exists public.resume (
  id              bigint primary key generated always as identity,
  name            text not null default 'RABIN GLAN',
  title           text not null default 'Full Stack Developer | Backend Engineer',
  location        text not null default 'Hetauda, Nepal | Open to Remote Opportunities',
  email           text not null default 'robinjsl321@gmail.com',
  phone           text not null default '+977 9840469397',
  linkedin_url    text default 'https://www.linkedin.com/in/rabin-glan-95ba41303/',
  github_url      text default 'https://github.com/Rabin18Glan',
  portfolio_url   text default 'https://rabinglan.com.np',
  summary         text not null,
  skills          jsonb not null default '[]'::jsonb,
  experience      jsonb not null default '[]'::jsonb,
  projects        jsonb not null default '[]'::jsonb,
  education       jsonb not null default '[]'::jsonb,
  additional_info jsonb not null default '[]'::jsonb,
  references_text text default 'Available upon request.',
  is_active       boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Enable RLS
alter table public.resume enable row level security;

-- Public read policy for published active resume
create policy "resume_public_read" on public.resume
  for select
  to anon, authenticated
  using (is_active = true);

-- Grant access
grant select on public.resume to anon, authenticated;
grant all on public.resume to service_role;

-- Seed the initial resume record
insert into public.resume (
  name,
  title,
  location,
  email,
  phone,
  linkedin_url,
  github_url,
  portfolio_url,
  summary,
  skills,
  experience,
  projects,
  education,
  additional_info,
  references_text
) values (
  'RABIN GLAN',
  'Full Stack Developer | Backend Engineer',
  'Hetauda, Nepal | Open to Remote Opportunities',
  'robinjsl321@gmail.com',
  '+977 9840469397',
  'https://www.linkedin.com/in/rabin-glan-95ba41303/',
  'https://github.com/Rabin18Glan',
  'https://rabinglan.com.np',
  'Software Engineer and BSc CSIT graduate with 1–3 years of professional experience across full-stack web development, backend engineering, and application development. Experienced with React, Next.js, Node.js, Express.js, Django, and Flutter, with knowledge of API development, application integration, and modular software architecture.

Focused on building maintainable, reliable, and scalable applications using clean code practices, separation of concerns, and practical software engineering principles. Interested in backend systems, API architecture, cloud-native technologies, and AI-powered application development. Seeking opportunities to contribute to product-focused engineering teams and solve real-world software problems.',
  '[
    {"category": "Programming Languages", "items": "JavaScript, TypeScript, Python, Dart, Rust (learning)"},
    {"category": "Frontend Development", "items": "React.js, Next.js, HTML5, CSS3, Tailwind CSS"},
    {"category": "Backend Development", "items": "Node.js, Express.js, NestJS, Django"},
    {"category": "Mobile Development", "items": "Flutter"},
    {"category": "APIs and Integration", "items": "REST APIs, GraphQL, WebSockets, Webhooks, gRPC"},
    {"category": "Databases", "items": "PostgreSQL, MySQL, MongoDB, Redis"},
    {"category": "DevOps and Infrastructure", "items": "Git, Linux, Docker, Kubernetes, CI/CD fundamentals"},
    {"category": "Software Engineering", "items": "Modular architecture, separation of concerns, SOLID principles, debugging, maintainability, API design"},
    {"category": "AI Application Development", "items": "LLM API integration, structured outputs, tool calling"}
  ]'::jsonb,
  '[
    {
      "company": "Truenary Solutions",
      "role": "Software Developer — Internship and Employment",
      "period": "May 2025 – Present",
      "location": "Kathmandu, Nepal",
      "bullets": [
        "Contribute to software development activities across application development and maintenance.",
        "Work with modern web technologies to implement application features and integrate frontend and backend functionality.",
        "Participate in debugging, troubleshooting, and improving existing application code.",
        "Apply software engineering principles to support code readability, modularity, and maintainability."
      ]
    },
    {
      "company": "Reflext IT Solutions",
      "role": "Software Developer",
      "period": "Oct 2024 – Jan 2025",
      "location": "Remote",
      "bullets": [
        "Participate in the development and maintenance of software applications.",
        "Implement application functionality using relevant frontend and backend technologies.",
        "Work with APIs and application components to support end-to-end feature development.",
        "Troubleshoot technical issues and support ongoing software improvements."
      ]
    },
    {
      "company": "Kutumba Tech",
      "role": "Software Development Intern",
      "period": "Jan 2025 – June 2025",
      "location": "Remote",
      "bullets": [
        "Gain practical experience in software development within a professional working environment.",
        "Support development tasks, application debugging, and implementation of assigned features.",
        "Develop practical understanding of collaborative software development and maintainable coding practices."
      ]
    }
  ]'::jsonb,
  '[
    {
      "title": "Super Decisions",
      "subtitle": "Decision Support and AI-Assisted Application",
      "technologies": "React, TypeScript, Next.js, Python, LLM APIs",
      "url": "https://github.com/Rabin18Glan",
      "bullets": [
        "Work on a decision-support application involving the Analytic Hierarchy Process (AHP), Analytic Network Process (ANP), ratings, and multi-network decision models.",
        "Explore structured approaches to evaluating alternatives and organizing complex decision-making workflows.",
        "Work on AI Copilot functionality intended to support users through natural-language interaction with decision-related tasks."
      ]
    },
    {
      "title": "RoutineHub (Habbit)",
      "subtitle": "Routine and Task Management Mobile Application",
      "technologies": "Flutter, Dart, Hive",
      "url": "https://github.com/Rabin18Glan",
      "bullets": [
        "Develop a mobile application for organizing personal routines and everyday tasks.",
        "Use Flutter for cross-platform mobile application development.",
        "Use Hive for local data persistence, supporting offline functionality without requiring mandatory account creation."
      ]
    }
  ]'::jsonb,
  '[
    {
      "degree": "Bachelor of Science in Computer Science and Information Technology (BSc CSIT)",
      "institution": "Hetauda City College, Nepal",
      "period": "2021 – 2025",
      "details": "Affiliated with Tribhuvan University"
    }
  ]'::jsonb,
  '[
    "Interested in backend engineering, API development, and scalable application architecture.",
    "Continuously developing skills in Rust and modern systems programming.",
    "Interested in AI integration and cloud-native software development.",
    "Open to remote and international software engineering opportunities."
  ]'::jsonb,
  'Available upon request.'
);

commit;
