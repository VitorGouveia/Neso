import { FC, useState } from 'react';
import { GetServerSideProps } from 'next';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';

import { api } from '@services';
import { Item } from '@components';
import { IonType } from './api/ions';

import styles from '@styles/home.module.scss';

type HomeProps = {
  ions: IonType[];
};

const Home: FC<HomeProps> = ({ ions }) => {
  return (
    <AnimateSharedLayout type="crossfade">
      <motion.header className={styles.header}>
        <motion.h1>Tabela de Íons</motion.h1>
      </motion.header>

      <motion.main className={styles.main}>
        <motion.ul className={styles.table}>
          <div>
            <li data-title={true}>Elemento</li>
            <li data-title={true}>Nome</li>
          </div>

          {ions.map(({ type, element, elementName }) => (
            <Item
              type={type}
              element={element}
              elementName={elementName}
              key={elementName}
            />
          ))}
        </motion.ul>
      </motion.main>
    </AnimateSharedLayout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('/');

  const ions = data as IonType[];
  if (!ions) {
    return {
      props: {
        ions: [],
      },
    };
  }

  return {
    props: {
      ions,
    },
  };
};
