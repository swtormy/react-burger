import React from 'react'
import styles from './profile-page.module.css'
import { Routes, Route, NavLink } from 'react-router-dom'
import ProfileContent from '../components/profile-content/profile-content'
import OrderHistory from '../components/order-history/order-history'
import Cookies from 'js-cookie'
import { logoutUser } from '../services/actions/user'
import { useAppDispatch } from '../hooks/redux-hooks'

type Props = {}

const ProfilePage: React.FC<Props> = () => {
  const dispatch = useAppDispatch()

  const handleLogout = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const refreshToken = Cookies.get('refreshToken');
    dispatch(logoutUser(refreshToken))
  };
  return (
    <div className={styles.profile_page}>
      <div className={styles.navigation_block}>

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
          <div
            className={styles.exit}
            onClick={handleLogout}
          >
            <p className="text text_type_main-medium">
              Выход
            </p>
          </div>
        </nav>
        <div className={styles.info}>
          <p className="text text_type_main-default">
            В этом разделе вы можете
            изменить свои персональные данные
          </p>
        </div>
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="" element={<ProfileContent />} />
          <Route path="orders" element={<OrderHistory />} />
        </Routes>
      </div>
    </div>
  )
}

export default ProfilePage