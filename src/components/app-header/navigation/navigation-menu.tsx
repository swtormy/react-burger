import React from 'react'
import styles from './navigation-menu.module.css';
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import NavigationLink from '../link/navigation-link';

type Props = {
    board: string;
    setBoard: React.Dispatch<React.SetStateAction<string>>;
}

const NavigationMenu: React.FC<Props> = ({ board, setBoard }) => {
    const links = [
        {
            name: 'Конструктор',
            href: "/",
            icon: <BurgerIcon type={"secondary"} />
        },
        {
            name: 'Лента заказов',
            href: "orders",
            icon: <ListIcon type={"secondary"} />
        }
    ]
    return (
        <div className={styles.navbar}>
            {links.map((link, index) => (
                <NavigationLink
                    key={index}
                    href={link.href}
                    icon={link.icon}
                    name={link.name}
                />
            ))}
        </div>
    )
}


export default NavigationMenu