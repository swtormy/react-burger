import React from 'react'
import styles from './navigation-menu.module.css';
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import NavigationLink from '../link/navigation-link';
import PropTypes from 'prop-types';


const NavigationMenu = ({ board, setBoard }) => {
    const links = [
        {
            name: 'Конструктор',
            href: "/",
            icon: <BurgerIcon type={board === 'Конструктор' ? "primary" : "secondary"} />
        },
        {
            name: 'Лента заказов',
            href: "orders",
            icon: <ListIcon type={board === 'Лента заказов' ? "primary" : "secondary"} />
        }
    ]
    return (
        <div className={styles.navbar}>
            {links.map((link, index) => (
                <NavigationLink
                    key={index}
                    board={board}
                    href={link.href}
                    setBoard={setBoard}
                    icon={link.icon}
                    name={link.name}
                    style={index > 0 ? { marginLeft: '8px' } : {}}
                />
            ))}
        </div>
    )
}

NavigationMenu.propTypes = {
    board: PropTypes.string.isRequired,
    setBoard: PropTypes.func.isRequired,
}

export default NavigationMenu