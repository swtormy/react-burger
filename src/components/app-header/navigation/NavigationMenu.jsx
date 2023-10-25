import React from 'react'
import { Button, BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const NavigationMenu = () => {
    const links = [
        {
            name: 'Конструктор',
            icon: <BurgerIcon type="primary" />
        },
        {
            name: 'Лента заказов',
            icon: <BurgerIcon type="primary" />
        }
    ]
    return (
        <div>
            {links.map(link => (
                <Button htmlType="button" type="secondary" size="medium">
                    <div className={styles.button__inner}>
                        {link.icon}
                        <p style={{ marginLeft: '8px' }}>
                            {link.name}
                        </p>
                    </div>
                </Button>
            ))}
        </div>
    )
}

export default NavigationMenu