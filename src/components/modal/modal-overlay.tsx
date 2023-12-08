import React from 'react'
import styles from './modal-overlay.module.css';

type Props = {
  onClose: () => void;
}
const ModalOverlay: React.FC<Props> = ({ onClose }) => {
  return <div className={styles.overlay} onClick={onClose}></div>;
};
export default ModalOverlay;