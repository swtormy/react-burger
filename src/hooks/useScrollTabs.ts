import { useState, useEffect, useRef } from 'react';

const useScrollTabs = () => {
  const [current, setCurrent] = useState<'one' | 'two' | 'three'>('one');
  const bunsRef = useRef<HTMLParagraphElement | null>(null);
  const saucesRef = useRef<HTMLParagraphElement | null>(null);
  const fillingsRef = useRef<HTMLParagraphElement | null>(null);

  const handleScroll = () => {
    const container = document.getElementById('ingredients-container');
    const containerTop = container?.getBoundingClientRect().top ?? 0;

    const bunsTop = bunsRef.current?.getBoundingClientRect().top;
    const saucesTop = saucesRef.current?.getBoundingClientRect().top;
    const fillingsTop = fillingsRef.current?.getBoundingClientRect().top;

    if (bunsTop !== undefined && bunsTop - containerTop >= 0) {
      setCurrent('one');
    } else if (saucesTop !== undefined && saucesTop - containerTop >= 0) {
      setCurrent('two');
    } else if (fillingsTop !== undefined && fillingsTop - containerTop >= 0) {
      setCurrent('three');
    }
  };

  const handleTabClick = (value: 'one' | 'two' | 'three') => {
    setCurrent(value);
    switch (value) {
      case 'one':
        bunsRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'two':
        saucesRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'three':
        fillingsRef.current?.scrollIntoView({ behavior: 'smooth' });
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
