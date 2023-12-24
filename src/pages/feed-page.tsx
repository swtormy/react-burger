import React from 'react'
import styles from "./feed-page.module.css";
import OrderComponent from '../components/order-history/order-component';
import { useLocation } from 'react-router-dom';


type Props = {}

const FeedPage = (props: Props) => {
  const location = useLocation()
  return (
    <div className={styles.feed_content}>
      <div className={styles.left_block}>
        <p className="text text_type_main-large">
          Лента заказов
        </p>
        <div className={styles.order_cards}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(order => (
            <OrderComponent key={order} order={order} location={location}/>
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
              {["034533", "034532", "034531", "034530", "034529"].map(ordnum => (
                <p key={ordnum} className={["text text_type_main-medium", styles.ordnumtext].join(" ")}>
                  {ordnum}
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
              {["034534", "034535", "034536"].map(ordnum => (
                <p key={ordnum} className={["text text_type_main-medium"].join(" ")}>
                  {ordnum}
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
            <p className={["text text_type_digits-large", styles.light_digits].join(" ")}>28 752</p>
          </div>
        </div>
        <div className={styles.today_block}>
          <div className={styles.today_title}>
            <p className="text text_type_main-medium">
              Выполнено за сегодня:
            </p>
          </div>
          <div className={styles.today_body}>
            <p className={["text text_type_digits-large", styles.light_digits].join(" ")}>138</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedPage