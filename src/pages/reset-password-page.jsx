import React, { useState } from 'react'
import styles from './reset-password-page.module.css'
import InputComponent from '../components/input/input-component'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import PasswordComponent from '../components/input/password-component'
import { submitNewPassword } from '../utils/burger-api'
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  
  const navigate = useNavigate();

  const handleSubmitNewPassword = async () => {
    try {
      const response = await submitNewPassword(password, token);
      if (response.success) {
        navigate('/login')
      }
    } catch (error) {
      console.log('Ошибка:', error);
    }
  };
  return (
    <div className={styles.reset_page}>
      <div className={styles.reset_block}>
        <div className={styles.inputs_block}>
          <div className={styles.reset_block_title}>
            <p className="text text_type_main-medium">
              Восстановление пароля
            </p>
          </div>
          <PasswordComponent
            placeholder={'Введите новый пароль'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputComponent
            placeholder={'Введите код из письма'}
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <div className={styles.reset_block_btn}>
            <Button htmlType="button" type="primary" size="large" onClick={handleSubmitNewPassword} disabled={!password || !token}>
              Восстановить
            </Button>
          </div>
        </div>
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