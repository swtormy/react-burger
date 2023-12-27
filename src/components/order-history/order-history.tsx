import React from 'react'
import styles from './order-history.module.css'
import OrderComponent from './order-component'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { connect, disconnect } from '../../services/actions/ws-actions'

type Props = {}

const OrderHistory: React.FC<Props> = ({ }) => {
  const location = useLocation()
  const token = useAppSelector(store => store.user.token)
  const dispatch = useAppDispatch()
  const ownorders = useAppSelector(store => store.socket.ownOrders?.orders)

  React.useEffect(()=>{
    if(token){
      dispatch(connect(`wss://norma.nomoreparties.space/orders?token=${token}`))
    }
  },[token, dispatch, location])


  return (
    <div className={styles.order_history}>
      {ownorders?.map(order => (
        <OrderComponent key={order._id} order={order} location={location} type='own'/>
      ))}
    </div>
  )
}

export default OrderHistory