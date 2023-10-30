import React, { useState } from 'react'
import styles from './ingridient-card.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';


const IngridientCard = ({ item, onOpen }) => {

    return (
        <div className={styles.card} onClick={onOpen}>
            <div className={styles.image}>
                <img src={item.image} alt="ингридиент" />
                {item.name === "Краторная булка N-200i" && <Counter count={1} size="default" extraClass="m-1" />}
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
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
    }),
    onOpen: PropTypes.func.isRequired,
}

export default IngridientCard