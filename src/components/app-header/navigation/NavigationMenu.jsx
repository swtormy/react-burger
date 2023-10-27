import React from 'react'
import styles from '../AppHeader.module.css';
import { Button, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import NavigationLink from '../link/NavigationLink';

const NavigationMenu = ({ board, setBoard }) => {
    const links = [
        {
            name: 'Конструктор',
            icon: <BurgerIcon type={board === 'Конструктор' ? "primary" : "secondary"} />
        },
        {
            name: 'Лента заказов',
            icon: <ListIcon type={board === 'Лента заказов' ? "primary" : "secondary"} />
        }
    ]
    return (
        <div className={styles.navbar}>
            {links.map((link, index) => (
                <NavigationLink
                    key={index}
                    board={board}
                    setBoard={setBoard}
                    icon={link.icon}
                    name={link.name}
                    style={index > 0 ? { marginLeft: '8px' } : {}}
                />
            ))}
        </div>
    )
}

export default NavigationMenu