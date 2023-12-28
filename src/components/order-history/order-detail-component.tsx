import React from 'react'
import { useAppSelector } from '../../hooks/redux-hooks'
import styles from "./order-detail-component.module.css"
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate, useParams } from 'react-router-dom'
import { calculateOrderSum } from './order-component'
import { fetchOrder } from '../../utils/burger-api'
import { Order } from '../../utils/models'

type Props = {
}

const OrderDetailComponent:React.FC<Props> = ({}) => {
    const { number: order_number } = useParams()
    const [orders, setOrders] = React.useState<Order[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (order_number) {
            setIsLoading(true);
            fetchOrder(order_number)
                .then(response => {
                    setOrders(response.orders);
                })
                .finally(() => setIsLoading(false))
                .catch(error => {
                    if (error === 'unauthorized') {
                        navigate('/login');
                    }
                });
        }
    }, [order_number]);

    const ingredients = useAppSelector(store => store.ingredients.ingredientsList)
    const {needIngs, order: need_order} = React.useMemo(() => {
        if (order_number) {
            const order = orders?.find(el => el.number === parseInt(order_number))
            const needIngs = ingredients.filter(el => order?.ingredients.includes(el._id))
            return {needIngs, order}
        }
        return {}
    }, [orders])

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className={styles.order_detail}>
            <div className={styles.order_number}>
                <p className="text text_type_main-default">
                    {need_order?.number}
                </p>
            </div>
            <div className={styles.order_name}>
                <p className="text text_type_main-medium">
                    {need_order?.name}
                </p>
            </div>
            <div className={styles.order_status}>
                <p className="text text_type_main-default">
                    {need_order?.status === "done" ? "Выполнен" : "В процессе"}
                </p>
            </div>
            <div className={styles.order_composition_title}>
                <p className="text text_type_main-medium">
                    Состав:
                </p>
            </div>
            <div className={styles.order_composition_body}>
                {needIngs?.map(el => (
                    <div key={el._id} className={styles.order_ingr}>
                        <div className={styles.order_desc}>
                            <div className={styles.ing_circle} >
                                <img src={el?.image_mobile ?? "unknown"} className={styles.img_in_circle} />
                            </div>
                            <div className={styles.order_name}>
                                <p className="text text_type_main-default">
                                    {el?.name}
                                </p>
                            </div>
                        </div>
                        <div className={styles.ing_order_price}>
                            <p className="text text_type_digits-default">
                                {el.type === "bun" ? 2 : orders.find(el => el.number===parseInt(order_number!))?.ingredients.filter(ing => ing === el._id).length}x{el.price}
                            </p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.order_price}>
                <p className={["text text_type_main-default", styles.intext_color].join(" ")}>
                    {need_order && <FormattedDate
                        date={
                            new Date(
                                need_order.createdAt
                            )
                        }
                    />}
                </p>
                <div className={styles.price}>
                    <p className="text text_type_digits-default">{needIngs && calculateOrderSum(needIngs)}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default OrderDetailComponent