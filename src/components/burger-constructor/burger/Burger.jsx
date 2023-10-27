import React from 'react'
import styles from '../BurgerConstructor.module.css'
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { data } from '../../../utils/data'

const Burger = () => {
    return (
        <div style={{ height: "591px" }} className={styles.burger}>
            <div className={styles.burger_row_block}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02-mobile.png'}
                />
            </div>
            <div style={{ height: "" }} className={styles.inner_ings}>
                {data.slice(1,6).map(ing => (
                    <div className={styles.burger_row}>
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

export default Burger