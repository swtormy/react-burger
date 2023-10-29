import React from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {

  return (
    <div className={styles.modal}>
      {children}
      <button onClick={onClose} className={styles.closeBtn}><CloseIcon type="primary" /></button>
    </div>
  );
};

export default Modal;