import React from 'react'
import styles from './order-history.module.css'
import OrderComponent from './order-component'
import { useLocation } from 'react-router-dom'
import useWebSocket from '../../hooks/useWebSocket'
import { useAppSelector } from '../../hooks/redux-hooks'

type Props = {}

const OrderHistory: React.FC<Props> = ({ }) => {
  const location = useLocation()
  const token = useAppSelector(store => store.user.token)
  const ownorders = useAppSelector(store => store.order.ownOrderList)
  const { total, totalToday } = useWebSocket(`wss://norma.nomoreparties.space/orders?token=${token}`, "own");
  return (
    <div className={styles.order_history}>
      {ownorders.map(order => (
        <OrderComponent key={order._id} order={order} location={location}/>
      ))}
    </div>
  )
}

export default OrderHistory