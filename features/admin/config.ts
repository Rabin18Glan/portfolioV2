/**
 * Admin resource definitions.
 *
 * One entry per database table that the admin panel manages. Each entry drives
 * the sidebar navigation, the list table columns, the create/edit form fields
 * and the API route field whitelist — so adding/removing a field is a one-line
 * change here.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "image" // single image/file upload -> storage path or URL
  | "images" // list of image uploads -> array of paths/URLs
  | "tags" // array of short strings
  | "links" // repeatable [{ name, link }] buttons
  | "json"; // jsonb value (object or array)

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[]; // for select
  placeholder?: string;
  help?: string;
  bucket?: string; // storage bucket for image/image uploads (default "rabin")
}

export interface ColumnConfig {
  key: string;
  label: string;
  type?: "text" | "image" | "tags" | "boolean" | "number" | "datetime";
}

export interface ResourceConfig {
  /** Supabase table name */
  key: string;
  /** Human label used in sidebar/header */
  label: string;
  /** Material icon name for the sidebar */
  icon: string;
  /** Single-row resources (hero, resume) render an edit form directly instead of a list */
  single?: boolean;
  /** Read-only resources (messages) cannot be created/edited, only deleted */
  readonly?: boolean;
  columns: ColumnConfig[];
  fields: FieldConfig[];
  /** Columns the header search filters over */
  searchKeys?: string[];
  /** Ordering applied to list queries */
  orderBy?: { column: string; ascending?: boolean };
}

