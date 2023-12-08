import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from './modal-overlay';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  headerText?: string;
}

const Modal: React.FC<Props> = ({ children, onClose, headerText }) => {

  const modalRoot = document.getElementById('react-modals');
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClose={onClose} />
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          <div className={styles.modal_header_row}>
            <p className="text text_type_main-large">
              {headerText}
            </p>
            <button onClick={onClose} className={styles.closeBtn}><CloseIcon type="primary" /></button>
          </div>
          {children}
        </div>
      </>
    ),
    modalRoot
  );
};


export default Modal;