import { FC, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { AnimateSharedLayout, motion } from 'framer-motion';
import { ArrowDown, ArrowUp } from 'react-feather';
import { v4 as uuid } from 'uuid';

import { api } from '@services';
import { Item } from '@components';
import { IonType } from './api/ions';

import styles from '@styles/home.module.scss';
import _ from 'underscore';

type HomeProps = {
  ions: IonType[];
};

const Home: FC<HomeProps> = ({ ions }) => {
  const [isTypeSort, setIsTypeSort] = useState(false);

  const toggleTypeSort = () => {
    setIsTypeSort(!isTypeSort);
  };

  const anions = ions.filter(ion => ion.type === 'anion');
  const cations = ions.filter(ion => ion.type === 'cation');

  let list: JSX.Element[] | null = null;

  if (isTypeSort) {
    list = [...cations, ...anions].map(({ type, element, elementName }) => (
      <Item
        type={type}
        element={element}
        elementName={elementName}
        key={uuid()}
      />
    ));
  } else {
    list = [...anions, ...cations].map(({ type, element, elementName }) => (
      <Item
        type={type}
        element={element}
        elementName={elementName}
        key={uuid()}
      />
    ));
  }

  return (
    <AnimateSharedLayout type="crossfade">
      <motion.header className={styles.header}>
        <motion.h1>Tabela de Íons</motion.h1>
      </motion.header>

      <motion.main className={styles.main}>
        <motion.ul className={styles.table}>
          <motion.div>
            <motion.li data-title={true}>Elemento</motion.li>
            <motion.li>Nome</motion.li>

            <motion.li data-action={true} onClick={toggleTypeSort}>
              Tipo
              {isTypeSort ? (
                <ArrowUp size={12} color="#fff" strokeWidth={5} />
              ) : (
                <ArrowDown size={12} color="#fff" strokeWidth={5} />
              )}
            </motion.li>
          </motion.div>

          {list}
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
