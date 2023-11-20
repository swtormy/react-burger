import React from 'react'
import styles from './register-page.module.css'
import InputComponent from '../components/input/input-component'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import PasswordComponent from '../components/input/password-component'
import { useDispatch } from 'react-redux'
import { registerUser } from '../services/actions/user'
import { useForm } from '../hooks/useForm'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { values, handleChange } = useForm({ name: '', email: '', password: '' });


  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name: values.name, email: values.email, password: values.password };
    dispatch(registerUser(userData));
    navigate('/login')
  };
  return (
    <div className={styles.register_page}>
      <div className={styles.register_block}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputs_block}>
            <div className={styles.register_block_title}>
              <p className="text text_type_main-medium">
                Регистрация
              </p>
            </div>
            <InputComponent placeholder={'Имя'} name={'name'} value={values.name} onChange={handleChange} />
            <InputComponent placeholder={'E-mail'} name={'email'} value={values.email} onChange={handleChange} />
            <PasswordComponent placeholder={"Пароль"} value={values.password} onChange={handleChange} />
            <div className={styles.register_block_btn}>
              <Button htmlType="submit" type="primary" size="large" disabled={!values.name || !values.email || !values.password}>
                Зарегистрироваться
              </Button>
            </div>
          </div>
        </form>
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