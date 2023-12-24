import React from 'react'
import styles from './order-component.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../hooks/redux-hooks';
import { Link, useNavigate } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';

type Props = {
    order: any;
    location: any;
}

const OrderComponent: React.FC<Props> = ({ order, location }) => {
    const today = new Date()
    const ingredients = useAppSelector(store => store.ingredients.ingredientsList)
    const { openModal } = useModal();
    const navigate = useNavigate()

    const handleOrderClick = () => {

        navigate(`${order}`, { state: { previousLocation: location } });
        openModal();
    };
    return (
        <div onClick={handleOrderClick} className={styles.order_component}>
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
                            <div key={ingr} className={styles.ingredient} >
                                <img src={ingredients[ingr]?.image_mobile ?? "unknown"} />
                                {ingr === 6 && <span className={styles.ingredientCount}>
                                    <p className={[styles.ingredientCountText, "text text_type_main-default"].join(' ')}>
                                        +{ingredients.length - 5}
                                    </p></span>}
                            </div>
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