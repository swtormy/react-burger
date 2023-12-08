import React from 'react'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './draggable-element.module.css'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from "react-dnd";
import { TDraggableElement } from '../../../utils/models';


const DraggableElement: React.FC<TDraggableElement> = ({ isHover, ing, handleDeleteItem, setHoveredId }) => {

    const [{ isDragging }, drag] = useDrag({
        type: 'constructorIng',
        item: { ...ing },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        }),
        end: () => {
            setHoveredId(null)
        }
    });

    const handleDeleteElementToClose = () => {
        handleDeleteItem(ing);
    };

    return (
        <div
            className={`${styles.burger_row} ${isDragging || isHover ? styles.opacity_on : ""}`}
            ref={drag}

        >
            <DragIcon type="primary" />
            <ConstructorElement
                text={ing.name}
                price={ing.price}
                thumbnail={ing.image_mobile}
                handleClose={handleDeleteElementToClose}
            />
        </div>

    );
};



export default DraggableElement