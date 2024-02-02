import Head from "next/head";

type TwitterCardProps = {
  image: string;
  title: string;
  description: string;
};

const SocialSharePreview = (props: TwitterCardProps) => {
  return (
    <Head>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@0xabdou" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={`https://abdou.dev${props.image}`} />
      {/*For stupid linkedin*/}
      <meta
        name="image"
        property="og:image"
        content={`https://abdou.dev${props.image}`}
      />
    </Head>
  );
};
export default SocialSharePreview;
