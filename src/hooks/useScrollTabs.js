import { useState, useEffect, useRef } from 'react';

const useScrollTabs = () => {
  const [current, setCurrent] = useState('one');
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const fillingsRef = useRef(null);

  const handleScroll = () => {
    const containerTop = document.getElementById('ingredients-container').getBoundingClientRect().top;

    const bunsTop = bunsRef.current ? bunsRef.current.getBoundingClientRect().top : null;
    const saucesTop = saucesRef.current ? saucesRef.current.getBoundingClientRect().top : null;
    const fillingsTop = fillingsRef.current ? fillingsRef.current.getBoundingClientRect().top : null;

    if (bunsTop !== null && bunsTop - containerTop >= 0) {
      setCurrent('one');
    } else if (saucesTop !== null && saucesTop - containerTop >= 0) {
      setCurrent('two');
    } else if (fillingsTop !== null && fillingsTop - containerTop >= 0) {
      setCurrent('three');
    }
  };

  const handleTabClick = (value) => {
    setCurrent(value);
    switch (value) {
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
  };

  useEffect(() => {
    const ingredientsContainer = document.getElementById('ingredients-container');
    if (ingredientsContainer) {
      ingredientsContainer.addEventListener('scroll', handleScroll);
      return () => {
        ingredientsContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return {
    current,
    bunsRef,
    saucesRef,
    fillingsRef,
    handleTabClick,
  };
};

export default useScrollTabs;
