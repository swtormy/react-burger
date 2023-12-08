import { useState, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { removeCurrentOrder } from '../services/actions/order';
import { useAppDispatch } from "./redux-hooks";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    dispatch(removeCurrentOrder())
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};