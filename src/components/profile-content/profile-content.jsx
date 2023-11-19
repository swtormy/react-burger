import React, { useState, useEffect } from 'react'
import styles from './profile-content.module.css'
import InputComponent from '../input/input-component'
import PasswordComponent from '../input/password-component'
import { fetchUserProfile, updateUserProfile } from '../../utils/burger-api'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

const ProfileContent = () => {

  const [originalData, setOriginalData] = useState({ name: '', email: '', password: '******' });
  const [currentData, setCurrentData] = useState({ name: '', email: '', password: '******' });
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    fetchUserProfile().then(response => {
      if (response.success) {
        const { name, email } = response.user;
        setOriginalData({ name, email, password: '******' });
        setCurrentData({ name, email, password: currentData.password });
      }
    });
  }, []);

  useEffect(() => {
    setIsModified(JSON.stringify(originalData) !== JSON.stringify(currentData));
  }, [currentData, originalData]);

  const handleNameChange = (e) => setCurrentData({ ...currentData, name: e.target.value });
  const handleEmailChange = (e) => setCurrentData({ ...currentData, email: e.target.value });
  const handlePasswordChange = (e) => setCurrentData({ ...currentData, password: e.target.value });

  const handleSave = () => {
    updateUserProfile(currentData).then(response => {
      if (response.success) {
        setOriginalData(currentData);
      }
    });
  };

  const handleCancel = () => {
    setCurrentData(originalData);
  };
  return (
    <div className={styles.profile_content}>
      <InputComponent
        placeholder={'Имя'}
        value={currentData.name}
        onChange={handleNameChange}
        icon={"EditIcon"}
      />
      <InputComponent
        placeholder={'Логин'}
        value={currentData.email}
        onChange={handleEmailChange}
        icon={"EditIcon"}
      />
      <PasswordComponent
        placeholder={'Пароль'}
        value={currentData.password}
        onChange={handlePasswordChange}
        icon={"EditIcon"}
      />
      <div className={styles.btns}>
        <Button htmlType="button" type="primary" size="medium" onClick={handleSave} disabled={!isModified}>
          Сохранить
        </Button>
        <Button htmlType="button" type="secondary" size="medium" onClick={handleCancel} disabled={!isModified}>
          Отмена
        </Button>
      </div>
    </div>
  );
};

export default ProfileContent;