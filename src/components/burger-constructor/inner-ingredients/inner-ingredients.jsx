import React, { useMemo, useRef, useState, useEffect } from 'react'
import styles from './inner-ingredients.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { removeIngredient } from '../../../services/actions/constructor'
import DraggableElement from '../draggable-element/draggable-element'
import { useDrop } from "react-dnd";
import { updateOrderIndex } from '../../../services/actions/constructor'
import { getHovIndex } from '../../../utils/utils-funcs'
import { v4 as uuidv4 } from 'uuid'

const InnerIngredients = () => {

    const [hoveredId, setHoveredId] = useState(null)
    const dispatch = useDispatch()
    const { constructorIngredients } = useSelector(state => state.burger_constructor);

    const otherIngredients = useMemo(
        () => constructorIngredients?.filter(ingredient => ingredient.type !== 'bun'),
        [constructorIngredients]);


    const handleDeleteItem = (item) => {
        dispatch(removeIngredient(item.instanceId));
    }
    const itemRefs = useRef([]);
    const [{ }, drop] = useDrop({
        accept: 'constructorIng',
        drop: (item, monitor) => {

            const hoveredElement = getHovIndex(monitor, itemRefs)
            if (hoveredElement) {
                const hoveredIndex = otherIngredients.findIndex(ing => ing.instanceId === hoveredElement.dataset.id);
                const hInd = constructorIngredients.some(ing => ing.type === "bun") ? hoveredIndex + 2 : hoveredIndex
                dispatch(updateOrderIndex(item.orderIndex, hInd))
            }
        },
        hover: (item, monitor) => {
            const hoveredElement = getHovIndex(monitor, itemRefs)
            if (hoveredElement) {
                const hoveredIndex = otherIngredients.findIndex(ing => ing.instanceId === hoveredElement.dataset.id);
                const hInd = constructorIngredients.some(ing => ing.type === "bun") ? hoveredIndex + 2 : hoveredIndex
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