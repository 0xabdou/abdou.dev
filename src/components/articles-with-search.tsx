import {ChangeEventHandler, ReactNode, useCallback, useState} from "react";
import Head from "next/head";
import ArticleItem from "./article-item";
import {ArticleMeta} from "../lib/blog";

type ArticlesWithSearchProps = {
  header: ReactNode,
  articles: ArticleMeta[]
  title: string,
  description: string,
};

const ArticlesWithSearch = (props: ArticlesWithSearchProps) => {
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

  return (
    <div className="flex flex-col w-full max-w-screen-md">
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description}/>
      </Head>
      {props.header}
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

export default ArticlesWithSearch;
