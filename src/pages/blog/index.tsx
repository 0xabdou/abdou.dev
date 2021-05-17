import {GetStaticProps, InferGetStaticPropsType} from "next";
import {ArticleMeta, getAllArticles} from "../../lib/blog";
import ArticlesWithSearch from "../../components/articles-with-search";

const Blog = (props: InferGetStaticPropsType<typeof getStaticProps>) => {

  const description = "I started blogging in 2020 at dev.to, and here you can find all the blog posts I published ever since. Now I mainly post on my own blog (this one), but I still cross-post to other blogging platforms.";
  return (
    <ArticlesWithSearch
      header={
        <>
          <h1
            className="text-markup-h1 text-black dark:text-white font-extrabold"
          >
            All Articles
          </h1>
          <p>{description}</p>
        </>
      }
      articles={props.articles}
      title="Blog | Abdou Ouahib"
      description={description}
    />
  );
};

export const getStaticProps: GetStaticProps<{ articles: ArticleMeta[] }> = async () => {
  const articles = getAllArticles().map(article => article.meta);
  return {
    props: {articles}
  };
};

export default Blog;