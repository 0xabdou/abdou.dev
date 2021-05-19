import Head from "next/head";
import SocialSharePreview from "../../components/social-share-preview";

const Projects = () => {
  const title = "Projects | Abdou Ouahib";
  const description = "Here are all the relevant projects I've worked on";
  return (
    <div className="flex items-center text-black: dark:text-white">
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
      Coming soon..
    </div>
  );
};

export default Projects;