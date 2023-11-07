import React, { useEffect, useMemo } from 'react'
import styles from './burger-constructor.module.css'
import Burger from './burger/burger'
import Modal from '../modal/modal'
import OrderDetails from '../modal/modal-children/order-details'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useModal } from '../../hooks/useModal'
import { createOrder } from '../../services/actions/order'
import { useDispatch, useSelector } from 'react-redux'



const BurgerConstructor = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const dispatch = useDispatch();

  const { constructorIngredients } = useSelector(store => store.burger_constructor);
  const { order } = useSelector(store => store.order);

  const { bun, notBuns, disabled, totalPrice } = useMemo(() => {
    const bun = constructorIngredients.find(ingredient => ingredient.type === 'bun') 
    const notBuns = constructorIngredients.filter(ingredient => ingredient.type !== 'bun')
    const disabled = constructorIngredients.length === 0 || !bun  
    const totalPrice = constructorIngredients.reduce((total, item) => total + item.price, 0);
    return { bun, notBuns, disabled, totalPrice }
  }, [constructorIngredients]);

  const handleOrder = () => {
    if (!disabled) {
      const ingredientsIds = [bun._id, ...notBuns.map(ingredient => ingredient._id), bun._id];
      dispatch(createOrder(ingredientsIds));
    } else {
      console.error("неправильно собран заказ")
    }
  };

  useEffect(() => {
    if (order) {
      openModal(order)
    }
  }, [order, openModal])


  return (
    <div className={styles.burger_constructor}>
      <div className={styles.inner_block}>
        <Burger />
        <div className={styles.result_block} >
          <div className={styles.result}>
            <div className={styles.price}>
              <p className="text text_type_digits-medium">{totalPrice}</p>
              <div className={styles.currency}>
                <CurrencyIcon type="primary" />
              </div>
            </div>
            <div className={styles.button}>
              <Button disabled={disabled} htmlType="button" type="primary" size="medium" onClick={handleOrder}>
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