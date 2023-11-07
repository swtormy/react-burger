import React, { useMemo } from 'react'
import styles from './ingridient-card.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { ingredientType } from '../../../utils/types';
import { getFileNameFromUrl, countObjectsWithId } from '../../../utils/utils-funcs';
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux'

const IngridientCard = ({ item, onOpen }) => {
    const { constructorIngredients } = useSelector(store => store.burger_constructor);
    const [, ref] = useDrag({
        type: 'ingredient',
        item: { ...item },
    });

    const count = useMemo(() => countObjectsWithId(constructorIngredients, item._id), [constructorIngredients, item._id])
    return (
        <div ref={ref} className={styles.card} onClick={onOpen}>
            <div className={styles.image}>
                <img src={item.image} alt={getFileNameFromUrl(item.image)} />
                {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
            </div>
            <div className={styles.price_block}>
                <p className="text text_type_digits-default">{item.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <div className={styles.name_block}>
                <p className="text text_type_main-default">
                    {item.name}
                </p>
            </div>

        </div>
    )
}

IngridientCard.propTypes = {
    item: ingredientType.isRequired,
    onOpen: PropTypes.func.isRequired,
}

export default IngridientCard