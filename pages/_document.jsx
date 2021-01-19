import Document, { Html, Head, Main, NextScript } from 'next/document';

import { Colors } from '../lib/constants';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet" />
          <style>{`
            a {
              color: ${Colors.White};
            }
            a:visited {
              color: ${Colors.White};
            }
          `}</style>
        </Head>
        <body style={{ margin: 0, fontFamily: 'Rubik, sans-serif', background: Colors.Black, color: Colors.White, fontSize: '1.25em' }}>
          <script src="noflash.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
