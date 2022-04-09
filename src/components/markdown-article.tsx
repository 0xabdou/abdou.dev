/* eslint-disable @typescript-eslint/no-unused-vars */
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown/src/ast-to-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ThemeContext from "../shared/theme-context";

type MarkdownArticleProps = {
  markdown: string;
};

const MarkdownArticle = ({ markdown }: MarkdownArticleProps) => {
  return (
    <article className="px-4 md:px-12">
      <ReactMarkdown components={components}>{markdown}</ReactMarkdown>
    </article>
  );
};

const baseHeaderStyle =
  "font-extrabold text-black dark:text-white my-2 leading-9";
const components: Components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    if (!inline && match) {
      return (
        <ThemeContext.Consumer>
          {({ theme }) => (
            <SyntaxHighlighter
              style={theme == "dark" ? dracula : prism}
              customStyle={{ fontSize: "1rem", marginBottom: "1rem" }}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          )}
        </ThemeContext.Consumer>
      );
    }
    return (
      <code
        className="bg-black dark:bg-gray-50
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
      <blockquote {...props} className="border-l-4 border-gray-400 pl-5 my-5" />
    );
  },
  h1({ node, ...props }) {
    return <h1 {...props} className={`${baseHeaderStyle} text-markup-h1`} />;
  },
  h2({ node, ...props }) {
    return <h2 className={`${baseHeaderStyle} text-markup-h2`} {...props} />;
  },
  h3({ node, ...props }) {
    return <h3 className={`${baseHeaderStyle} text-markup-h3`} {...props} />;
  },
  h4({ node, ...props }) {
    return <h4 className={`${baseHeaderStyle} text-markup-h4`} {...props} />;
  },
  ul({ node, ordered, ...props }) {
    return (
      <ul
        {...props}
        className="list-outside list-disc pl-5 text-black dark:text-white
            mb-4"
      />
    );
  },
  ol({ node, ordered, ...props }) {
    return (
      <ol
        {...props}
        className="list-outside list-decimal pl-5 text-black dark:text-white
            mb-4"
      />
    );
  },
  p({ node, ...props }) {
    return <p {...props} className="text-black dark:text-white pb-4 " />;
  },
  img({ node, src, ...props }) {
    // The alt attribute should come from the markdown
    const source = src as string;
    // Maybe add more extensions
    if (source.endsWith(".mp4")) {
      return (
        <video
          className="mx-auto"
          src={source}
          playsInline
          autoPlay
          muted
          loop
          controls={false}
        />
      );
    }
    return <img src={source} alt="" {...props} className="mx-auto my-3" />;
  },
  a({ node, ...props }) {
    return (
      <a
        {...props}
        target="_blank"
        className="underline text-mineta-dark hover:text-opacity-60
           dark:text-mineta dark:hover:text-opacity-80"
        rel="noopener noreferrer"
      />
    );
  },
};

export default MarkdownArticle;
