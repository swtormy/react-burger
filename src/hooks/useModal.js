import { useState, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { removeCurrentOrder } from '../services/actions/order';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    dispatch(removeCurrentOrder(null))
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};