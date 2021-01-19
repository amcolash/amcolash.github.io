import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { useEffect, useRef } from 'react';

import { GreenSlide } from '../components/GreenSlide';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Main } from '../components/Main';

// Disable SSR (so I can use state easily): https://dev.to/apkoponen/how-to-disable-server-side-rendering-ssr-in-next-js-1563
function SafeHydrate({ children }) {
  return <div suppressHydrationWarning>{typeof window === 'undefined' ? null : children}</div>;
}

// Clever bit of code from: https://stackoverflow.com/a/53446665/2303432
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const prevRoute = usePrevious(router.pathname);

  return (
    <SafeHydrate>
      <AnimatePresence>{router.pathname === '/' && <GreenSlide />}</AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5, delay: 1 } }}
        key="initialFade"
        style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', zIndex: 1, position: 'relative' }}
      >
        <Header />
        <Main>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.25, delay: prevRoute === '/' ? 0.75 : undefined } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              key={router.route}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </Main>
        <Footer />
      </motion.div>
    </SafeHydrate>
  );
}

export default MyApp;
