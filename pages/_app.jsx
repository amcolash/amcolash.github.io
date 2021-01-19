import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Main } from '../components/Main';

// Disable SSR (so I can use state easily): https://dev.to/apkoponen/how-to-disable-server-side-rendering-ssr-in-next-js-1563
function SafeHydrate({ children }) {
  return <div suppressHydrationWarning>{typeof window === 'undefined' ? null : children}</div>;
}

function MyApp({ Component, pageProps }) {
  return (
    <SafeHydrate>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
        <Header />
        <Main>
          <Component {...pageProps} />
        </Main>
        <Footer />
      </div>
    </SafeHydrate>
  );
}

export default MyApp;
