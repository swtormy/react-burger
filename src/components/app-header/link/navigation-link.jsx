import React from 'react'
import styles from './navigation-link.module.css'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NavigationLink = ({ icon, name, href }) => {

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
NavigationLink.propTypes = {
    icon: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
}
export default NavigationLink