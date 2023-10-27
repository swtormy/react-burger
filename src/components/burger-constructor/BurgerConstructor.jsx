import React, { useState } from 'react'
import styles from './BurgerConstructor.module.css'
import Burger from './burger/Burger'
import Overlay from '../modal/Overlay'
import Modal from '../modal/Modal'
import DoneSVG from './DoneSVG'
import { CurrencyIcon, Button, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerConstructor = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOrderClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <div style={{ height: "calc(100vh - 168px)", width: "100%" }}>
      <div style={{ height: "100%" }} className={styles.inner_block}>
        <Burger />
        <div style={{ height: "calc(100% - 691px)" }} >
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
        <div className={styles.done_form}>
          <div className={styles.order_num}>
            <p className="text text_type_digits-large">034536</p>
          </div>
          <div className={styles.idn_tex}>
            <p className="text text_type_main-medium">
              идентификатор заказа
            </p></div>
          <div className={styles.done_icon}><DoneSVG /></div>
          <div className={styles.done_txt}><p className="text text_type_main-default">
            Ваш заказ начали готовить
          </p></div>
          <div className={styles.desc_txt}><p className="text text_type_main-default">
            Дождитесь готовности на орбитальной станции
          </p></div>
          
        </div>
      </Modal>}
    </div>
  )
}

export default BurgerConstructor