import React from 'react'
import OrderDetailComponent from './order-detail-component'
import styles from "./order-history-detail.module.css"
import Modal from '../modal/modal';
import { useNavigate } from 'react-router-dom';

type Props = {
  modal: boolean;
}

const OrderHistoryDetail: React.FC<Props> = ({ modal }) => {
  const navigate = useNavigate()
  console.log(modal);
  
  if (modal) return <Modal onClose={() => navigate("/profile/orders")}>
    <OrderDetailComponent />
  </Modal>
  return (
    <div className={styles.order_in_page}>
      <OrderDetailComponent />
    </div>
  )
}

export default OrderHistoryDetail