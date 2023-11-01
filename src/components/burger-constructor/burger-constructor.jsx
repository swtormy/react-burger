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
import { createOrder } from '../../utils/burger-api'

const initialState = {
  selectedIngredients: [],
  totalPrice: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      if (action.payload && typeof action.payload.price === 'number') {
        return {
          ...state,
          selectedIngredients: [...state.selectedIngredients, action.payload],
          totalPrice: state.totalPrice + action.payload.price,
        };
      }
      return state;
    case 'REMOVE_INGREDIENT':
      if (action.payload && typeof action.payload.price === 'number') {
        const updatedIngredients = state.selectedIngredients.filter(
          (ingredient) => ingredient.id !== action.payload.id
        );
        return {
          ...state,
          selectedIngredients: updatedIngredients,
          totalPrice: state.totalPrice - action.payload.price,
        };
      }
      return state;
    default:
      return state;
  }
};

const BurgerConstructor = () => {
  const { isModalOpen, openModal, orderNumber, closeModal } = useModal();
  const { ingredients } = useContext(IngredientsContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    ingredients.filter(ing => ing.type !== 'bun').forEach(ingredient => {
      dispatch({ type: 'ADD_INGREDIENT', payload: ingredient });
    });
    const bun = ingredients.find(ing => ing.type === 'bun')
    dispatch({ type: 'ADD_INGREDIENT', payload: bun });

  }, [ingredients]);

  const handleOrder = () => {
    const selectedIngredientIds = state.selectedIngredients.map(ingredient => ingredient._id);
    createOrder(selectedIngredientIds)
      .then(orderNumber => {
        openModal(orderNumber);
      })
      .catch(error => {
        console.error('Ошибка: ', error);
      });
  };
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
              <Button htmlType="button" type="primary" size="medium" onClick={handleOrder}>
                Оформить заказ
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <Modal onClose={closeModal}>
        <OrderDetails orderNumber={orderNumber} />
      </Modal>}
    </div>
  )
}


export default BurgerConstructor