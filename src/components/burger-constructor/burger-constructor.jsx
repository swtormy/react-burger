import React, { useState } from 'react'
import styles from './burger-constructor.module.css'
import Burger from './burger/burger'
import Overlay from '../modal/modal-overlay'
import Modal from '../modal/modal'
import OrderDetails from '../modal/modal-children/order-details'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

const BurgerConstructor = ({ ingredients }) => {
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
              <Button htmlType="button" type="primary" size="medium" onClick={handleOrderClick}>
                Оформить заказ
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <Modal onClose={handleCloseModal}>
        <OrderDetails />
      </Modal>}
    </div>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    })
  ).isRequired
};

export default BurgerConstructor