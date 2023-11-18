import React from 'react'
import PropTypes from 'prop-types';
import { ingredientType } from '../utils/types';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';

const MainPage = ({ ingredients }) => {
    if (!ingredients) return null
    return (
        <>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
        </>
    )
}

MainPage.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientType).isRequired,
};

export default MainPage