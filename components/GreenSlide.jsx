import { motion } from 'framer-motion';
import useDarkMode from 'use-dark-mode';

import { Colors } from '../lib/constants';

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
          }}
        />
      </div>
    </div>
  );
}
