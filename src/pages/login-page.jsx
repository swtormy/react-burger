import React from 'react'
import styles from './login-page.module.css'
import InputComponent from '../components/input/input-component'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import PasswordComponent from '../components/input/password-component'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../services/actions/user';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm'

const LoginPage = () => {
  const { values, handleChange } = useForm({ email: '', password: '' });

  const redirectPath = useSelector(state => state.user.redirectPath);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email: values.email, password: values.password };
    dispatch(loginUser(userData)).then(() => {
      if (redirectPath) {
        navigate(redirectPath);
      } else {
        navigate('/');
      }
    });
  }
  return (
    <div className={styles.login_page}>
      <div className={styles.login_block}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputs_block}>
            <div className={styles.login_block_title}>
              <p className="text text_type_main-medium">
                Вход
              </p>
            </div>
            <InputComponent placeholder={'E-mail'} name={"email"} value={values.email} onChange={handleChange} />
            <PasswordComponent placeholder={"Пароль"}  value={values.password} onChange={handleChange} />
            <div className={styles.login_block_btn}>
              <Button htmlType="submit" type="primary" size="large" disabled={!values.email || !values.password}>
                Войти
              </Button>
            </div>
          </div>
        </form>
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