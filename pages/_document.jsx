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
            body { background: ${Colors.Black}; color: ${Colors.White}; }
            body.light-mode { background: ${Colors.White}; color: ${Colors.Black}; }
          `}</style>
        </Head>
        <body style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: '1.25rem', transition: 'all 0.25s' }}>
          <script src="noflash.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
