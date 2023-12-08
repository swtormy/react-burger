import React, { useMemo, useRef, useState } from 'react'
import styles from './inner-ingredients.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { removeIngredient } from '../../../services/actions/constructor'
import DraggableElement from '../draggable-element/draggable-element'
import { useDrop } from "react-dnd";
import { updateOrderIndex } from '../../../services/actions/constructor'
import { getHovIndex } from '../../../utils/utils-funcs'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks'
import { TIngredientExtended } from '../../../utils/models'

type Props = {}

const InnerIngredients: React.FC<Props> = ({ }) => {

    const [hoveredId, setHoveredId] = useState<number | null>(null)
    const dispatch = useAppDispatch()
    const { constructorIngredients } = useAppSelector(state => state.burger_constructor);

    const otherIngredients = useMemo(
        () => {
            const constIngs = constructorIngredients as TIngredientExtended[]
            return constIngs?.filter(ingredient => ingredient.type !== 'bun')
        },
        [constructorIngredients]);


    const handleDeleteItem = (item: TIngredientExtended) => {
        dispatch(removeIngredient(item.instanceId));
    }
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [_, drop] = useDrop({
        accept: 'constructorIng',
        drop: (item: TIngredientExtended, monitor) => {

            const hoveredElement = getHovIndex(monitor, itemRefs)
            if (hoveredElement) {
                const hoveredIndex = otherIngredients.findIndex(ing => ing.instanceId === hoveredElement.dataset.id);
                const constIngs = constructorIngredients as TIngredientExtended[]
                const hInd = constIngs.some(ing => ing.type === "bun") ? hoveredIndex + 2 : hoveredIndex
                dispatch(updateOrderIndex(item.orderIndex, hInd))
            }
        },
        hover: (item: TIngredientExtended, monitor) => {
            const hoveredElement = getHovIndex(monitor, itemRefs)
            if (hoveredElement) {
                const hoveredIndex = otherIngredients.findIndex(ing => ing.instanceId === hoveredElement.dataset.id);
                const constIngs = constructorIngredients as TIngredientExtended[]
                const hInd = constIngs.some(ing => ing.type === "bun") ? hoveredIndex + 2 : hoveredIndex
                setHoveredId(hInd)
            }
        }
    })



    return (
        <div ref={drop} className={styles.inner_ings}>
            {otherIngredients?.map((ing, index) => (
                <div key={uuidv4()} ref={el => itemRefs.current[index] = el} data-id={ing.instanceId}>
                    <DraggableElement key={uuidv4()} isHover={hoveredId === ing.orderIndex} ing={ing} handleDeleteItem={handleDeleteItem} setHoveredId={setHoveredId} />
                </div>
            ))}
        </div>
    )
}

export default InnerIngredients