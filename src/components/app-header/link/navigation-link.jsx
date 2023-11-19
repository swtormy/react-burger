import React from 'react'
import styles from './navigation-link.module.css'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavigationLink = ({ icon, name, style, href, board, setBoard }) => {
    const isActive = board === name;
    const linkStyles = isActive ? { color: '#F2F2F3', fill: '#F2F2F3' } : {};
    return (
        <Link
            to={href}
            style={{ ...style, ...linkStyles }}
            className={styles.link}
            onClick={() => setBoard(name)}
        >
            <div className={styles.link__inner}>
                {icon}
                <p className={styles.marginLeft}>
                    {name}
                </p>
            </div>
        </Link>
    );
}
NavigationLink.propTypes = {
    icon: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    style: PropTypes.object,
    href: PropTypes.string.isRequired,
    board: PropTypes.string.isRequired,
    setBoard: PropTypes.func.isRequired,
}
export default NavigationLink