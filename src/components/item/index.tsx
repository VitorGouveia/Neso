import { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import styles from './item.module.scss';

type ItemProps = {
  elementName: string;
  element: string;
  type: 'anion' | 'cation';
};

export const Item: FC<ItemProps> = ({ element, elementName, type }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.li
      className={styles.item}
      layout
      onClick={toggleOpen}
      initial={{ borderRadius: 4 }}
    >
      <motion.div layout>
        <span className={styles.title}>{element}</span>
        <span className={styles.element}>{elementName}</span>
      </motion.div>
      <AnimatePresence>{isOpen && <Content />}</AnimatePresence>
    </motion.li>
  );
};

export const Content: FC = () => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.row} />
      <div className={styles.row} />
      <div className={styles.row} />
    </motion.div>
  );
};
