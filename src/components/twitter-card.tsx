type TwitterCardProps = {
  image: string,
  title: string,
  description: string,
};

const TwitterCard = (props: TwitterCardProps) => {
  return (
    <>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:creator" content="@aouahib_"/>
      <meta property="og:image" content={props.image}/>
      <meta property="og:title" content={props.title}/>
      <meta property="og:description" content={props.description}/>
    </>
  );
};

export default TwitterCard;