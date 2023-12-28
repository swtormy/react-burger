import React from 'react'
import styles from "./feed-detail-page.module.css"
import { useAppSelector } from '../hooks/redux-hooks'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetailComponent from '../components/order-history/order-detail-component'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/modal/modal'

type Props = {
  modal: boolean;
}

const FeedDetailPage:React.FC<Props> = ({modal}) => {
  const navigate = useNavigate()
  
  if (modal) return <Modal onClose={() => navigate("/feed")}>
    <OrderDetailComponent />
  </Modal>
  return (
    <div className={styles.order_in_page}>
      <OrderDetailComponent />
    </div>
  )
}

export default FeedDetailPage