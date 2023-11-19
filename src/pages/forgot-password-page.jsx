import React, { useState } from 'react'
import styles from './forgot-password-page.module.css'
import InputComponent from '../components/input/input-component'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { resetPassword } from '../utils/burger-api'

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await resetPassword(email);
            console.log('Ответ сервера:', response);
        } catch (error) {
            console.error('Ошибка при восстановлении пароля:', error);
        }
    };

    return (
        <div className={styles.forgot_page}>
            <form onSubmit={handleSubmit}>
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
                            <Button htmlType="submit" type="primary" size="large">
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
            </form>
        </div>
    )
}

export default ForgotPasswordPage