import React from 'react';
import logo from './logo.svg';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  return (
    <main className={styles.main}>
      <AppHeader />
      <article className={styles.articleContainer}>
        <BurgerIngredients />
        <BurgerConstructor />
      </article>
    </main>
  );
}

export default App;
