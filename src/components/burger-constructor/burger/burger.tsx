import React, { useMemo } from 'react'
import styles from '../burger-constructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { addBuns, addIngredient } from '../../../services/actions/constructor'
import { useDrop } from "react-dnd";
import InnerIngredients from '../inner-ingredients/inner-ingredients'
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks'
import { TIngredientExtended } from '../../../utils/models';

type Props = {}

const Burger:React.FC<Props> = ({}) => {
    const { constructorIngredients } = useAppSelector(state => state.burger_constructor);
    const dispatch = useAppDispatch()

    const bun = useMemo(
        () => {
            const constIng = constructorIngredients as TIngredientExtended[]
            return constIng.find(item => item.type === 'bun')
        },
        [constructorIngredients]);


    const [, refDrop] = useDrop({
        accept: 'ingredient',
        drop: (item: TIngredientExtended) => {
            if (item.type === 'bun') {
                dispatch(addBuns(item))
            } else {
                dispatch(addIngredient(item));
            }
        },

    });



    return (
        <div ref={refDrop} className={styles.burger}>
            {bun && <div className={styles.burger_row_block} key={`constructor_${uuidv4()}`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                />
            </div>}
            <InnerIngredients />
            {bun && <div className={styles.burger_row_block} key={`constructor_${uuidv4()}`}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                />
            </div>}
        </div>
    )
}




export default Burger