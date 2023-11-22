import React, { useState, useEffect } from 'react'
import styles from './profile-content.module.css'
import InputComponent from '../input/input-component'
import PasswordComponent from '../input/password-component'
import { fetchUserProfile, updateUserProfile } from '../../utils/burger-api'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from '../../hooks/useForm'

const ProfileContent = () => {

  const { values, handleChange, setValues } = useForm({ name: '', email: '', password: '******' });
  const [originalData, setOriginalData] = useState({ name: '', email: '', password: '******' });
  // const [currentData, setCurrentData] = useState({ name: '', email: '', password: '******' });
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    fetchUserProfile().then(response => {
      const { name, email } = response.user;
      setOriginalData({ name, email, password: '******' });
      setValues({ name, email, password: '******' })
    });
  }, []);

  useEffect(() => {
    setIsModified(JSON.stringify(originalData) !== JSON.stringify(values));
  }, [values, originalData]);

  // const handleNameChange = (e) => setCurrentData({ ...currentData, name: e.target.value });
  // const handleEmailChange = (e) => setCurrentData({ ...currentData, email: e.target.value });
  // const handlePasswordChange = (e) => setCurrentData({ ...currentData, password: e.target.value });

  const handleSave = () => {
    updateUserProfile(values).then(response => {
      if (response.success) {
        setOriginalData(values);
      }
    });
  };

  const handleCancel = () => {
    setValues(originalData);
  };
  return (
    <form onSubmit={handleSave}>
      <div className={styles.profile_content}>
        <InputComponent
          placeholder={'Имя'}
          name={'name'}
          value={values.name}
          onChange={handleChange}
          icon={"EditIcon"}
        />
        <InputComponent
          placeholder={'Логин'}
          name={'email'}
          value={values.email}
          onChange={handleChange}
          icon={"EditIcon"}
        />
        <PasswordComponent
          placeholder={'Пароль'}
          value={values.password}
          onChange={handleChange}
          icon={"EditIcon"}
        />
        <div className={styles.btns}>
          <Button htmlType="submit" type="primary" size="medium" disabled={!isModified}>
            Сохранить
          </Button>
          <Button htmlType="button" type="secondary" size="medium" onClick={handleCancel} disabled={!isModified}>
            Отмена
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileContent;