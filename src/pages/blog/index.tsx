import { GetStaticProps, InferGetStaticPropsType } from "next";
import ArticlesWithSearch from "../../components/articles-with-search";
import SocialSharePreview from "../../components/social-share-preview";
import TitleWithDescription from "../../components/title-with-description";
import { ArticleMeta, getAllArticles } from "../../lib/blog";

const Blog = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = "Blog | Abdou Ouahib";
  const description =
    "I started blogging in 2020 at dev.to, and here you can find all the blog posts I published ever since. Now I mainly post on my own blog (this one), but I still cross-post to other blogging platforms.";
  return (
    <div className="max-w-screen-md">
      <SocialSharePreview
        image="/static/images/social-share-preview/blog.png"
        title={title}
        description={description}
      />
      <ArticlesWithSearch
        header={
          <TitleWithDescription
            title="All Articles"
            description={description}
          />
        }
        articles={props.articles}
        title={title}
        description={description}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps<{ articles: ArticleMeta[] }> =
  async () => {
    const articles = getAllArticles().map((article) => article.meta);
    return {
      props: { articles },
    };
  };

export default Blog;
