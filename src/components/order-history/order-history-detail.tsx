import React from 'react'
import OrderDetailComponent from './order-detail-component'
import styles from "./order-history-detail.module.css"

type Props = {}

const OrderHistoryDetail = (props: Props) => {
  return (
    <div className={styles.order_in_page}>
      <OrderDetailComponent />
    </div>
  )
}

export default OrderHistoryDetail