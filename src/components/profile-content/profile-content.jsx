import React from 'react'
import styles from './profile-content.module.css'
import InputComponent from '../input/input-component'
import PasswordComponent from '../input/password-component'

const ProfileContent = () => {
  return (
    <div className={styles.profile_content}>
        <InputComponent placeholder={'Имя'} value={'Марк'} icon={"EditIcon"}/>
        <InputComponent placeholder={'Логин'} value={'mail@stellar.burgers'} icon={"EditIcon"}/>
        <PasswordComponent placeholder={'Пароль'} value={'qwerty'} icon={"EditIcon"}/>
    </div>
  )
}

export default ProfileContent