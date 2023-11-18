import React from 'react'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './draggable-element.module.css'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { ingredientExtendedType } from '../../../utils/types';
import { useDrag } from "react-dnd";

const DraggableElement = ({ isHover, ing, handleDeleteItem, setHoveredId }) => {

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

DraggableElement.propTypes = {
    isHover: PropTypes.bool.isRequired,
    ing: ingredientExtendedType.isRequired,
    handleDeleteItem: PropTypes.func.isRequired,
    setHoveredId: PropTypes.func.isRequired,
}

export default DraggableElement