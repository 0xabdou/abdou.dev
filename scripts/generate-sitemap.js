const globby = require("globby");
const {writeFileSync} = require("fs");
const prettier = require("prettier");
const tags = require("../data/tags/tags.ts").default;

const generateSitemap = async () => {
  console.log(tags);
  const pages = await globby([
    "src/pages/**/*.tsx",
    "!src/pages/**/_*.tsx",
    "!src/pages/**/[*.tsx",
    "data/blog"
  ]);
  const urls = pages.map(page => {
    let path = page
      .replace(".tsx", "")
      .replace(".md", "");
    if (path.startsWith("src/pages/")) {
      path = path.replace("src/pages", "");
    } else if (path.startsWith("data/blog/")) {
      path = path.replace("data/blog", "/blog");
    }
    if (path.endsWith("/index"))
      path = path.replace("/index", "");
    return `
      <url>
        <loc>https://abdou.dev${path}</loc>
      </url>
    `;
  });
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join("")}    
    </urlset>
    `;
  const formatted = prettier.format(sitemap, {parser: "html"});
  writeFileSync("public/sitemap.xml", formatted);
};

void generateSitemap();