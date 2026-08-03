import type { SvgIconComponent } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import BoltIcon from "@mui/icons-material/Bolt";
import FolderIcon from "@mui/icons-material/Folder";
import TimelineIcon from "@mui/icons-material/Timeline";
import GroupsIcon from "@mui/icons-material/Groups";
import StarIcon from "@mui/icons-material/Star";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ArticleIcon from "@mui/icons-material/Article";
import MailIcon from "@mui/icons-material/Mail";

/** Maps the icon names in lib/admin/config.ts to MUI icons. */
export const RESOURCE_ICONS: Record<string, SvgIconComponent> = {
  home: HomeIcon,
  bolt: BoltIcon,
  folder: FolderIcon,
  dashboard: DashboardIcon,
  timeline: TimelineIcon,
  groups: GroupsIcon,
  star: StarIcon,
  contact_mail: ContactMailIcon,
  article: ArticleIcon,
  mail: MailIcon,
};
