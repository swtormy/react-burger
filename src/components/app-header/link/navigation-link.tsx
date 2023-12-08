import React from 'react'
import styles from './navigation-link.module.css'
import { NavLink } from 'react-router-dom';

type Props = {
    icon: React.ReactNode,
    name: string,
    href: string,
}

const NavigationLink: React.FC<Props> = ({ icon, name, href }) => {

    return (
        <NavLink
            to={href}
            className={(navData) => navData.isActive ? [styles.link, styles.active_link].join(" ") : styles.link}
        >
            <div className={styles.link__inner}>
                {icon}
                <p className={styles.marginLeft}>
                    {name}
                </p>
            </div>
        </NavLink>
    );
}

export default NavigationLink