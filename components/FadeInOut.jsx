import { motion } from 'framer-motion';

export const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.25, duration: 0.25 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25 },
  },
};

export function FadeInOut(props) {
  return (
    <motion.div variants={variants} initial="hidden" animate="visible" exit="exit">
      {props.children}
    </motion.div>
  );
}
