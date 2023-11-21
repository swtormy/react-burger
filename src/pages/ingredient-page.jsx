import React, { useEffect } from 'react';
import Modal from '../components/modal/modal';
import IngredientDetails from '../components/modal/modal-children/ingredient-details';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentIngredient } from '../services/actions/ingredients';
import styles from './ingredient-page.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const IngredientPage = ({ modal }) => {
  let { id } = useParams();
  const { ingredientsList } = useSelector(state => state.ingredients);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (!modal) {
      const foundIngredient = ingredientsList.find((item) => item._id === id);
      dispatch(addCurrentIngredient(foundIngredient));
    }
  }, [id, dispatch, ingredientsList, modal]);

  if (modal) return <Modal headerText="Детали ингредиента" onClose={() => navigate("/")}>
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

IngredientPage.propTypes = {
  modal: PropTypes.bool,
}

export default IngredientPage