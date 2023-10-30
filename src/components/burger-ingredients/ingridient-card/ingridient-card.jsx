import React, { useState } from 'react'
import styles from './ingridient-card.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

export interface IItem {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

interface IIngridientCardProps {
    item: IItem;
    onOpen: () => void;
}

const IngridientCard: React.FC<IIngridientCardProps> = ({ item, onOpen }) => {
    
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

export default IngridientCard