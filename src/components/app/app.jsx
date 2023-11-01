import React, { useState, useEffect } from 'react';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  const API_URL = 'https://norma.nomoreparties.space/api/ingredients';
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(`Ошибка ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setIngredients(data.data);
      })
      .catch(error => {
        console.error('Ошибка: ', error);
      });
  }, []);


  return (
    <div className={styles.main}>
      <AppHeader />
      <main className={styles.articleContainer}>
        {ingredients && <BurgerIngredients ingredients={ingredients} />}
        {ingredients && <BurgerConstructor ingredients={ingredients} />}
      </main>
    </div>
  );
}

export default App;
