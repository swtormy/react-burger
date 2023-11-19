import React, { useEffect, useState } from 'react'
import styles from './forgot-password-page.module.css'
import InputComponent from '../components/input/input-component'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { resetPassword } from '../utils/burger-api'
import { useDispatch } from 'react-redux';
import { allowResetPasswordAccess } from '../services/actions/user'
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(allowResetPasswordAccess());
    }, [dispatch])

    const handleResetPassword = async () => {
        try {
            const response = await resetPassword(email);
            if (response.success) {
                navigate('/reset-password')
            }
        } catch (error) {
            console.log('Ошибка:', error);
        }
    };

    return (
        <div className={styles.forgot_page}>
            <div className={styles.forgot_block}>
                <div className={styles.inputs_block}>
                    <div className={styles.forgot_block_title}>
                        <p className="text text_type_main-medium">
                            Восстановление пароля
                        </p>
                    </div>
                    <InputComponent
                        placeholder={'Укажите e-mail'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className={styles.forgot_block_btn}>
                        <Button htmlType="button" type="primary" size="large" onClick={handleResetPassword} disabled={!email}>
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

export default ForgotPasswordPage