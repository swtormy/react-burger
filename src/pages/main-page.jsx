import React from 'react'
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const MainPage = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
        </DndProvider>
    )
}


export default MainPage