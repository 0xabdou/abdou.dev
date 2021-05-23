import Head from "next/head";

type TwitterCardProps = {
  image: string,
  title: string,
  description: string,
};

const SocialSharePreview = (props: TwitterCardProps) => {
  return (
    <Head>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:creator" content="@aouahib_"/>
      <meta
        name="image"
        property="og:image"
        content={`https://abdou.dev${props.image}`}
      />
      <meta property="og:title" content={props.title}/>
      <meta property="og:description" content={props.description}/>
    </Head>
  );
};
export default SocialSharePreview;