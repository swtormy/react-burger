import React, { useEffect, useMemo } from 'react'
import styles from './burger-constructor.module.css'
import Burger from './burger/burger'
import Modal from '../modal/modal'
import OrderDetails from '../modal/modal-children/order-details'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useModal } from '../../hooks/useModal'
import { createOrder } from '../../services/actions/order'
import { useNavigate } from 'react-router-dom'
import { saveRedirectPath } from '../../services/actions/user'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { TIngredientExtended } from '../../utils/models'

type Props = {}

const BurgerConstructor: React.FC<Props> = ({ }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  const { constructorIngredients } = useAppSelector(store => store.burger_constructor);
  const { isLoading, order } = useAppSelector(store => store.order);
  const { token } = useAppSelector(store => store.user);


  const { bun, notBuns, disabled, totalPrice } = useMemo(() => {
    const constIngs = constructorIngredients as TIngredientExtended[]
    const bun = constIngs.find(ingredient => ingredient.type === 'bun')
    const notBuns = constIngs.filter(ingredient => ingredient.type !== 'bun')
    const disabled = constIngs.length === 0 || !bun
    const totalPrice = constIngs.reduce((total, item) => total + item.price, 0);
    return { bun, notBuns, disabled, totalPrice }
  }, [constructorIngredients]);

  const handleOrder = () => {
    if (!token) {
      dispatch(saveRedirectPath('/'))
      return navigate('/login')
    }
    if (!disabled && bun) {
      const ingredientsIds = [bun._id, ...notBuns.map(ingredient => ingredient._id), bun._id];
      dispatch(createOrder(ingredientsIds));
    } else {
      console.error("неправильно собран заказ")
    }
  };

  useEffect(() => {
    if (isLoading || order) {
      openModal();
    }
  }, [isLoading, order, openModal]);


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
              <Button disabled={disabled} htmlType="button" type="primary" size="medium" onClick={handleOrder} data-cy={"make-an-order"}>
                Оформить заказ
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {isLoading ? (
            <div>Загрузка...</div>
          ) : (
            <OrderDetails />
          )}
        </Modal>
      )}
    </div>
  )
}


export default BurgerConstructor