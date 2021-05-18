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
  testing: {
    name: "testing",
    color: "#ffffff",
    bgColor: "#019b65",
  },
  flutter: {
    name: "flutter",
    color: "#2B3A48",
    bgColor: "#56C5F6",
  },
  dart: {
    name: "dart",
    color: "#03589C",
    bgColor: "#41C4FF",
  }
};

export default tags;