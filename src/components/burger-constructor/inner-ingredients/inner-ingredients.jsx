import React, { useMemo, useState } from 'react'
import styles from './inner-ingredients.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { removeIngredient } from '../../../services/actions/constructor'
import DraggableElement from '../draggable-element/draggable-element'
import { useDrop } from "react-dnd";
import { updateOrderIndex } from '../../../services/actions/constructor'
import { v4 as uuidv4 } from 'uuid';

const InnerIngredients = () => {
    const [hoverIndex, setHoverIndex] = useState(null);
    const dispatch = useDispatch()
    const { constructorIngredients } = useSelector(state => state.burger_constructor);
    const otherIngredients = useMemo(
        () => constructorIngredients?.filter(ingredient => ingredient.type !== 'bun'),
        [constructorIngredients]);
    const sortedOtherIngredients = useMemo(
        () => {
            return otherIngredients?.slice().sort((a, b) => a.orderIndex - b.orderIndex);
        },
        [otherIngredients]
    );
    const handleDeleteItem = (item) => {
        dispatch(removeIngredient(item.instanceId));
    }

    const [{ isOver,index }, refDrop] = useDrop({
        accept: 'constructorIng',
        drop: (item, monitor) => {
            const dragIndex = item.orderIndex;

            // const hoverIndex = index + 2;
            // dispatch(updateOrderIndex(dragIndex, index));
        },
        hover: (item, monitor) => {
            console.log(index);
            // if (!ref.current) {
            //     return
            // }
            // const dragIndex = item.orderIndex
            // const hoverIndex = index + 2
            // console.log(dragIndex, hoverIndex);
            // if (dragIndex === hoverIndex) {
            //     return
            // }

            // const hoveredRect = ref.current.getBoundingClientRect();
            // const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2
            // const mousePosition = monitor.getClientOffset()
            // const hoverClientY = mousePosition.y - hoveredRect.top

            // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            //     return
            // }
            // if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
            //     return
            // }

            // // index = hoverIndex - 2
        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    });
   
    
    return (
        <div ref={refDrop} className={styles.inner_ings}>
            {sortedOtherIngredients?.map((ing, index) => (
                <DraggableElement key={uuidv4()} index={index + 2} ing={ing} handleDeleteItem={handleDeleteItem} />
            ))}
        </div>
    )
}

export default InnerIngredients