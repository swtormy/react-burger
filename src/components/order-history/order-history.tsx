import React from 'react'
import styles from './order-history.module.css'
import OrderComponent from './order-component'
import { useLocation } from 'react-router-dom'

type Props = {}

const OrderHistory: React.FC<Props> = ({ }) => {
  const location = useLocation()
  return (
    <div className={styles.order_history}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(order => (
        <OrderComponent key={order} order={order} location={location}/>
      ))}
    </div>
  )
}

export default OrderHistory