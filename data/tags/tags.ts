export type Tag = {
  name: string,
  color: string,
  bgColor: string,
};

const tags: { [name: string]: Tag } = {
  typescript: {
    name: "typescript",
    color: "#ffffff",
    bgColor: "#234A84",
  },
  javascript: {
    name: "javascript",
    color: "#000000",
    bgColor: "#F7DF1E",
  },
  react: {
    name: "react",
    color: "#61DAF6",
    bgColor: "#222222",
  },
  redux: {
    name: "redux",
    color: "#ffffff",
    bgColor: "#764ABC",
  },
  nextjs: {
    name: "nextjs",
    color: "#ffffff",
    bgColor: "#000000",
  },
  graphql: {
    name: "graphql",
    color: "#ff5bc8",
    bgColor: "#171e26",
  },
};

export default tags;