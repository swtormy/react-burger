import React, { useMemo } from 'react'
import styles from '../burger-constructor.module.css'
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'

const Burger = () => {
    const { constructorIngredients } = useSelector(state => state.burger_constructor);

    const buns = useMemo(
        () => constructorIngredients?.filter(ingredient => ingredient.type === 'bun'),
        [constructorIngredients])
    const otherIngredients = useMemo(
        () => constructorIngredients?.filter(ingredient => ingredient.type !== 'bun'),
        [constructorIngredients]);

    return (
        <div className={styles.burger}>
            {buns?.map((bun, index) => index === 0 && (
                <div className={styles.burger_row_block} key={`constructor_${bun._id}`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                </div>
            ))}
            <div className={styles.inner_ings}>
                {otherIngredients?.map((ing) => (
                    <div key={`constructor_${ing._id}`} className={styles.burger_row}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={ing.name}
                            price={ing.price}
                            thumbnail={ing.image_mobile}
                        />
                    </div>
                ))}
            </div>
            {buns?.map((bun, index) => index === 0 && (
                <div className={styles.burger_row_block} key={`constructor_${bun._id}`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                </div>
            ))}
        </div>
    )
}




export default Burger