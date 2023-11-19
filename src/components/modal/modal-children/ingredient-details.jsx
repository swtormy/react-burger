import React from 'react'
import styles from './ingridient-details.module.css'
import { getFileNameFromUrl } from '../../../utils/utils-funcs'
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
  const { currentIngredient } = useSelector(state => state.ingredients);
  if(!currentIngredient) return null
  return (
    <div className={styles.detail_inner}>
      <div className={styles.detail_for_center}>
        <div className={styles.detail_img}>
          <img src={currentIngredient?.image_large} alt={getFileNameFromUrl(currentIngredient?.image_large)} />
        </div>
        <div className={styles.detail_name}>
          <p className="text text_type_main-medium">
            {currentIngredient?.name}
          </p>
        </div>
        <div className={styles.composition}>
          <div className={styles.composition_inner}>
            <p className="text text_type_main-default">
              Калории, ккал
            </p>
            <p className="text text_type_digits-default">
              {currentIngredient?.calories}
            </p>
          </div>
          <div className={styles.composition_inner}>
            <p className="text text_type_main-default">
              Белки, г
            </p>
            <p className="text text_type_digits-default">
              {currentIngredient?.proteins}
            </p>
          </div>
          <div className={styles.composition_inner}>
            <p className="text text_type_main-default">
              Жиры, г
            </p>
            <p className="text text_type_digits-default">
              {currentIngredient?.fat}
            </p>
          </div>
          <div className={styles.composition_inner}>
            <p className="text text_type_main-default">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default">
              {currentIngredient?.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default IngredientDetails