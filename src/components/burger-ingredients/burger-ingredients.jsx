import React, { useEffect, useMemo } from 'react'
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngridientCard from './ingridient-card/ingridient-card';
import { useModal } from '../../hooks/useModal'
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, addCurrentIngredient } from '../../services/actions/ingredients';
import useScrollTabs from '../../hooks/useScrollTabs'
import { useNavigate, useLocation } from 'react-router-dom'

const BurgerIngredients = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ingredientsList } = useSelector(state => state.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const { buns, sauces, fillings } = useMemo(() => {
    const buns = ingredientsList.filter(item => item.type === 'bun');
    const sauces = ingredientsList.filter(item => item.type === 'sauce');
    const fillings = ingredientsList.filter(item => item.type === 'main');
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

  const handleOrderClick = (item) => {
    
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