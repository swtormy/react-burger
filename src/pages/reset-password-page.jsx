import React, { useState } from 'react'
import styles from './reset-password-page.module.css'
import InputComponent from '../components/input/input-component'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import PasswordComponent from '../components/input/password-component'
import { submitNewPassword } from '../utils/burger-api'
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm'

const ResetPasswordPage = () => {
  const { values, handleChange } = useForm({ token: '', password: '' });


  const navigate = useNavigate();

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    await submitNewPassword(values.password, values.token);
    navigate('/login')
  };
  return (
    <div className={styles.reset_page}>
      <div className={styles.reset_block}>
        <form onSubmit={handleSubmitNewPassword}>
        <div className={styles.inputs_block}>
          <div className={styles.reset_block_title}>
            <p className="text text_type_main-medium">
              Восстановление пароля
            </p>
          </div>
          <PasswordComponent
            placeholder={'Введите новый пароль'}
            value={values.password}
            onChange={handleChange}
          />
          <InputComponent
            placeholder={'Введите код из письма'}
            name={"token"}
            value={values.token}
            onChange={handleChange}
          />
          <div className={styles.reset_block_btn}>
            <Button htmlType="submit" type="primary" size="large" disabled={!values.password || !values.token}>
              Восстановить
            </Button>
          </div>
        </div>
        </form>
        <div className={styles.links_block}>
          <p className={["text text_type_main-default", styles.text].join(" ")}>
            Вспомнили пароль?{' '}
            <Link to="/login" className={styles.link}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage