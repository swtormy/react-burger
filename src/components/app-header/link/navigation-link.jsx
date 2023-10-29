import React from 'react'
import styles from '../app-header.module.css'

interface NavigationLinkProps {
    icon: React.ReactNode;
    name: string;
    style: React.CSSProperties;
    href: string;
    board: string;
    setBoard: (name: string) => void;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ icon, name, style, href, board, setBoard }) => {
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