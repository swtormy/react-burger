import React, { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../utils/burger-api';
import { IngredientsContext } from '../../contexts/ingredients-context';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients()
      .then(data => {
        setIngredients(data.data);
      })
      .catch(error => {
        console.error('Ошибка: ', error);
      });
  }, []);


  return (
    <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
      <div className={styles.main}>
        <AppHeader />
        <main className={styles.articleContainer}>
          {ingredients && <BurgerIngredients />}
          {ingredients && <BurgerConstructor />}
        </main>
      </div>
    </IngredientsContext.Provider>
  );
}

export default App;
