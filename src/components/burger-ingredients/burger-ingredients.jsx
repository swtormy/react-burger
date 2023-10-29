import React, { useState, useRef, useEffect } from 'react'
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { data } from '../../utils/data'
import IngridientCard from './ingridient-card/ingridient-card';

import Modal from '../modal/modal';
import IngredientDetails from '../modal/modal-children/ingredient-details'

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('one');

  const buns = data.filter(item => item.type === 'bun');
  const sauces = data.filter(item => item.type === 'sauce');
  const fillings = data.filter(item => item.type === 'main');

  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const fillingsRef = useRef(null);

  const handleTabClick = (value) => {
    setCurrent(value);
  };

  useEffect(() => {
    switch (current) {
      case 'one':
        bunsRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'two':
        saucesRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'three':
        fillingsRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  }, [current]);

  const handleScroll = () => {
    const bunsTop = bunsRef.current.getBoundingClientRect().top;
    const saucesTop = saucesRef.current.getBoundingClientRect().top;
    const fillingsTop = fillingsRef.current.getBoundingClientRect().top;

    if (bunsTop >= 0 && bunsTop < window.innerHeight) {
      setCurrent('one');
    } else if (saucesTop >= 0 && saucesTop < window.innerHeight) {
      setCurrent('two');
    } else if (fillingsTop >= 0 && fillingsTop < window.innerHeight) {
      setCurrent('three');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);
  const [detail, setDetail] = useState(null)

  const handleOrderClick = (item) => {
    setModalOpen(true);
    setDetail(item)
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
        <div className={styles.ingridients}>
          <p ref={bunsRef} className="text text_type_main-medium">
            Булки
          </p>
          <div className={styles.column}>
            {buns.map(item => (
              <IngridientCard key={item._id} item={item} onOpen={() => handleOrderClick(item)} />
            ))}
          </div>
          <p ref={saucesRef} className="text text_type_main-medium">
            Соусы
          </p>
          <div className={styles.column}>
            {sauces.map(item => (
              <IngridientCard key={item._id} item={item} onOpen={() => handleOrderClick(item)} />
            ))}
          </div>
          <p ref={fillingsRef} className="text text_type_main-medium">
            Начинки
          </p>
          <div className={styles.column}>
            {fillings.map(item => (
              <IngridientCard key={item._id} item={item} onOpen={() => handleOrderClick(item)} />
            ))}
          </div>
        </div>
      </div>
      
      {isModalOpen && <Modal onClose={handleCloseModal}>
        <IngredientDetails detail={detail}/>
      </Modal>}
    </div>
  )
}

export default BurgerIngredients