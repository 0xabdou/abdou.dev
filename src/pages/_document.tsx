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
          <script
            src="https://kit.fontawesome.com/49d981a984.js"
            crossOrigin="anonymous"
            async
          />
        </Head>
        <body
          className="h-screen max-h-screen overflow-y-auto bg-old dark:bg-knight-dark"
        >
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;