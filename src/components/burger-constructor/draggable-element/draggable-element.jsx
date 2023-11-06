import React, { useRef, useState, useEffect } from 'react'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './draggable-element.module.css'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { ingredientExtendedType } from '../../../utils/types';
import { useDispatch } from 'react-redux'
import { useDrop, useDrag } from "react-dnd";
import { updateOrderIndex } from '../../../services/actions/constructor'
import { v4 as uuidv4 } from 'uuid';

const DraggableElement = ({ index, ing, handleDeleteItem }) => {
    const dispatch = useDispatch();
    const ref = useRef(null)
    const [drIndex, setDrIndex] = useState(null)
    const [hoIndex, setHoIndex] = useState(null)
    const [droped, setDroped] = useState(false)


    


    const [{ isDragging }, drag] = useDrag({
        type: 'constructorIng',
        item: { ...ing },
        collect: monitor => ({
            isDragging: !!monitor.isDragging
        })
    });

    // drag(refDrop(ref))

    return (
        <div ref={drag} key={uuidv4()} className={styles.burger_row}  >
            <DragIcon type="primary" />
            <ConstructorElement
                text={ing.name}
                price={ing.price}
                thumbnail={ing.image_mobile}
                handleClose={() => handleDeleteItem(ing)}
            />
        </div>

    );
};

DraggableElement.propTypes = {
    index: PropTypes.number.isRequired,
    ing: ingredientExtendedType.isRequired,
    handleDeleteItem: PropTypes.func.isRequired,
}

export default DraggableElement