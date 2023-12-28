import React from 'react'
import styles from "./feed-page.module.css";
import OrderComponent from '../components/order-history/order-component';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { connect, disconnect } from '../services/actions/ws-actions';


type Props = {}

const FeedPage = (props: Props) => {
  const orders = useAppSelector(store => store.socket.allOrders)
  const location = useLocation()
  
  const dispatch = useAppDispatch()

  const { done, pending } = React.useMemo(() => {
    const done = orders?.orders.filter(el => el.status === "done")
    const pending = orders?.orders.filter(el => el.status === "pending")
    return { done, pending }
  }, [orders])

  const ALL_ORDERS_LINK = 'wss://norma.nomoreparties.space/orders/all'

  React.useEffect(()=>{
    dispatch(connect(ALL_ORDERS_LINK))
    return () => {
      dispatch(disconnect())
    }
  },[])
  return (
    <div className={styles.feed_content}>
      <div className={styles.left_block}>
        <p className="text text_type_main-large">
          Лента заказов
        </p>
        <div className={styles.order_cards}>
          {orders?.orders.map(order => (
            <OrderComponent key={order._id} order={order} location={location} type='all'/>
          ))}
        </div>
      </div>
      <div className={styles.right_block}>
        <div className={styles.statuses}>
          <div className={styles.done_block}>
            <div className={styles.done_title}>
              <p className="text text_type_main-medium">
                Готовы:
              </p>
            </div>
            <div className={styles.done_body}>
              {done?.map(ordnum => (
                <p key={ordnum._id} className={["text text_type_main-medium", styles.ordnumtext].join(" ")}>
                  {ordnum.number}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.progress_block}>
            <div className={styles.progress_title}>
              <p className="text text_type_main-medium">
                В работе:
              </p>
            </div>
            <div className={styles.progress_body}>
              {pending?.map(ordnum => (
                <p key={ordnum._id} className={["text text_type_main-medium"].join(" ")}>
                  {ordnum.number}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.alltime_block}>
          <div className={styles.alltime_title}>
            <p className="text text_type_main-medium">
              Выполнено за все время:
            </p>
          </div>
          <div className={styles.alltime_body}>
            <p className={["text text_type_digits-large", styles.light_digits].join(" ")}>{orders?.total}</p>
          </div>
        </div>
        <div className={styles.today_block}>
          <div className={styles.today_title}>
            <p className="text text_type_main-medium">
              Выполнено за сегодня:
            </p>
          </div>
          <div className={styles.today_body}>
            <p className={["text text_type_digits-large", styles.light_digits].join(" ")}>{orders?.totalToday}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedPage