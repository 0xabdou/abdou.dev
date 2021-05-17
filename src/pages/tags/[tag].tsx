import tags, {Tag} from "../../../data/tags/tags";
import {GetStaticPaths, GetStaticProps} from "next";
import {ArticleMeta, getAllArticles} from "../../lib/blog";
import ArticlesWithSearch from "../../components/articles-with-search";

type TagPageProps = {
  tag: Tag,
  articles: ArticleMeta[]
};

const TagPage = ({tag, articles}: TagPageProps) => {
  const description = `Here you can find all articles tagged with ${tag.name}`;
  return (
    <ArticlesWithSearch
      header={
        <>
          <h1 className="rounded p-2 text-3xl mb-2"
              style={{backgroundColor: tag.bgColor, color: tag.color}}
          >
            <span className="opacity-40">#</span>{tag.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </>
      }
      articles={articles}
      title={`${tag.name} articles`}
      description={description}
      key={tag.name}
    />
  );
};

export const getStaticProps: GetStaticProps<TagPageProps> = async ({params}) => {
  const tagName = params!.tag as string;
  const articles = getAllArticles()
    .map(article => article.meta)
    .filter(meta => meta.tags.includes(tagName));
  return {
    props: {tag: tags[tagName], articles}
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(tags).map(tag => ({params: {tag}})),
    fallback: false
  };
};

export default TagPage;