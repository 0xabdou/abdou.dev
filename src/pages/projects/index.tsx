import Head from "next/head";
import SocialSharePreview from "../../components/social-share-preview";
import {getAllProjects, ProjectMeta} from "../../lib/projects";
import {GetStaticProps} from "next";
import ProjectItem from "../../components/project-item";
import TitleWithDescription from "../../components/title-with-description";

type ProjectsProps = {
  projects: ProjectMeta[]
}

const Projects = ({projects}: ProjectsProps) => {
  const title = "Projects | Abdou Ouahib";
  const description = "Here you can find some of the most relevant projects I've worked on.";
  return (
    <div
      className="flex flex-col space-y-1
        w-full max-w-screen-md text-black: dark:text-white"
    >
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description}
        />
      </Head>
      <SocialSharePreview
        image="/static/images/social-share-preview/projects.png"
        title={title}
        description={description}
      />
      <header>
        <TitleWithDescription title="Projects" description={description}/>
      </header>
      {projects.map(project => (<ProjectItem project={project}/>))}
    </div>
  );
};

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  const projects = getAllProjects().map(p => p.meta);
  return {
    props: {projects}
  };
};

export default Projects;