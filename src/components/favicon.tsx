const Favicon = () => {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href={"/favicon/apple-icon-152x152.png"}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={"/favicon/apple-icon-180x180.png"}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={"/favicon/android-icon-192x192.png"}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={"/favicon/favicon-32x32.png"}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href={"/favicon/favicon-96x96.png"}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={"/favicon/favicon-16x16.png"}
      />
      <link rel="manifest" href="/favicon/manifest.json"/>
      <meta name="msapplication-TileColor" content="#ffffff"/>
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
      <meta name="theme-color" content="#ffffff"/>
    </>
  );
};

export default Favicon;