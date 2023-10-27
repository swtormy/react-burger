import React, { useState, useRef, useEffect } from 'react'
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { data } from '../../utils/data'
import IngridientCard from './ingridient-card/IngridientCard';
import Overlay from '../modal/Overlay';
import Modal from '../modal/Modal';

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
    <div style={{ height: "calc(100vh - 168px)", width: "100%" }}>
      <div style={{ height: "100%" }}>
        <div style={{ height: "196px" }}>
          <p className={[styles.title, "text text_type_main-large"].join(" ")}>
            Соберите бургер
          </p>
          <div className={styles.tabs}>
            <Tab value="one" active={current === 'one'} onClick={() => handleTabClick('one')}>Булки</Tab>
            <Tab value="two" active={current === 'two'} onClick={() => handleTabClick('two')}>Соусы</Tab>
            <Tab value="three" active={current === 'three'} onClick={() => handleTabClick('three')}>Начинки</Tab>
          </div>
        </div>
        <div style={{ height: "calc(100% - 196px)" }} className={styles.ingridients}>
          <p ref={bunsRef} className="text text_type_main-medium">
            Булки
          </p>
          <div className={styles.column}>
            {buns.map(item => (
              <IngridientCard item={item} onOpen={() => handleOrderClick(item)} />
            ))}
          </div>
          <p ref={saucesRef} className="text text_type_main-medium">
            Соусы
          </p>
          <div className={styles.column}>
            {sauces.map(item => (
              <IngridientCard item={item} onOpen={() => handleOrderClick(item)} />
            ))}
          </div>
          <p ref={fillingsRef} className="text text_type_main-medium">
            Начинки
          </p>
          <div className={styles.column}>
            {fillings.map(item => (
              <IngridientCard item={item} onOpen={() => handleOrderClick(item)} />
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && <Overlay />}
      {isModalOpen && <Modal onClose={handleCloseModal}>
        <div className={styles.detail_inner}>
          <div className={styles.detail_desc}>
            <p className="text text_type_main-large">
              Детали ингридиента
            </p>
          </div>
          <div className={styles.detail_for_center}>
            <div className={styles.detail_img}>
              <img src={detail.image_large} alt="image_large" />
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
      </Modal>}
    </div>
  )
}

export default BurgerIngredients