import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import ArticleItem from "../components/article-item";
import HeaderLink from "../components/header-link";
import ProjectItem from "../components/project-item";
import SocialSharePreview from "../components/social-share-preview";
import { ArticleMeta, getAllArticles } from "../lib/blog";
import { getAllProjects, ProjectMeta } from "../lib/projects";

type HomeProps = {
  articles: ArticleMeta[];
  projects: ProjectMeta[];
};

const Home = (props: HomeProps) => {
  const title = "Abdou Ouahib | Software Developer🚀";
  const descriptionStr =
    "A type-safe software developer and tech content creator. Currently a Frontend Lead at Cosmic JS";

  return (
    <div className="flex flex-col w-full max-w-4xl">
      <Head>
        <title>{title}</title>
        <meta name="description" content={descriptionStr} />
        <meta
          name="keywords"
          content="software engineer, software developer, web developer,
            mobile developer, portfolio, blog, React, Next.js, Flutter, GraphQL"
        />
      </Head>
      <SocialSharePreview
        image="/static/images/social-share-preview/home.png"
        title={title}
        description={descriptionStr}
      />
      <div
        className="relative flex flex-col md:items-center rounded
          w-full mt-10 md:mt-16 p-4 bg-white dark:bg-knight"
      >
        <img
          className="absolute rounded-full
            -top-8 md:-top-14 md:right-1/2
            transform translate-x-4 md:translate-x-16
            w-16 h-16 md:w-32 md:h-32
            border-black border-4 md:border-8"
          src={"/static/images/avatar.png"}
          alt="Avatar"
        />
        <h1
          className="mt-8 md:mt-16 text-black dark:text-white text-3xl font-bold
            mb-2"
        >
          Abdou Ouahib
        </h1>
        <p className="text-black dark:text-gray-200 mb-2">
          Type-safe Software Developer 🚀 Tech Content Creator ✍️
        </p>
        <div className="flex flex-wrap">
          <HeaderLink icon="fa fa-map-marker" label="Morocco" />
          <HeaderLink
            icon="fa fa-github"
            label="GitHub"
            href="https://github.com/aouahib"
          />
          <HeaderLink
            icon="fa fa-twitter"
            label="Twitter"
            href="https://twitter.com/aouahib_"
          />
          <HeaderLink
            icon="fa fa-linkedin"
            label="LinkedIn"
            href="https://www.linkedin.com/in/abdou-ouahib-1350b4196/"
          />
        </div>
      </div>
      <Section className="mt-12" label="Recent articles" moreHref="/blog">
        {props.articles.map((article) => (
          <ArticleItem article={article} key={article.slug} />
        ))}
      </Section>
      <Section
        className="mt-3 mb-12"
        label="Recent projects"
        moreHref="/projects"
      >
        {props.projects.map((project) => (
          <div className="p-3" key={project.slug}>
            <ProjectItem project={project} />
          </div>
        ))}
      </Section>
    </div>
  );
};

type SectionProps = {
  label: string;
  children: ReactNode;
  moreHref: string;
  className?: string;
};

const Section = ({
  label,
  children,
  moreHref,
  className = "",
}: SectionProps) => {
  return (
    <div
      className={`flex flex-col bg-white dark:bg-knight
        divide-y divide-solid divide-black divide-opacity-10
        dark:divide-white dark:divide-opacity-10 rounded ${className}`}
    >
      <div className="flex items-center justify-between py-3 px-4">
        <h2 className="text-black dark:text-white text-2xl font-bold ">
          {label}
        </h2>
        <Link href={moreHref}>
          <a
            className="hidden sm:inline text-gray-500 dark:text-gray-400
             hover:text-mineta-dark dark:hover:text-mineta"
          >
            Show more
          </a>
        </Link>
      </div>
      {children}
      <Link href={moreHref}>
        <a
          className="sm:hidden p-4 text-center
            text-gray-500 dark:text-gray-400
            hover:text-mineta-dark dark:hover:text-mineta"
        >
          Show more
        </a>
      </Link>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const articles = getAllArticles()
    .slice(0, 2)
    .map((a) => a.meta);
  const projects = getAllProjects()
    .slice(0, 2)
    .map((p) => p.meta);
  return {
    props: { articles, projects },
  };
};

export default Home;
