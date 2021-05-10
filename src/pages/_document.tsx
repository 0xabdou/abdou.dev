import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en-US" className="dark">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <script src="https://use.fontawesome.com/7b71609399.js"/>
        </Head>
        <body className="bg-old dark:bg-black">
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;