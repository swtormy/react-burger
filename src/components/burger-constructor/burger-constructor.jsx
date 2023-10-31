import React, { useState } from 'react'
import styles from './burger-constructor.module.css'
import Burger from './burger/burger'
import { ingredientType } from '../../utils/types';
import Modal from '../modal/modal'
import OrderDetails from '../modal/modal-children/order-details'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { useModal } from '../../hooks/useModal'

const BurgerConstructor = ({ ingredients }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <div className={styles.burger_constructor}>
      <div className={styles.inner_block}>
        <Burger ingredients={ingredients} />
        <div className={styles.result_block} >
          <div className={styles.result}>
            <div className={styles.price}>
              <p className="text text_type_digits-medium">{610}</p>
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

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerConstructor