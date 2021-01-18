import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Main } from '../components/Main';

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
      <Header />
      <Main>
        <Component {...pageProps} />
      </Main>
      <Footer />
    </div>
  );
}

export default MyApp;
