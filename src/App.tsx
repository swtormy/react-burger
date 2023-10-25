import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/app-header/AppHeader';
import BurgerIngredients from './components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from './components/burger-constructor/BurgerConstructor';

function App() {
  return (
    <>
    <AppHeader />
    <article>
      <BurgerIngredients />
      <BurgerConstructor />
    </article>
    </>
  );
}

export default App;
