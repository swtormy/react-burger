import React from 'react'
import styles from './not-found-pafe.module.css'

type Props = {}
const NotFoundPage: React.FC<Props> = ({ }) => {
  return (
    <div className={styles.not_found}>
      <p className="text text_type_digits-large">404</p>
      <p className="text text_type_main-medium">
        Страница не найдена
      </p>
    </div>
  )
}

export default NotFoundPage