import React from 'react'
import styles from './order-details.module.css'
import DoneSVG from '../../burger-constructor/done-svg'
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../../hooks/redux-hooks';

type Props = {}

const OrderDetails: React.FC<Props> = ({}) => {
  const orderNumber = useAppSelector(state => state.order.order);
  return (
    <div className={styles.done_form}>
      <div className={styles.order_num}>
        <p className="text text_type_digits-large" data-cy={"order-number"}>{orderNumber}</p>
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
  )
}


export default OrderDetails