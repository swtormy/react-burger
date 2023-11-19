import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import ModalOverlay from './modal-overlay';
import { useNavigate } from 'react-router-dom';

const Modal = ({ children, onClose, headerText, isRoute }) => {
  const navigate = useNavigate();
  const modalRoot = document.getElementById('react-modals');
  const handleKeyDown = useCallback((event) => {
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

  return ReactDOM.createPortal(
    (
      <>
        <ModalOverlay onClose={isRoute ? () => navigate('/') : onClose} />
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          <div className={styles.modal_header_row}>
            <p className="text text_type_main-large">
              {headerText}
            </p>
            <button onClick={isRoute ? () => navigate('/') : onClose} className={styles.closeBtn}><CloseIcon type="primary" /></button>
          </div>
          {children}
        </div>
      </>
    ),
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  headerText: PropTypes.string,
  isRoute: PropTypes.bool,
}

export default Modal;