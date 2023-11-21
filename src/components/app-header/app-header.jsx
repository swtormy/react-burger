import React, { useState } from 'react'
import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import NavigationMenu from './navigation/navigation-menu'
import NavigationLink from './link/navigation-link'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'

const AppHeader = () => {
    const [board, setBoard] = useState("Конструктор")
    return (
        <header className={styles.header}>
            <div className={styles.header_container}>
                <NavigationMenu board={board} setBoard={setBoard} />
                <div className={styles.logo}>
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <NavigationLink
                    board={board}
                    href="/profile"
                    setBoard={setBoard}
                    icon={<ProfileIcon type={board === 'Личный кабинет' ? "primary" : "secondary"} />}
                    name={'Личный кабинет'}
                />
            </div>
        </header>
    )
}

export default AppHeader
