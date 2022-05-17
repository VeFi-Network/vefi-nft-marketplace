/* eslint-disable @next/next/no-sync-scripts */
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/* <link rel="apple-touch-icon" href="/static/favicon.ico" /> */}
          {/* <link rel="icon" href="/static/favicon.ico" /> */}
          {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
          <meta name="theme-color" content="#000000" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="crossOrigin" />
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;600;700;800&display=swap"
            rel="stylesheet"
          ></link>
          <meta name="description" content="VefiNFT" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}