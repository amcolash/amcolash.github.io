import { motion } from 'framer-motion';
import { media, style } from 'typestyle';
import useDarkMode from 'use-dark-mode';

import { Colors } from '../lib/constants';

const tags = style(
  {
    position: 'absolute',

    $nest: {
      h3: {
        margin: '0 0 8px',
      },
    },
  },
  media({ maxHeight: 600 }, { marginLeft: 'calc(min(50vw, 50vh, 300px) + 200px)' }),
  media({ minHeight: 601 }, { marginTop: 'calc(min(50vw, 50vh, 300px) + 170px)' })
);

export function GreenSlide() {
  const darkMode = useDarkMode();
  const borderColor = darkMode.value ? Colors.Black : Colors.White;

  return (
    <div className="greenSlide" style={{ overflow: 'hidden', position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}>
      <motion.div
        initial={{ x: '-200vw' }}
        animate={{ x: '-50vw', transition: { duration: 1 } }}
        exit={{ x: '-200vw', transition: { delay: 0.25, duration: 0.5 } }}
        key="green"
        style={{
          width: '200vw',
          height: '100vh',
          background: `linear-gradient(135deg, ${Colors.Green} 0%, ${Colors.Green} 50%, transparent 50%, transparent 100%)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <motion.img
          src="https://www.gravatar.com/avatar/a2821096114f7641f9a304453fa56137?s=300"
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 1, duration: 0.5 } }}
          exit={{ scale: 0, opacity: 0, transition: { duration: 0.25 } }}
          key="face"
          style={{
            borderRadius: '100%',
            borderWidth: '7px',
            borderStyle: 'solid',
            borderTopColor: borderColor,
            borderLeftColor: borderColor,
            borderBottomColor: Colors.Green,
            borderRightColor: Colors.Green,
            maxHeight: '50vh',
            maxWidth: '50vw',
          }}
        />
        <div className={tags}>
          <motion.h3
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.35, delay: 1.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            Developer
          </motion.h3>
          <motion.h3
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.35, delay: 1.75 } }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            Maker
          </motion.h3>
          <motion.h3
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.35, delay: 2 } }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            Hacker
          </motion.h3>
        </div>
      </div>
    </div>
  );
}
