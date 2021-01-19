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
            button { border: 2px solid ${Colors.Black}; padding: 0.35rem; border-radius: 0.35rem; cursor: pointer; }
            a, a:visited, button { color: ${Colors.White}; }
            .light-mode a, .light-mode a:visited, button a, button a:visited { color: ${Colors.Black}; }
            body, button.light-mode { background: ${Colors.Black}; color: ${Colors.White}; transition: all 0.25s }
            body.light-mode { background: ${Colors.White}; color: ${Colors.Black}; }
          `}</style>
        </Head>
        <body style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: '1.25rem' }}>
          <script src="noflash.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
