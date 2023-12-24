import React from 'react'
import styles from "./feed-detail-page.module.css"
import { useAppSelector } from '../hooks/redux-hooks'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetailComponent from '../components/order-history/order-detail-component'

type Props = {}

const FeedDetailPage = (props: Props) => {
  
  return (
    <div className={styles.order_in_page}>
      <OrderDetailComponent />
    </div>
  )
}

export default FeedDetailPage