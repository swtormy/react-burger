import React from 'react'
import styles from './order-component.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

type Props = {
    order: any;
}

const OrderComponent: React.FC<Props> = ({ order }) => {
    const today = new Date()
    return (
        <div className={styles.order_component}>
            <div className={styles.title}>
                <p className="text text_type_main-default">
                    #034535
                </p>
                <p className={["text text_type_main-default", styles.intext_color].join(" ")}>
                    <FormattedDate
                        date={
                            new Date(
                                today.getFullYear(),
                                today.getMonth(),
                                today.getDate(),
                                today.getHours(),
                                today.getMinutes() - 1,
                                0,
                            )
                        }
                    />
                </p>
            </div>
            <div className={styles.name}>
                <p className="text text_type_main-medium">
                    OrderComponent
                </p>
            </div>
            <div className={styles.info}>
                <div className={styles.ingredients}>
                    {
                        [1, 2, 3, 4, 5, 6].map(ingr => (
                            <div key={ingr} className={styles.ingredient}>{ingr === 6 && '+3'}</div>
                        ))
                    }
                </div>
                <div className={styles.price}>
                    <p className="text text_type_main-medium">
                        480
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default OrderComponent