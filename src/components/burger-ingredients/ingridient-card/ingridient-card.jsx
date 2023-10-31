import React, { useState } from 'react'
import styles from './ingridient-card.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { ingredientType } from '../../../utils/types';
import { getFileNameFromUrl } from '../../../utils/utils-funcs';

const IngridientCard = ({ item, onOpen }) => {

    return (
        <div className={styles.card} onClick={onOpen}>
            <div className={styles.image}>
                <img src={item.image} alt={getFileNameFromUrl(item.image)} />
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
    item: ingredientType.isRequired,
    onOpen: PropTypes.func.isRequired,
}

export default IngridientCard