import React from 'react'
import styles from './profile-page.module.css'
import { NavLink } from 'react-router-dom'

const ProfilePage = () => {
  return (
    <div className={styles.profile_page}>
      <nav className={styles.navigation}>
        <NavLink
          to="/profile"
          className={(navData) => navData.isActive ? [styles.link, styles.active_link].join(" ") : styles.link}
          end
        >
          <p className="text text_type_main-medium">
            Профиль
          </p>
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={(navData) => navData.isActive ? [styles.link, styles.active_link].join(" ") : styles.link}
          end
        >
          <p className="text text_type_main-medium">
            История заказов
          </p>
        </NavLink>
        <NavLink
          to="/exit"
          className={styles.link}
        >
          <p className="text text_type_main-medium">
            Выход
          </p>
        </NavLink>
      </nav>
      <div className={styles.content}>ProfilePage</div>
    </div>
  )
}

export default ProfilePage