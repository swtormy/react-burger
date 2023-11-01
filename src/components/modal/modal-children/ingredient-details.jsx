import React from 'react'
import styles from './ingridient-details.module.css'
import PropTypes from 'prop-types';
import { getFileNameFromUrl } from '../../../utils/utils-funcs'
import { ingredientType } from '../../../utils/types';


const IngredientDetails = ({ detail }) => {
  return (
    <div className={styles.detail_inner}>

      <div className={styles.detail_for_center}>
        <div className={styles.detail_img}>
          <img src={detail.image_large} alt={getFileNameFromUrl(detail.image_large)} />
        </div>
        <div className={styles.detail_name}>
          <p className="text text_type_main-medium">
            {detail.name}
          </p>
        </div>
        <div className={styles.composition}>
          <div className={styles.composition_inner}>
            <p className="text text_type_main-default">
              Калории, ккал
            </p>
            <p className="text text_type_digits-default">
              {detail.calories}
            </p>
          </div>
          <div className={styles.composition_inner}>
            <p className="text text_type_main-default">
              Белки, г
            </p>
            <p className="text text_type_digits-default">
              {detail.proteins}
            </p>
          </div>
          <div className={styles.composition_inner}>
            <p className="text text_type_main-default">
              Жиры, г
            </p>
            <p className="text text_type_digits-default">
              {detail.fat}
            </p>
          </div>
          <div className={styles.composition_inner}>
            <p className="text text_type_main-default">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default">
              {detail.carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  detail: ingredientType.isRequired,
}

export default IngredientDetails