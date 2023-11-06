import React, { useMemo } from 'react'
import styles from '../burger-constructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import { addIngredient, removeIngredient } from '../../../services/actions/constructor'
import { useDrop } from "react-dnd";
import InnerIngredients from '../inner-ingredients/inner-ingredients'

const Burger = () => {
    const { constructorIngredients } = useSelector(state => state.burger_constructor);
    const dispatch = useDispatch()




    const [, refDrop] = useDrop({
        accept: 'ingredient',
        drop: (item) => {
            if (item.type === 'bun') {
                const currentBuns = constructorIngredients.filter(ingredient => ingredient.type === 'bun');
                currentBuns.forEach(bun => dispatch(removeIngredient(bun.instanceId)));

                dispatch(addIngredient({ ...item, position: 'top' }));
                dispatch(addIngredient({ ...item, position: 'bottom' }));
            } else {
                dispatch(addIngredient(item));
            }
        },

    });



    return (
        <div ref={refDrop} className={styles.burger}>
            {constructorIngredients?.map((ingredient) => (
                ingredient.type === 'bun' && ingredient.position === 'top' && (
                    <div className={styles.burger_row_block} key={`constructor_${ingredient._id}`}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${ingredient.name} (верх)`}
                            price={ingredient.price}
                            thumbnail={ingredient.image_mobile}
                        />
                    </div>
                )
            ))}
            <InnerIngredients />
            {constructorIngredients?.map((ingredient) => (
                ingredient.type === 'bun' && ingredient.position === 'bottom' && (
                    <div className={styles.burger_row_block} key={`constructor_${ingredient._id}`}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${ingredient.name} (низ)`}
                            price={ingredient.price}
                            thumbnail={ingredient.image_mobile}
                        />
                    </div>
                )
            ))}
        </div>
    )
}




export default Burger