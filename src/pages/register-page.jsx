import React from 'react'
import styles from './register-page.module.css'
import InputComponent from '../components/input/input-component'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import PasswordComponent from '../components/input/password-component'

const RegisterPage = () => {
  return (
    <div className={styles.register_page}>
      <div className={styles.register_block}>
        <div className={styles.inputs_block}>
          <div className={styles.register_block_title}>
            <p className="text text_type_main-medium">
              Регистрация
            </p>
          </div>
          <InputComponent placeholder={'Имя'} value={""} />
          <InputComponent placeholder={'E-mail'} value={""} />
          <PasswordComponent />
          <div className={styles.register_block_btn}>
            <Button htmlType="button" type="primary" size="large">
              Зарегистрироваться
            </Button>
          </div>
        </div>
        <div className={styles.links_block}>
          <p className={["text text_type_main-default", styles.text].join(" ")}>
            Уже зарегистрированы?{' '}
            <Link to="/login" className={styles.link}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage