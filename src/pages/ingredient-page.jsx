import React, { useEffect } from 'react';
import Modal from '../components/modal/modal';
import IngredientDetails from '../components/modal/modal-children/ingredient-details';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../utils/burger-api';
import { useDispatch } from 'react-redux';
import { addCurrentIngredient } from '../services/actions/ingredients';
import styles from './ingredient-page.module.css';

const IngredientPage = ({ modal }) => {
  let { id } = useParams();
  const dispatch = useDispatch()

  useEffect(() => {
    if (!modal) {
      getIngredients().then(data => {
        const foundIngredient = data.data.find((item) => item._id === id);
        dispatch(addCurrentIngredient(foundIngredient));
      }).catch(error => console.error(error));
    }
  }, [id]);

  if (modal) return <Modal headerText="Детали ингредиента" isRoute={true}>
    <IngredientDetails />
  </Modal>
  return <div className={styles.ingredient_in_page}>
    <div className={styles.ingredient_detail}>
      <p className="text text_type_main-large">
        Детали ингредиента
      </p>
      <IngredientDetails />
    </div>
  </div>

}

export default IngredientPage