import {GetStaticProps, InferGetStaticPropsType} from "next";
import {Article, getAllArticles} from "../../lib/blog";
import ArticleItem from "../../components/article-item";
import {ChangeEventHandler, useCallback, useState} from "react";
import Head from "next/head";

const Blog = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [articles, setArticles] = useState(props.articles);
  const [searchQuery, setSearchQuery] = useState("");

  const onSearchQueryChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const filteredArticles = props.articles.filter(article => {
      return article.title.toLowerCase()
        .includes(e.target.value.toLowerCase().trim());
    });
    setArticles(filteredArticles);
    setSearchQuery(e.target.value);
  }, [setSearchQuery, props.articles]);

  const description = "I started blogging in 2020 at dev.to, and here you can find all the blog posts I published ever since. Now I mainly post on my own blog (this one), but I still cross-post to other blogging platforms.";
  return (
    <div className="flex flex-col w-full max-w-screen-md">
      <Head>
        <title>Abdou Ouahib | Blog</title>
        <meta name="description" content={description}/>
      </Head>
      <header className="py-4 px-2
        text-gray-500 dark:text-gray-400 text-md">
        <h1
          className="text-markup-h1 text-black dark:text-white font-extrabold"
        >
          All Articles
        </h1>
        <p>{description}</p>
      </header>
      <input
        className="bg-white dark:bg-knight outline-none rounded py-2 px-4 mb-5
          text-black dark:text-white"
        placeholder="Search by title"
        type="text"
        value={searchQuery}
        onChange={onSearchQueryChange}
      />
      <div className="flex flex-col space-y-1">
        {articles.map(article => (
          <ArticleItem article={article} key={article.slug}/>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{ articles: Article["meta"][] }> = async () => {
  const articles = getAllArticles().map(article => article.meta);
  return {
    props: {articles}
  };
};

export default Blog;