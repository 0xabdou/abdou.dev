import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import {Article, getAllArticles} from "../../lib/blog";
import tags, {Tag} from "../../../data/tags/tags";
import Link from "next/link";
import Head from "next/head";
import SocialSharePreview from "../../components/social-share-preview";
import {useEffect} from "react";
import DateReadingTimeViews from "../../components/date-reading-time-views";
import MarkdownArticle from "../../components/markdown-article";
import Image from "next/image";


const BlogPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  useEffect(() => {
    void fetch(`/api/views/${props.meta.slug}`);
  }, []);

  return (
    <div className="flex flex-col max-w-full md:max-w-2xl lg:max-w-screen-md
      md:mx-4 mb-52 bg-white dark:bg-knight text-lg rounded-lg"
    >
      <Head>
        <title>{props.meta.title}</title>
        <meta name="description" content={props.meta.summary}/>
      </Head>
      <SocialSharePreview
        image={props.meta.banner}
        title={props.meta.title}
        description={props.meta.summary}
      />
      <header className="pb-5">
        <Image
          src={props.meta.banner}
          alt="Article banner"
          layout="intrinsic"
          height={420}
          width={1000}
        />
        <div className="px-4 md:px-12 pt-4">
          <h1
            className="font-extrabold text-black dark:text-white my-2 leading-9 text-4xl">
            {props.meta.title}
          </h1>
          <div className="flex flex-wrap my-3">
            {props.meta.tags.map(tag => (
              <TagChip {...tags[tag]} key={tag}/>
            ))}
          </div>
          <DateReadingTimeViews article={props.meta}/>
        </div>
      </header>
      <MarkdownArticle markdown={props.content}/>
    </div>
  );
};

const TagChip = (props: Tag) => {
  return (
    <Link href={`/tags/${props.name}`}>
      <div
        className="text-sm rounded-md mr-2 mb-1 px-1 py-0.5 cursor-pointer"
        style={{color: props.color, backgroundColor: props.bgColor}}
      >
        <span className="opacity-40">#</span>{props.name}
      </div>
    </Link>
  );
};

export const getStaticProps: GetStaticProps<Article> = async ({params}) => {
  const articles = getAllArticles();
  const article = articles.find(a => a.meta.slug == params!.slug)!;
  return {props: article};
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = getAllArticles();
  return {
    paths: articles.map(article => ({
      params: {slug: article.meta.slug}
    })),
    fallback: false
  };
};

export default BlogPage;