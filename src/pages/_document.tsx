import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';
import Favicon from "../components/favicon";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en-US" className="dark">
        <Head>
          <Favicon/>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <script src="https://use.fontawesome.com/7b71609399.js"/>
        </Head>
        <body
          className="h-screen max-h-screen overflow-y-auto bg-old dark:bg-black"
        >
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;