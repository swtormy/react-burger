import React from 'react'
import styles from './AppHeader.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {
    return (
        <header className={styles.header}>

            <Logo />
        </header>
    )
}

export default AppHeader
