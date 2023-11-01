import React, { useContext, useReducer, useEffect } from 'react'
import styles from './burger-constructor.module.css'
import Burger from './burger/burger'
import { ingredientType } from '../../utils/types';
import Modal from '../modal/modal'
import OrderDetails from '../modal/modal-children/order-details'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { useModal } from '../../hooks/useModal'
import { IngredientsContext } from '../../contexts/ingredients-context'

const initialState = {
  selectedIngredients: [],
  totalPrice: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.payload],
        totalPrice: state.totalPrice + action.payload.price,
      };
    case 'REMOVE_INGREDIENT':
      const updatedIngredients = state.selectedIngredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
      return {
        ...state,
        selectedIngredients: updatedIngredients,
        totalPrice: state.totalPrice - action.payload.price,
      };
    default:
      return state;
  }
};

const BurgerConstructor = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { ingredients } = useContext(IngredientsContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    ingredients.forEach(ingredient => {
      dispatch({ type: 'ADD_INGREDIENT', payload: ingredient });
    });
  }, [ingredients]);

  return (
    <div className={styles.burger_constructor}>
      <div className={styles.inner_block}>
        <Burger ingredients={state.selectedIngredients} />
        <div className={styles.result_block} >
          <div className={styles.result}>
            <div className={styles.price}>
              <p className="text text_type_digits-medium">{state.totalPrice}</p>
              <div className={styles.currency}>
                <CurrencyIcon type="primary" />
              </div>
            </div>
            <div className={styles.button}>
              <Button htmlType="button" type="primary" size="medium" onClick={openModal}>
                Оформить заказ
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <Modal onClose={closeModal}>
        <OrderDetails />
      </Modal>}
    </div>
  )
}


export default BurgerConstructor