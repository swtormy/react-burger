import React, { useState } from 'react'
import styles from './IngridientCard.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

const IngridientCard = ({ item, onOpen }) => {
    
    return (
        <div className={styles.card} onClick={onOpen}>
            <div className={styles.image}>
                <img src={item.image} alt="img" />
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

export default IngridientCard