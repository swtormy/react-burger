import React from 'react'
import styles from '../AppHeader.module.css'

const NavigationLink = ({ icon, name, style, href, board, setBoard }) => {
    const isActive = board === name;
    const linkStyles = isActive ? { color: '#F2F2F3', fill: '#F2F2F3' } : {};
    return (
        <a
            href={href}
            style={{...style, ...linkStyles}}
            className={styles.link}
            onClick={() => setBoard(name)}
        >
            <div className={styles.link__inner}>
                {icon}
                <p className={styles.marginLeft}>
                    {name}
                </p>
            </div>
        </a>
    );
}

export default NavigationLink