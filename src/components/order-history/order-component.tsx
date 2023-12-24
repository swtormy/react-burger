import React from 'react'
import styles from './order-component.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../hooks/redux-hooks';
import { Link, useNavigate } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import { Order, TIngredientExtended } from '../../utils/models';

type Props = {
    order: Order;
    location: string;
}

const calculateOrderSum = (orderIngs: TIngredientExtended[]) => {
    const bun = orderIngs.find(el => el.type === "bun")
    const other = orderIngs.filter(el => el.type !== "bun")
    const totalPrice = other.reduce((total, item) => total + item.price, 0);
    if (bun) {
        return totalPrice + (bun.price * 2)
    }
    return totalPrice
}

const OrderComponent: React.FC<Props> = ({ order, location }) => {
    const ingredients = useAppSelector(store => store.ingredients.ingredientsList)
    const { openModal } = useModal();
    const navigate = useNavigate()

    const handleOrderClick = () => {
        navigate(`${order.number}`, { state: { previousLocation: location } });
        openModal();
    };

    const orderIng = React.useMemo(() => {
        return ingredients.filter(el => order.ingredients.includes(el._id))
    }, [ingredients])

    return (
        <div onClick={handleOrderClick} className={styles.order_component}>
            <div className={styles.title}>
                <p className="text text_type_main-default">
                    #{order.number}
                </p>
                <p className={["text text_type_main-default", styles.intext_color].join(" ")}>
                    <FormattedDate
                        date={
                            new Date(
                                order.createdAt
                            )
                        }
                    />
                </p>
            </div>
            <div className={styles.name}>
                <p className="text text_type_main-medium">
                    {order.name}
                </p>
            </div>
            <div className={styles.info}>
                <div className={styles.ingredients}>
                    {
                        orderIng.map((ingr, index) => (
                            <div key={ingr._id} className={styles.ingredient} >
                                <img src={ingr?.image_mobile ?? "unknown"} />
                                {index === 6 && <span className={styles.ingredientCount}>
                                    <p className={[styles.ingredientCountText, "text text_type_main-default"].join(' ')}>
                                        +{orderIng.length - 5}
                                    </p></span>}
                            </div>
                        ))
                    }
                </div>
                <div className={styles.price}>
                    <p className="text text_type_main-medium">
                        {calculateOrderSum(orderIng)}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default OrderComponent