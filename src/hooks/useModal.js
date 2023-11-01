import { useState, useCallback } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null)

  const openModal = useCallback((orderNumber) => {
    setIsModalOpen(true);
    setOrderNumber(orderNumber)
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    openModal,
    orderNumber,
    closeModal,
  };
};