export const RESOURCES: ResourceConfig[] = [
  {
    key: "hero",
    label: "Hero",
    icon: "home",
    single: true,
    columns: [
      { key: "name", label: "Name" },
      { key: "title", label: "Title" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      {
        name: "profile_image",
        label: "Profile Image",
        type: "image",
        bucket: "rabin",
        help: "Shown in the hero. Uploaded to the 'rabin' bucket.",
      },
      {
        name: "cv_url",
        label: "CV (PDF)",
        type: "image",
        bucket: "rabin",
        help: "Upload your CV PDF — it is stored in the 'rabin' bucket.",
      },
    ],
    searchKeys: ["name", "title"],
  },
  {
    key: "resume",
    label: "Resume (ATS)",
    icon: "description",
    single: true,
    columns: [
      { key: "name", label: "Name" },
      { key: "title", label: "Title" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "location", label: "Location", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "linkedin_url", label: "LinkedIn URL", type: "text" },
      { name: "github_url", label: "GitHub URL", type: "text" },
      { name: "portfolio_url", label: "Portfolio URL", type: "text" },
      { name: "summary", label: "Professional Summary", type: "textarea", required: true },
      { name: "skills", label: "Skills (JSON)", type: "json" },
      { name: "experience", label: "Experience (JSON)", type: "json" },
      { name: "projects", label: "Projects (JSON)", type: "json" },
      { name: "education", label: "Education (JSON)", type: "json" },
      { name: "additional_info", label: "Additional Info (JSON)", type: "json" },
      { name: "references_text", label: "References Text", type: "text" },
      { name: "is_active", label: "Active", type: "boolean" },
    ],
    searchKeys: ["name", "title"],
  },
  {
    key: "status",
    label: "Status",
    icon: "bolt",
    columns: [
      { key: "status_type", label: "Type" },
      { key: "status_text", label: "Status Text" },
      { key: "location", label: "Location" },
    ],
    fields: [
      {
        name: "status_type",
        label: "Availability",
        type: "select",
        required: true,
        options: ["available", "focus", "busy", "offline", "hiring"],
      },
      {
        name: "status_text",
        label: "Status Text",
        type: "text",
        required: true,
      },
      { name: "location", label: "Location", type: "text" },
      {
        name: "badge_text",
        label: "Hero Badge Text",
        type: "text",
        help: 'Shown on the hero badge, e.g. "Available for new projects".',
      },
      {
        name: "is_active",
        label: "Active",
        type: "boolean",
        help: "Only the latest active row is displayed.",
      },
    ],
    searchKeys: ["status_type", "status_text", "location"],
    orderBy: { column: "created_at", ascending: false },
  },
  {
    key: "timeline",
    label: "Timeline",
    icon: "timeline",
    columns: [
      { key: "date", label: "Date" },
      { key: "title", label: "Title" },
      { key: "is_published", label: "Published", type: "boolean" },
    ],
    fields: [
      { name: "date", label: "Date / Period", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "task_done", label: "Task Done", type: "textarea" },
      {
        name: "icon_name",
        label: "Devicon Name",
        type: "text",
        placeholder: "devicon-react-original",
        help: "CSS class from devicon library, e.g. 'devicon-react-original'.",
      },
      {
        name: "icon_class",
        label: "Icon Color Class",
        type: "text",
        placeholder: "text-blue-500",
        help: "Tailwind color class for the icon, e.g. 'text-blue-500'.",
      },
      { name: "sort_order", label: "Sort Order", type: "number" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
    searchKeys: ["title", "task_done", "date"],
    orderBy: { column: "sort_order", ascending: true },
  },
  {
    key: "services",
    label: "Services",
    icon: "build",
    columns: [
      { key: "title", label: "Title" },
      { key: "skills", label: "Skills", type: "tags" },
      { key: "is_published", label: "Published", type: "boolean" },
    ],
    fields: [
      { name: "title", label: "Service Title", type: "text", required: true },
      {
        name: "skills",
        label: "Skills / Tools",
        type: "tags",
        help: "Press Enter or comma to add each skill.",
      },
      { name: "sort_order", label: "Sort Order", type: "number" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
    searchKeys: ["title"],
    orderBy: { column: "sort_order", ascending: true },
  },
  {
    key: "projects",
    label: "Projects",
    icon: "folder",
    columns: [
      { key: "name", label: "Name" },
      { key: "type", label: "Category" },
      { key: "project_type", label: "Type" },
      { key: "is_published", label: "Published", type: "boolean" },
    ],
    fields: [
      { name: "name", label: "Project Name", type: "text", required: true },
      {
        name: "type",
        label: "Category / Stack",
        type: "text",
        required: true,
        placeholder: "e.g. Next.js, AI, Full Stack",
      },
      {
        name: "project_type",
        label: "Project Type",
        type: "select",
        options: ["Personal", "Professional", "Client", "Open Source"],
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
      },
      {
        name: "technologies_used",
        label: "Technologies",
        type: "tags",
        help: "Tag technologies used (Enter to add).",
      },
      {
        name: "task_completed",
        label: "Tasks Completed",
        type: "tags",
        help: "Bullet points for completed milestones.",
      },
      {
        name: "images",
        label: "Screenshots",
        type: "images",
        bucket: "rabin",
        help: "Upload one or more screenshots to the 'rabin' bucket.",
      },
      {
        name: "url_btn_links",
        label: "External Links",
        type: "links",
        help: "Action buttons (e.g. 'Live Demo', 'GitHub').",
      },
      { name: "sort_order", label: "Sort Order", type: "number" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
    searchKeys: ["name", "type", "description"],
    orderBy: { column: "sort_order", ascending: true },
  },
  {
    key: "clients",
    label: "Clients",
    icon: "business",
    columns: [
      { key: "name", label: "Name" },
      { key: "logo", label: "Logo", type: "image" },
      { key: "url", label: "Website" },
    ],
    fields: [
      { name: "name", label: "Client Name", type: "text", required: true },
      {
        name: "logo",
        label: "Client Logo",
        type: "image",
        bucket: "rabin",
        help: "Uploaded to the 'rabin' bucket.",
      },
      { name: "url", label: "Website URL", type: "text" },
    ],
    searchKeys: ["name", "url"],
  },
  {
    key: "reviews",
    label: "Testimonials",
    icon: "rate_review",
    columns: [
      { key: "client_name", label: "Client" },
      { key: "role", label: "Role" },
      { key: "rating", label: "Rating", type: "number" },
    ],
    fields: [
      { name: "client_name", label: "Client Name", type: "text", required: true },
      { name: "role", label: "Role / Company", type: "text" },
      { name: "project_name", label: "Project", type: "text" },
      { name: "rating", label: "Rating (1-5)", type: "number" },
      {
        name: "avatar",
        label: "Avatar Image",
        type: "image",
        bucket: "rabin",
        help: "Client portrait (uploaded to 'rabin' bucket).",
      },
      {
        name: "review_text",
        label: "Review Text",
        type: "textarea",
        required: true,
      },
    ],
    searchKeys: ["client_name", "role", "review_text"],
  },
  {
    key: "contacts",
    label: "Contacts",
    icon: "contacts",
    columns: [
      { key: "contact_type", label: "Type" },
      { key: "label", label: "Label" },
      { key: "value", label: "Value" },
      { key: "is_public", label: "Public", type: "boolean" },
    ],
    fields: [
      {
        name: "contact_type",
        label: "Contact Type",
        type: "select",
        required: true,
        options: [
          "email",
          "phone",
          "location",
          "github",
          "linkedin",
          "facebook",
          "upwork",
          "website",
          "twitter",
          "instagram",
          "whatsapp",
          "telegram",
          "youtube",
          "other",
        ],
      },
      { name: "label", label: "Label", type: "text", required: true },
      { name: "value", label: "Value", type: "text", required: true },
      { name: "url", label: "URL / Link Target", type: "text" },
      {
        name: "icon",
        label: "Icon Name",
        type: "text",
        placeholder: "email, phone, github...",
      },
      { name: "sort_order", label: "Sort Order", type: "number" },
      { name: "is_public", label: "Publicly Visible", type: "boolean" },
    ],
    searchKeys: ["label", "value", "contact_type"],
    orderBy: { column: "sort_order", ascending: true },
  },
  {
    key: "contents",
    label: "Site Content",
    icon: "article",
    columns: [
      { key: "section", label: "Section" },
      { key: "title", label: "Title" },
      { key: "is_published", label: "Published", type: "boolean" },
    ],
    fields: [
      {
        name: "section",
        label: "Section",
        type: "select",
        required: true,
        options: ["hero", "about", "footer", "privacy", "terms", "general"],
      },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "body", label: "Body", type: "textarea" },
      { name: "image_url", label: "Image", type: "image" },
      { name: "metadata", label: "Metadata", type: "json", help: "Optional JSON object." },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
    searchKeys: ["section", "title", "body"],
  },
  {
    key: "messages",
    label: "Messages",
    icon: "mail",
    readonly: true,
    columns: [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "message", label: "Message" },
      { key: "created_at", label: "Received", type: "datetime" },
    ],
    fields: [],
    searchKeys: ["name", "email", "message"],
    orderBy: { column: "created_at", ascending: false },
  },
];

/** Lookup helper for dynamic [resource] routes. */
export function getResource(key: string): ResourceConfig | undefined {
  return RESOURCES.find((r) => r.key === key);
}

/** Column names a route handler may read/write for a given resource. */
export function getFieldNames(resource: ResourceConfig): string[] {
  return resource.fields.map((f) => f.name);
}
