import React, { useEffect } from 'react'
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

  const { constructorIngredients, totalPrice } = useSelector(store => store.burger_constructor);
  const { order } = useSelector(store => store.order);

  

  const handleOrder = () => {
    const constIng = constructorIngredients?.map(ingredient => ingredient._id);
    dispatch(createOrder(constIng));
  };

  useEffect(() => {
    order && openModal(order)
  }, [order])

  
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
              <Button htmlType="button" type="primary" size="medium" onClick={handleOrder}>
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