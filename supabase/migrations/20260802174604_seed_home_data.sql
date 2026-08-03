-- ============================================================================
-- Migration: seed_home_data
-- Purpose:   Seed the portfolio home page with the data previously hardcoded
--            in features/home/components/* (hero, status, projects, services,
--            timeline, clients, reviews) plus the new contacts/contents data.
--
-- Idempotent: safe to run once; uses explicit ids so rows are predictable.
-- ============================================================================

begin;

-- ---------------------------------------------------------------------------
-- hero (single row) — mirrors the default in app/api/hero/route.ts
-- ---------------------------------------------------------------------------
insert into public.hero (name, title, description, cv_url) values
(
  'Rabin Glan',
  'Full Stack Developer',
  '"Join me on this digital odyssey, where creativity meets functionality, and every project is a testament to my commitment to excellence. Let''s build something extraordinary together!"',
  -- TODO: replace with your Supabase storage public URL, e.g.
  -- 'https://<project-ref>.supabase.co/storage/v1/object/public/rabin/cv.pdf'
  '/cv.pdf'
);

-- ---------------------------------------------------------------------------
-- status — latest row wins (app reads created_at desc limit 1)
-- ---------------------------------------------------------------------------
insert into public.status (status_type, status_text, current_position, location) values
(
  'available',
  'Available for new projects & full-time roles',
  'Full Stack Developer at Truenary Solutions',
  'Hetauda, Nepal'
);

-- ---------------------------------------------------------------------------
-- projects — transcribed from features/home/components/projects/data/projectListData.ts
-- ---------------------------------------------------------------------------
insert into public.projects
  (id, project_type, name, type, technologies_used, images, description, task_completed, url_btn_links)
values
(
  1, 'Personal', 'Chat app', 'Chat',
  array['react', 'node', 'mongodb', 'express', 'tailwind'],
  array['/chat.png'],
  'This is a simple chat app build using React, Node/Express and MongoDB. This project is for learning React and Socket.io',
  array['frontend development with React', 'backend with Node/Express', 'client side and server side validations', 'Sockect.io connection between client and server'],
  '[{"name":"View Code","link":"https://github.com/Rabin18Glan/MERN-simple-chat-app"},{"name":"More Info","link":""}]'::jsonb
),
(
  2, 'Personal', 'Maruni Suppliers', 'Ecommerce Platform',
  array['react', 'laravel', 'mysql', 'tailwind', 'php', 'javascript'],
  array['/react-laravel.png'],
  'This is the ecommerce website ',
  array['frontend development with react', 'backend with laravel'],
  '[{"name":"View Code","link":"https://github.com/Rabin18Glan/react-laravel-ecom-project"},{"name":"More Info","link":""}]'::jsonb
),
(
  3, '', 'Laliguras Bee Farm', 'Ecommerce Platform',
  array['next', 'react', 'tailwind'],
  array['/laliguras.png'],
  'This is the ecommerce website for buying Honey ',
  array['frontend development with next', 'backend with next'],
  '[{"name":"View Code","link":"https://github.com/Rabin18Glan/laliguras"},{"name":"Visit Site","link":"https://rabin18glan.github.io/laliguras/"}]'::jsonb
),
(
  4, 'Professional', 'SmartCare Academy', 'WordPress Site',
  array['WordPress', 'PHP', 'CSS', 'MySQL'],
  array['smartcare.png'],
  'An educational platform built on WordPress for SmartCare Academy.',
  array['Full site development', 'Theme customization', 'Plugin integration'],
  '[{"name":"Visit Site","link":"https://smartcareacademy.com/"}]'::jsonb
),
(
  5, 'Professional', 'HireLibra', 'Full Stack Web App',
  array['React', 'Python', 'Django', 'PostgreSQL', 'AWS', 'Docker'],
  array['hirelibra.png'],
  'A comprehensive hiring portal for candidates and recruiters.',
  array['Full stack development', 'DevOps & Deployment', 'Backend API architecture'],
  '[{"name":"Visit Site","link":"https://hirelibra.com/"}]'::jsonb
),
(
  6, 'Professional', 'Royal Vision', 'WordPress Site Redesign',
  array['WordPress', 'Elementor', 'CSS', 'PHP'],
  array['royalvision.png'],
  'Redesigned the corporate website for Royal Vision to enhance user experience.',
  array['Website Redesign', 'Performance Optimization', 'SEO Improvements'],
  '[{"name":"Visit Site","link":"https://royalvision.ae/"}]'::jsonb
),
(
  7, 'Professional', 'OneFork', 'Website Maintenance',
  array['Web Technologies', 'Maintenance', 'Support'],
  array['onefork.png'],
  'Ongoing maintenance and support for OneFork''s digital presence.',
  array['Regular updates', 'Content management', 'Performance monitoring'],
  '[{"name":"Visit Site","link":"https://onefork.com.au/"}]'::jsonb
),
(
  8, 'Professional', 'SmartBrains Academy', 'Website Maintenance',
  array['WordPress', 'PHP', 'Maintenance'],
  array['smartbrains.png'],
  'Technical maintenance and support for SmartBrains Academy.',
  array['Bug fixes', 'Security updates', 'Site reliability'],
  '[{"name":"Visit Site","link":"https://smartbrainsacademy.com/"}]'::jsonb
),
(
  9, 'Professional', 'ADO International Transport', 'Web Application',
  array['React', 'Web Technologies', 'Bug Fixes'],
  array['ado.png'],
  'Maintenance and feature enhancements for the ADO International Transport application.',
  array['Bug fixes', 'New feature implementation', 'Code optimization'],
  '[{"name":"Visit Site","link":"https://app.adointernationaltransport.com/"}]'::jsonb
),
(
  10, 'Professional', 'OmniSubmissions', 'Talent & Director Dashboard',
  array['React', 'Dashboard', 'Management System'],
  array['omnisubmission.png'],
  'Worked on the dashboard for talents and directors, enhancing the submission and management workflow.',
  array['Dashboard development', 'Role-based features', 'UI/UX enhancements'],
  '[{"name":"Visit Site","link":"https://www.omnisubmissions.com/"}]'::jsonb
),
(
  11, 'Professional', 'Gahana Stores', 'Website Maintenance',
  array['E-commerce', 'Maintenance', 'Support'],
  array['gahanastores.png'],
  'Ongoing maintenance and support for Gahana Stores, ensuring a smooth e-commerce experience.',
  array['Security updates', 'Performance optimization', 'Content updates'],
  '[{"name":"Visit Site","link":"https://gahanastores.com/"}]'::jsonb
),
(
  12, 'Professional', 'Kinyoapp', 'SaaS Platform (Backend & DevOps)',
  array['Microservices', 'GraphQL', 'Apollo Router', 'Express', 'Drizzle', 'MySQL', 'Kubernetes', 'Docker', 'Fission', 'cdk8s'],
  array['nyauli.png'],
  'Architected the backend and managed DevOps for a SaaS restaurant platform. Implemented a scalable microservices architecture using GraphQL Federation with Apollo Router and handled cloud orchestration via Kubernetes and Fission (Serverless).',
  array['Backend Microservices Development', 'GraphQL Federation & Apollo Router', 'Infrastructure as Code (cdk8s)', 'Database Management (Drizzle/MySQL)', 'Kubernetes Cluster & Fission Deployment'],
  '[{"name":"Business Dashboard","link":"https://business.dev.retack.ai/"},{"name":"Storefront Demo","link":"https://truenaryrest-35ff.kinyoapp.com/"}]'::jsonb
);

select setval(pg_get_serial_sequence('public.projects', 'id'), (select max(id) from public.projects));

-- ---------------------------------------------------------------------------
-- services — transcribed from features/home/components/services/data/ServicesData.ts
-- ---------------------------------------------------------------------------
insert into public.services (id, title, skills, sort_order) values
(
  1, 'Mobile Development',
  array['devicon-flutter-plain colored', 'devicon-react-original colored'],
  1
),
(
  2, 'Frontend Development',
  array[
    'devicon-html5-plain colored',
    'devicon-css3-plain colored',
    'devicon-javascript-plain colored',
    'devicon-bootstrap-plain colored',
    'devicon-tailwindcss-plain colored',
    'devicon-react-original colored',
    'devicon-materialui-plain colored',
    'devicon-nextjs-plain colored'
  ],
  2
),
(
  3, 'Backend Development',
  array[
    'devicon-nodejs-plain colored',
    'devicon-express-original-wordmark colored',
    'devicon-mongodb-plain colored',
    'devicon-mysql-plain colored',
    'devicon-laravel-plain colored',
    'devicon-django-plain colored'
  ],
  3
),
(
  4, 'DevOps & AI',
  array[
    'devicon-graphql-plain colored',
    'devicon-docker-plain colored',
    'devicon-git-plain colored',
    'devicon-linux-plain colored',
    'devicon-amazonwebservices-plain-wordmark colored',
    'https://avatars.githubusercontent.com/u/126733545?s=200&v=4'
  ],
  4
);

select setval(pg_get_serial_sequence('public.services', 'id'), (select max(id) from public.services));

-- ---------------------------------------------------------------------------
-- timeline — transcribed from features/home/components/timeline/data/timeline.tsx
-- ---------------------------------------------------------------------------
insert into public.timeline (id, date, title, task_done, icon_name, icon_class, sort_order) values
(1,  '2022 January',         'Started Coding',                      'Started to learn C and C++ programming', 'devicon-cplusplus-plain',   'text-blue-600', 1),
(2,  '2022 April',           'Started Web Development',             'First I learn HTML, CSS and Javascript and Jumped into React', 'devicon-html5-plain', 'text-orange-600', 2),
(3,  '2023 January',         'Started Doing own Projects',          'Using React I started building some simple projects', 'devicon-react-original', 'text-blue-400', 3),
(4,  '2023 May',             'Started Doing Flutter',               'Dark, Flutter with Getx, MVVM architecture, etc', 'devicon-flutter-plain', 'text-cyan-500', 4),
(5,  '2023 October',         'Started Backend with Node Js',        'Learn backend concepts and databases', 'devicon-nodejs-plain', 'text-green-600', 5),
(6,  '2024 February',        'Started Laravel Development',         'Learn backend concepts and databases', 'devicon-laravel-plain', 'text-red-600', 6),
(7,  '2024 August',          'Started Next.js',                     'Learned Full Stack Development with Next, AuthNext, Server side rendering, etc', 'devicon-nextjs-plain', 'text-black dark:text-white', 7),
(8,  '2025 Jan - June',      'First Internship - Kutumba Tech',     'Remote internship as Frontend & Mobile App Developer. Learned ASP.NET, Design Patterns, and worked on real-world Flutter (Cinema App, Health Platform) and React projects.', 'devicon-flutter-plain', 'text-cyan-500', 8),
(9,  '2025 May - Aug',       'Full Stack Internship - Truenary Solutions', 'Onsite internship learning GraphQL, Serverless, Kubernetes, Microservices, and Multi-tenant apps. Worked on restaurant platforms and RAG applications.', 'devicon-graphql-plain', 'text-pink-600', 9),
(10, '2025 Aug - Present',   'Full Stack Developer - Truenary Solutions', 'Transitioned to a full-time role, continuing to build and scale complex applications with modern web and cloud technologies.', 'devicon-docker-plain', 'text-blue-500', 10),
(11, '2025 August - Present', 'Remote Full Stack & WP Developer - US TechWorks Global', 'Contributing part-time as a Full Stack and WordPress Developer, managing various digital solutions in a remote global environment.', 'devicon-wordpress-plain', 'text-blue-400', 11),
(12, '2025 October',         'The Rust Journey',                    'Started learning Rust to build scalable, safe, and stable backend systems. Currently mastering memory safety and performance concepts.', 'devicon-rust-original', 'text-orange-700 dark:text-orange-500', 12);

select setval(pg_get_serial_sequence('public.timeline', 'id'), (select max(id) from public.timeline));

-- ---------------------------------------------------------------------------
-- clients — mirrors the default in app/api/clients/route.ts
-- ---------------------------------------------------------------------------
insert into public.clients (id, name, logo, url) values
(1, 'Kutumba Tech',       'https://avatars.githubusercontent.com/u/126733545?s=200&v=4', 'https://kutumbatech.com'),
(2, 'Truenary Solutions', 'https://truenaryrest-35ff.kinyoapp.com/assets/favicon.ico',      'https://truenary.com'),
(3, 'US TechWorks Global', '',                                                            'https://ustechworks.com');

select setval(pg_get_serial_sequence('public.clients', 'id'), (select max(id) from public.clients));

-- ---------------------------------------------------------------------------
-- reviews — mirrors the default in app/api/reviews/route.ts
-- ---------------------------------------------------------------------------
insert into public.reviews (id, client_name, review_text, rating, avatar, role, project_name) values
(
  1,
  'Kutumba Tech Team',
  'Rabin showed exceptional performance during his Flutter internship, delivering high-quality user interfaces and adapting rapidly to new technology stacks.',
  5, '', 'Engineering Supervisor', 'Cinema and Health Apps'
),
(
  2,
  'Truenary Solutions Team',
  'Outstanding work on GraphQL Federation, microservices, and Kubernetes orchestration. Rabin''s technical depth as a full stack developer is highly impressive.',
  5, '', 'Tech Lead', 'Kinyoapp SaaS Platform'
);

select setval(pg_get_serial_sequence('public.reviews', 'id'), (select max(id) from public.reviews));

-- ---------------------------------------------------------------------------
-- contacts — typed contact entries (email, facebook, github, ...)
-- Values gathered from ContactInfo.tsx and Footer.tsx
-- ---------------------------------------------------------------------------
insert into public.contacts (contact_type, label, value, url, icon, sort_order, is_public) values
('email',    'Email',    'robinjsl321@gmail.com', 'mailto:robinjsl321@gmail.com',                                        'email',     1, true),
('phone',    'Phone',    '+977 9840469397',       'tel:+9779840469397',                                                  'phone',     2, true),
('location', 'Location', 'Hetauda, Nepal',        'https://www.google.com/maps/search/Hetauda+Nepal',                    'location',  3, true),
('github',   'GitHub',   'Rabin18Glan',           'https://github.com/Rabin18Glan',                                      'github',    4, true),
('linkedin', 'LinkedIn', 'Rabin Glan',            'https://www.linkedin.com/in/rabin-glan-95ba41303/',                   'linkedin',  5, true),
('upwork',   'Upwork',   'Rabin Glan',            'https://www.upwork.com/freelancers/~01593d9f2913e8f562',              'upwork',    6, true),
('facebook', 'Facebook', 'Rabin Glan',            'https://www.facebook.com/profile.php?id=61551905339042',              'facebook',  7, true);

-- ---------------------------------------------------------------------------
-- contents — CMS sections for hero, about and footer.
-- Hero mirrors the `hero` table (kept for backward compatibility until the
-- API routes are refactored to read from `contents`).
-- ---------------------------------------------------------------------------
insert into public.contents (section, title, subtitle, body, image_url, metadata) values
(
  'hero',
  'Hero',
  'Full Stack Developer',
  '"Join me on this digital odyssey, where creativity meets functionality, and every project is a testament to my commitment to excellence. Let''s build something extraordinary together!"',
  '/profile.png',
  '{"name":"Rabin Glan","title":"Full Stack Developer","cv_url":"/cv.pdf"}'::jsonb
),
(
  'about',
  'About Me',
  'A short introduction',
  'I''m a developer studying Computer Science and IT, blending tech expertise with a musical touch for a harmonious approach to problem-solving.

Join me on this epic quest through the binary jungles and digital dungeons!',
  NULL,
  '{}'::jsonb
),
(
  'footer',
  'Footer',
  'Tagline',
  'Crafting high-performance digital experiences with a focus on clean architecture, scalability, and user-centric design. Let''s build the future together.',
  NULL,
  '{}'::jsonb
);

commit;
