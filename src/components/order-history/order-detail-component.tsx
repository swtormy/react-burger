import React from 'react'
import { useAppSelector } from '../../hooks/redux-hooks'
import styles from "./order-detail-component.module.css"
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'

type Props = {}

const OrderDetailComponent = (props: Props) => {
    const ingredients = useAppSelector(store => store.ingredients.ingredientsList)
    const today = new Date()
    return (
        <div className={styles.order_detail}>
            <div className={styles.order_number}>
                <p className="text text_type_main-default">
                    #034533
                </p>
            </div>
            <div className={styles.order_name}>
                <p className="text text_type_main-medium">
                    Black Hole Singularity острый бургер
                </p>
            </div>
            <div className={styles.order_status}>
                <p className="text text_type_main-default">
                    Выполнен
                </p>
            </div>
            <div className={styles.order_composition_title}>
                <p className="text text_type_main-medium">
                    Состав:
                </p>
            </div>
            <div className={styles.order_composition_body}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(el => (
                    <div key={el} className={styles.order_ingr}>
                        <div className={styles.order_desc}>
                            <div className={styles.ing_circle} >
                                <img src={ingredients[el]?.image_mobile ?? "unknown"} className={styles.img_in_circle} />
                            </div>
                            <div className={styles.order_name}>
                                <p className="text text_type_main-default">
                                    {ingredients[el]?.name}
                                </p>
                            </div>
                        </div>
                        <div className={styles.ing_order_price}>
                            <p className="text text_type_digits-default">
                                2x300
                            </p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.order_price}>
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
                <div className={styles.price}>
                    <p className="text text_type_digits-default">510</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default OrderDetailComponent