import React from 'react';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const Modal = ({ children, onClose }) => {

  return (
    <div className={styles.modal}>
      {children}
      <button onClick={onClose} className={styles.closeBtn}><CloseIcon type="primary" /></button>
    </div>
  );
};

export default Modal;