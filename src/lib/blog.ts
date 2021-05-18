import * as fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const root = process.cwd();

export type ArticleMeta = {
  slug: string,
  title: string,
  summary: string,
  tags: string[],
  publishedAt: string,
  banner: string,
  readTime: number,
};

export type Article = {
  content: string,
  meta: ArticleMeta
}

export const getAllArticles = (): Article[] => {
  const slugs = fs.readdirSync(path.join(root, "data/blog"));
  return slugs
    .map(slug => {
      const raw = fs.readFileSync(path.join(root, "data/blog", slug));
      const {content, data} = matter(raw);
      return {
        content: content,
        meta: {
          title: data.title,
          summary: data.summary,
          tags: data.tags,
          publishedAt: data.publishedAt,
          banner: data.banner,
          slug: slug.replace(".md", ""),
          readTime: Math.round(readingTime(content).minutes)
        }
      };
    }).sort((a, b) => {
      const aDate = new Date(a.meta.publishedAt).getTime();
      const bDate = new Date(b.meta.publishedAt).getTime();
      return bDate - aDate;
    });
};