import React, { useEffect, useMemo } from 'react'
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngridientCard from './ingridient-card/ingridient-card';
import { useModal } from '../../hooks/useModal'
import { addCurrentIngredient } from '../../services/actions/ingredients';
import useScrollTabs from '../../hooks/useScrollTabs'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { TIngredientExtended } from '../../utils/models';

type Props = {}

const BurgerIngredients: React.FC<Props> = ({}) => {
  const location = useLocation()
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ingredientsList } = useAppSelector(state => state.ingredients);



  const { buns, sauces, fillings } = useMemo(() => {
    const ingList = ingredientsList as TIngredientExtended[];
    const buns = ingList.filter(item => item.type === 'bun');
    const sauces = ingList.filter(item => item.type === 'sauce');
    const fillings = ingList.filter(item => item.type === 'main');
    return { buns, sauces, fillings };
  }, [ingredientsList]);

  const {
    current,
    bunsRef,
    saucesRef,
    fillingsRef,
    handleTabClick,
  } = useScrollTabs();


  const { openModal } = useModal();

  const handleOrderClick = (item: TIngredientExtended) => {

    dispatch(addCurrentIngredient(item));
    navigate(`/ingredients/${item._id}`, { state: { previousLocation: location } });
    openModal();
  };



  return (
    <div className={styles.ingridients_block}>
      <div className={styles.ingridients_inner_block}>
        <div className={styles.title_block}>
          <p className={[styles.title, "text text_type_main-large"].join(" ")}>
            Соберите бургер
          </p>
          <div className={styles.tabs}>
            <Tab value="one" active={current === 'one'} onClick={() => handleTabClick('one')}>Булки</Tab>
            <Tab value="two" active={current === 'two'} onClick={() => handleTabClick('two')}>Соусы</Tab>
            <Tab value="three" active={current === 'three'} onClick={() => handleTabClick('three')}>Начинки</Tab>
          </div>
        </div>
        <div className={styles.ingridients} id="ingredients-container">
          <p id="one" ref={bunsRef} className="text text_type_main-medium">
            Булки
          </p>
          <div className={styles.column}>
            {buns.map(item => (
              <IngridientCard key={`ingredients_${item._id}`} item={item} onOpen={() => handleOrderClick(item)} />
            ))}
          </div>
          <p id="two" ref={saucesRef} className="text text_type_main-medium">
            Соусы
          </p>
          <div className={styles.column}>
            {sauces.map(item => (
              <IngridientCard key={`ingredients_${item._id}`} item={item} onOpen={() => handleOrderClick(item)} />
            ))}
          </div>
          <p id="three" ref={fillingsRef} className="text text_type_main-medium">
            Начинки
          </p>
          <div className={styles.column}>
            {fillings.map(item => (
              <IngridientCard key={`ingredients_${item._id}`} item={item} onOpen={() => handleOrderClick(item)} />
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default React.memo(BurgerIngredients)