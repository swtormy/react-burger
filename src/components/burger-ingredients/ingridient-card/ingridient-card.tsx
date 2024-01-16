import React, { useMemo } from 'react'
import styles from './ingridient-card.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { getFileNameFromUrl, countObjectsWithId } from '../../../utils/utils-funcs';
import { useDrag } from "react-dnd";
import { useAppSelector } from '../../../hooks/redux-hooks';
import { TIngredientExtended } from '../../../utils/models';

type Props = {
    item: TIngredientExtended;
    onOpen: () => void;
}

const IngridientCard: React.FC<Props> = ({ item, onOpen }) => {
    const { constructorIngredients } = useAppSelector(store => store.burger_constructor);
    const [, ref] = useDrag({
        type: 'ingredient',
        item: { ...item },
    });

    const count = useMemo(() => countObjectsWithId(constructorIngredients, item._id), [constructorIngredients, item._id])
    return (
        <div ref={ref} className={styles.card} onClick={onOpen} data-cy={`ingridient-card-${item._id}`} >
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

export default IngridientCard