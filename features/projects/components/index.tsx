import ProjectList from "./ProjectList";
import type { ProjectProps } from "../data/projectListData";

interface ProjectsProps {
  projects?: ProjectProps[];
}

function Projects({ projects = [] }: ProjectsProps) {
  return <ProjectList initialProjects={projects} />;
}

export default Projects;
