import React from 'react';
import Modal from '../components/modal/modal';
import IngredientDetails from '../components/modal/modal-children/ingredient-details';
import { useParams } from 'react-router-dom';
import { addCurrentIngredient } from '../services/actions/ingredients';
import styles from './ingredient-page.module.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { TIngredientExtended } from '../utils/models';

type Props = {
  modal: boolean;
}

const IngredientPage: React.FC<Props> = ({ modal }) => {
  let { id } = useParams();
  const { ingredientsList } = useAppSelector(state => state.ingredients);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  React.useEffect(() => {
    if (!modal) {
      const ingList = ingredientsList as TIngredientExtended[]
      const foundIngredient = ingList.find((item) => item._id === id);
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


export default IngredientPage