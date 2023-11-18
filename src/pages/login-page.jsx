import React from 'react'
import styles from './login-page.module.css'
import InputComponent from '../components/input/input-component'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import PasswordComponent from '../components/input/password-component'

const LoginPage = () => {
  return (
    <div className={styles.login_page}>
      <div className={styles.login_block}>
        <div className={styles.inputs_block}>
          <div className={styles.login_block_title}>
            <p className="text text_type_main-medium">
              Вход
            </p>
          </div>
          <InputComponent placeholder={'E-mail'} value={""}/>
          <PasswordComponent />
          <div className={styles.login_block_btn}>
            <Button htmlType="button" type="primary" size="large">
              Войти
            </Button>
          </div>
        </div>
        <div className={styles.links_block}>
          <p className={["text text_type_main-default", styles.text].join(" ")}>
            Вы - новый пользователь?{' '}
            <Link to="/register" className={styles.link}>
              Зарегистрироваться
            </Link>
          </p>
          <p className={["text text_type_main-default", styles.text].join(" ")}>
            Забыли пароль?{' '}
            <Link to="/forgot-password" className={styles.link}>
              Восстановить пароль
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage