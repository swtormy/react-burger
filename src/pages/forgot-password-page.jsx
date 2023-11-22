import React, { useEffect } from 'react'
import styles from './forgot-password-page.module.css'
import InputComponent from '../components/input/input-component'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { resetPassword } from '../utils/burger-api'
import { useDispatch } from 'react-redux';
import { allowResetPasswordAccess } from '../services/actions/user'
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm'

const ForgotPasswordPage = () => {
    const { values, handleChange } = useForm({ email: '' });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(allowResetPasswordAccess());
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await resetPassword(values.email);
        navigate('/reset-password')
    };

    return (
        <div className={styles.forgot_page}>
            <div className={styles.forgot_block}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputs_block}>
                        <div className={styles.forgot_block_title}>
                            <p className="text text_type_main-medium">
                                Восстановление пароля
                            </p>
                        </div>
                        <InputComponent
                            placeholder={'Укажите e-mail'}
                            name={'email'}
                            value={values.email}
                            onChange={handleChange}
                        />
                        <div className={styles.forgot_block_btn}>
                            <Button htmlType="submit" type="primary" size="large" disabled={!values.email}>
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

export default ForgotPasswordPage