import ReactMarkdown from 'react-markdown';
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import {Article, getAllArticles} from "../../lib/blog";
import {Components} from "react-markdown/src/ast-to-react";
import {dracula, prism} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import tags, {Tag} from "../../../data/tags/tags";
import Link from "next/link";
import ThemeContext from "../../shared/theme-context";
import useFormattedDate from "../../shared/use-formatted-date";
import Head from "next/head";

const baseHeaderStyle = "font-extrabold text-black dark:text-white my-2 leading-9";
const components: Components = {
  code({node, inline, className, children, ...props}) {
    const match = /language-(\w+)/.exec(className || '');
    if (!inline && match) {
      return (
        <ThemeContext.Consumer>
          {({theme}) => (
            <SyntaxHighlighter
              style={theme == "dark" ? dracula : prism}
              customStyle={{fontSize: "1rem", marginBottom: "1rem"}}
              language={match[1]}
              PreTag="div"
              children={String(children).replace(/\n$/, '')} {...props}
            />
          )}
        </ThemeContext.Consumer>
      );
    }
    return (
      <code className="bg-black dark:bg-gray-50
        bg-opacity-10 dark:bg-opacity-10
        text-sm break-words text-black dark:text-white px-1"
            {...props}
      >
        {children}
      </code>
    );
  },
  blockquote(props) {
    return (
      <blockquote
        {...props}
        className="border-l-4 border-gray-400 pl-5 my-5"
      />
    );
  },
  h1({node, ...props}) {
    return (
      <h1
        {...props}
        className={`${baseHeaderStyle} text-markup-h1`}
      />
    );
  },
  h2({node, ...props}) {
    return (
      <h2 className={`${baseHeaderStyle} text-markup-h2`}
          {...props}
      />
    );
  },
  h3({node, ...props}) {
    return (
      <h3 className={`${baseHeaderStyle} text-markup-h3`}
          {...props}
      />
    );
  },
  h4({node, ...props}) {
    return (
      <h4 className={`${baseHeaderStyle} text-markup-h4`}
          {...props}
      />
    );
  },
  ul({node, ordered, ...props}) {
    return (
      <ul {...props}
          className="list-outside list-disc pl-5 text-black dark:text-white
            mb-4"
      />
    );
  },
  ol({node, ordered, ...props}) {
    return (
      <ol {...props}
          className="list-outside list-decimal pl-5 text-black dark:text-white
            mb-4"
      />
    );
  },
  p({node, ...props}) {
    return <p {...props} className="text-black dark:text-white pb-4 "/>;
  },
  img({node, ...props}) {
    // The alt attribute should come from the markdown
    return <img alt="" {...props} className="mx-auto my-3"/>;
  },
  a({node, ...props}) {
    return (
      <a {...props}
         target="_blank"
         className="underline text-mineta-dark hover:text-opacity-60
           dark:text-mineta dark:hover:text-opacity-80"
      />
    );
  }
};

const BlogArticle = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const date = useFormattedDate(new Date(props.meta.publishedAt));

  return (
    <div className="flex flex-col max-w-full md:max-w-2xl lg:max-w-screen-md
      md:mx-4 mb-52 bg-white dark:bg-knight text-lg"
    >
      <Head>
        <title>{props.meta.title}</title>
        <meta name="description" content={props.meta.summary}/>
      </Head>
      <header className="pb-5">
        <div className="w-full aspect-w-16 aspect-h-7 object-cover">
          <img src={props.meta.banner} alt="Article banner"/>
        </div>
        <div className="px-4 md:px-12 pt-4">
          <h1 className={`${baseHeaderStyle} text-4xl`}>
            {props.meta.title}
          </h1>
          <div className="flex flex-wrap my-3">
            {props.meta.tags.map(tag => (
              <TagChip {...tags[tag]} key={tag}/>
            ))}
          </div>
          <div className="flex text-gray-500 dark:text-gray-400 text-sm">
            <time dateTime={props.meta.publishedAt}>{date}</time>
            &nbsp;- {props.meta.readTime} minutes read
          </div>
        </div>
      </header>
      <article className="px-4 md:px-12">
        <ReactMarkdown children={props.content} components={components}/>
      </article>
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

export default BlogArticle;