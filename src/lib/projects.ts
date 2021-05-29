import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ProjectMeta = {
  slug: string,
  name: string,
  description: string,
  banner: string,
  logo: string,
  date: string
}

export type Project = {
  meta: ProjectMeta,
  content: string
}

const root = process.cwd();

export const getAllProjects = (): Project[] => {
  const slugs = fs.readdirSync(path.join(root, "data/projects"));
  return slugs
    .map(slug => {
      const raw = fs.readFileSync(path.join(root, "data/projects", slug));
      const {content, data} = matter(raw);
      return {
        content: content,
        meta: {
          slug: slug.replace(".md", ""),
          name: data.name,
          description: data.description,
          banner: data.banner,
          logo: data.logo,
          date: data.date,
        }
      };
    }).sort((a, b) => {
      const aDate = new Date(a.meta.date).getTime();
      const bDate = new Date(b.meta.date).getTime();
      return bDate - aDate;
    });
};