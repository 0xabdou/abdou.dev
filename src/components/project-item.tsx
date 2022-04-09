import Link from "next/link";
import { ProjectMeta } from "../lib/projects";

type ProjectItemProps = {
  project: ProjectMeta;
};

const ProjectItem = ({ project }: ProjectItemProps) => {
  return (
    <div className="flex items-center bg-white dark:bg-knight rounded h-36">
      <Link href={`/projects/${project.slug}`}>
        <img
          className="w-32 h-36 sm:w-36 rounded-l cursor-pointer object-cover"
          src={project.logo}
          alt="Project logo"
          width="150"
          height="150"
        />
      </Link>
      <div className="flex flex-col p-3 grow w-full">
        <Link href={`/projects/${project.slug}`}>
          <a>
            <h2
              className="text-markup-h3 sm:text-markup-h2 font-bold line-clamp-1
              hover:text-mineta-dark dark:hover:text-mineta"
            >
              {project.name}
            </h2>
          </a>
        </Link>
        <p className="line-clamp-3">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectItem;
