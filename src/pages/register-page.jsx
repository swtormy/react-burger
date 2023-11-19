import React from 'react'
import styles from './register-page.module.css'
import InputComponent from '../components/input/input-component'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import PasswordComponent from '../components/input/password-component'
import { useDispatch } from 'react-redux'
import { registerUser } from '../services/actions/user'

const RegisterPage = () => {
  const dispatch = useDispatch();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    const userData = { name, email, password };
    dispatch(registerUser(userData));
  };
  return (
    <div className={styles.register_page}>
      <div className={styles.register_block}>
        <div className={styles.inputs_block}>
          <div className={styles.register_block_title}>
            <p className="text text_type_main-medium">
              Регистрация
            </p>
          </div>
          <InputComponent placeholder={'Имя'} value={name} onChange={handleNameChange} />
          <InputComponent placeholder={'E-mail'} value={email} onChange={handleEmailChange} />
          <PasswordComponent placeholder={"Пароль"} value={password} onChange={handlePasswordChange} />
          <div className={styles.register_block_btn}>
            <Button htmlType="button" type="primary" size="large" onClick={handleSubmit} disabled={!name || !email || !password}>
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