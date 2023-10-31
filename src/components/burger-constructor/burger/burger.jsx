import React from 'react'
import styles from '../burger-constructor.module.css'
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { ingredientType } from '../../../utils/types';

const Burger = ({ingredients}) => {
    return (
        <div className={styles.burger}>
            <div className={styles.burger_row_block}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'}
                />
            </div>
            <div className={styles.inner_ings}>
                {ingredients.slice(1,6).map((ing, index) => (
                    <div key={ing._id} className={styles.burger_row}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={ing.name}
                            price={ing.price}
                            thumbnail={ing.image_mobile}
                        />
                    </div>
                ))}
            </div>
            <div className={styles.burger_row_block}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'}
                />
            </div>
        </div>
    )
}

Burger.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  };

  
export default Burger