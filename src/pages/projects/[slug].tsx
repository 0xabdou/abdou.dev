import {getAllProjects, Project} from "../../lib/projects";
import {GetStaticPaths, GetStaticProps} from "next";
import MarkdownArticle from "../../components/markdown-article";
import HeaderLink from "../../components/header-link";
import Head from "next/head";
import SocialSharePreview from "../../components/social-share-preview";
import Image from "next/image";

type ProjectPageProps = {
  project: Project
};

const ProjectPage = ({project}: ProjectPageProps) => {
  return (
    <div className="flex flex-col w-full max-w-full md:max-w-2xl lg:max-w-screen-md
      md:mx-4 mb-52 bg-white dark:bg-knight text-lg rounded-b-lg">
      <Head>
        <title>{"Projects | " + project.meta.name}</title>
        <meta name="description" content={project.meta.description}/>
      </Head>
      <SocialSharePreview
        image={project.meta.banner}
        title={project.meta.name}
        description={project.meta.description}
      />
      <header className="pb-5">
        <Image
          src={project.meta.banner}
          alt="Project banner"
          layout="responsive"
          height={420}
          width={1000}
        />
        <div className="px-4 md:px-12 pt-4">
          <h1
            className="font-extrabold text-black dark:text-white my-2 leading-9 text-4xl">
            {project.meta.name}
          </h1>
          <div className="flex">
            {project.meta.github &&
            <HeaderLink
              icon="fa fa-github"
              label="Repo"
              href={project.meta.github}
            />}
            {project.meta.demo &&
            <HeaderLink
              icon="fa fa-play"
              label="Live demo"
              href={project.meta.demo}
            />}
          </div>

        </div>
      </header>
      <MarkdownArticle markdown={project.content}/>
    </div>
  );
};

export const getStaticProps: GetStaticProps<ProjectPageProps, ProjectsStaticPaths>
  = async (context) => {
  const project = getAllProjects().find(
    project => project.meta.slug == context.params!.slug
  )!;
  return {
    props: {project}
  };
};

type ProjectsStaticPaths = {
  slug: string,
};

export const getStaticPaths: GetStaticPaths<ProjectsStaticPaths> = async () => {
  const paths = getAllProjects().map(project => ({
    params: {slug: project.meta.slug}
  }));

  return {
    paths,
    fallback: false,
  };
};

export default ProjectPage;