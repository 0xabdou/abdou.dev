type TwitterCardProps = {
  image: string
};

const TwitterCard = (props: TwitterCardProps) => {
  return (
    <>
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:creator" content="@aouahib_"/>
      <meta property="og:image" content={props.image}/>
    </>
  );
};

export default TwitterCard;