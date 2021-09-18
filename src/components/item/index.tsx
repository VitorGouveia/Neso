import { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import styles from './item.module.scss';

type ItemProps = {
  elementName: string;
  element: string;
  type: 'anion' | 'cation';
};

type ContentProps = {
  ion: ItemProps;
};

export const Item: FC<ItemProps> = ({ element, elementName, type }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const Content: FC<ContentProps> = ({ ion }) => {
    const { element, type, elementName } = ion;

    return (
      <motion.div
        layout
        className={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <p>nome:</p>
        <p>{elementName}</p>
        <p>elemento:</p>
        <p>{element}</p>
        <p>tipo:</p>
        <p>{type}</p>
        <p>descrição:</p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. At autem
          vitae magni. Libero eos excepturi inventore sint amet accusamus
          consectetur.
        </p>
        <button onClick={toggleOpen}>Fechar</button>
      </motion.div>
    );
  };

  return (
    <motion.li className={styles.item} layout initial={{ borderRadius: 4 }}>
      <motion.div onClick={toggleOpen} className={styles.grid} layout>
        <span>{element}</span>
        <span>{elementName}</span>
        <span>{type}</span>
      </motion.div>
      <AnimatePresence>
        {isOpen && <Content ion={{ elementName, element, type }} />}
      </AnimatePresence>
    </motion.li>
  );
};
