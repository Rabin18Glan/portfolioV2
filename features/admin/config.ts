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
  /** Single-row resources (hero) render an edit form directly instead of a list */
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
        help: 'Shown on the hero badge, e.g. "Available for new projects".',
      },
      { name: "current_position", label: "Current Position", type: "text" },
      { name: "location", label: "Location", type: "text" },
    ],
    searchKeys: ["status_text", "current_position", "location"],
    orderBy: { column: "created_at", ascending: false },
  },
  {
    key: "projects",
    label: "Projects",
    icon: "folder",
    columns: [
      { key: "name", label: "Name" },
      { key: "project_type", label: "Type" },
      { key: "images", label: "Cover", type: "image" },
      { key: "is_published", label: "Published", type: "boolean" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      {
        name: "project_type",
        label: "Project Type",
        type: "select",
        options: ["", "Personal", "Professional"],
        placeholder: "Select…",
      },
      { name: "type", label: "Category", type: "text", help: "e.g. Chat, Ecommerce Platform" },
      { name: "description", label: "Description", type: "textarea" },
      {
        name: "technologies_used",
        label: "Technologies",
        type: "tags",
        help: "Press Enter to add a technology.",
      },
      {
        name: "images",
        label: "Images",
        type: "images",
        help: "First image is used as the card cover.",
      },
      {
        name: "task_completed",
        label: "Task Completed",
        type: "tags",
        help: "Press Enter to add a task.",
      },
      {
        name: "url_btn_links",
        label: "Button Links",
        type: "links",
        help: "Buttons shown on the project card. The first one uses the eye icon, the rest use the code icon.",
      },
      { name: "sort_order", label: "Sort Order", type: "number" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
    searchKeys: ["name", "type", "description"],
    orderBy: { column: "sort_order", ascending: true },
  },
  {
    key: "services",
    label: "Services",
    icon: "dashboard",
    columns: [
      { key: "title", label: "Title" },
      { key: "skills", label: "Skills", type: "tags" },
      { key: "is_published", label: "Published", type: "boolean" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      {
        name: "skills",
        label: "Skills",
        type: "tags",
        help: "Devicon class names or image URLs.",
      },
      { name: "sort_order", label: "Sort Order", type: "number" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
    searchKeys: ["title"],
    orderBy: { column: "sort_order", ascending: true },
  },
  {
    key: "timeline",
    label: "Timeline",
    icon: "timeline",
    columns: [
      { key: "date", label: "Date" },
      { key: "title", label: "Title" },
      { key: "icon_name", label: "Icon" },
    ],
    fields: [
      { name: "date", label: "Date", type: "text", required: true, placeholder: "2025 January" },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "task_done", label: "Task Done", type: "textarea" },
      { name: "icon_name", label: "Icon Name", type: "text", placeholder: "devicon-react-original" },
      { name: "icon_class", label: "Icon Class", type: "text", placeholder: "text-blue-400" },
      { name: "sort_order", label: "Sort Order", type: "number" },
      { name: "is_published", label: "Published", type: "boolean" },
    ],
    searchKeys: ["title", "date", "task_done"],
    orderBy: { column: "sort_order", ascending: true },
  },
  {
    key: "clients",
    label: "Clients",
    icon: "groups",
    columns: [
      { key: "name", label: "Name" },
      { key: "logo", label: "Logo", type: "image" },
      { key: "url", label: "URL" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "logo", label: "Logo", type: "image" },
      { name: "url", label: "Website URL", type: "text" },
    ],
    searchKeys: ["name", "url"],
  },
  {
    key: "reviews",
    label: "Reviews",
    icon: "star",
    columns: [
      { key: "client_name", label: "Client" },
      { key: "rating", label: "Rating", type: "number" },
      { key: "project_name", label: "Project" },
    ],
    fields: [
      { name: "client_name", label: "Client Name", type: "text", required: true },
      { name: "review_text", label: "Review", type: "textarea", required: true },
      { name: "rating", label: "Rating (1-5)", type: "number" },
      { name: "avatar", label: "Avatar", type: "image" },
      { name: "role", label: "Role", type: "text" },
      { name: "project_name", label: "Project Name", type: "text" },
    ],
    searchKeys: ["client_name", "project_name", "review_text"],
  },
  {
    key: "contacts",
    label: "Contacts",
    icon: "contact_mail",
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
      { name: "url", label: "URL", type: "text", placeholder: "https://… or mailto:…" },
      { name: "icon", label: "Icon", type: "text", placeholder: "material icon name" },
      { name: "sort_order", label: "Sort Order", type: "number" },
      { name: "is_public", label: "Public", type: "boolean" },
    ],
    searchKeys: ["label", "value", "url"],
    orderBy: { column: "sort_order", ascending: true },
  },
  {
    key: "contents",
    label: "Contents",
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
