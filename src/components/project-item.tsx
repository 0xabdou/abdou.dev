import {ProjectMeta} from "../lib/projects";
import Link from "next/link";

type ProjectItemProps = {
  project: ProjectMeta
};

const ProjectItem = ({project}: ProjectItemProps) => {
  return (
    <div className="flex bg-white dark:bg-knight rounded h-36 md:h-32">
      <Link href={`/projects/${project.slug}`}>
        <img
          className="w-36 h-36 md:w-32 md:h-32 rounded-l cursor-pointer"
          src={project.logo}
        />
      </Link>
      <div className="flex flex-col p-3 flex-grow w-full">
        <Link href={`/projects/${project.slug}`}>
          <a>
            <h2 className="text-markup-h2 font-bold
              hover:text-mineta-dark dark:hover:text-mineta">
              {project.name}
            </h2>
          </a>
        </Link>
        <p className="line-clamp-3 md:line-clamp-2">
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default ProjectItem;