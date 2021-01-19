import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Main } from '../components/Main';

// Disable SSR (so I can use state easily): https://dev.to/apkoponen/how-to-disable-server-side-rendering-ssr-in-next-js-1563
function SafeHydrate({ children }) {
  return <div suppressHydrationWarning>{typeof window === 'undefined' ? null : children}</div>;
}

const variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <SafeHydrate>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
        <Header />
        <Main>
          <AnimatePresence exitBeforeEnter>
            <motion.div initial="hidden" animate="visible" exit="hidden" variants={variants} key={router.route}>
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </Main>
        <Footer />
      </div>
    </SafeHydrate>
  );
}

export default MyApp;
