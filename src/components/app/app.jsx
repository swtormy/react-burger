import React, { useState, useEffect } from 'react';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main-page';

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
    <BrowserRouter>
      <div className={styles.main}>
        <AppHeader />
        <main className={styles.articleContainer}>
          <Routes>
            <Route path="/" element={
              <MainPage ingredients={ingredients}/>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
