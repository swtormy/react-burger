import React, { useState } from 'react'
import styles from './burger-constructor.module.css'
import Burger from './burger/burger'
import Overlay from '../modal/overlay'
import Modal from '../modal/modal'
import OrderDetails from '../modal/modal-children/order-details'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'


const BurgerConstructor = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOrderClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <div className={styles.burger_constructor}>
      <div className={styles.inner_block}>
        <Burger />
        <div className={styles.result_block} >
          <div className={styles.result}>
            <div className={styles.price}>
              <p className="text text_type_digits-medium">{610}</p>
              <div className={styles.currency}>
                <CurrencyIcon type="primary" />
              </div>
            </div>
            <div className={styles.button}>
              <Button htmlType="button" type="primary" size="medium" onClick={handleOrderClick}>
                Оформить заказ
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <Overlay />}
      {isModalOpen && <Modal onClose={handleCloseModal}>
        <OrderDetails />
      </Modal>}
    </div>
  )
}

export default BurgerConstructor