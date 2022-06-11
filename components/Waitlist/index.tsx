import { createRef, useRef } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import { CategoryWrapper } from '../../styles/category.styled';

const Waitlist = () => {
  const listRef = useRef<null | HTMLDivElement>(null);

  return (
    <>
      <CategoryWrapper>
        <div className="categoryTitle">Waitlist</div>
        <div className="wrapper">
          <FiArrowLeft className="sliderArrow left" />
          <div className="container" ref={listRef}>
            <div className="listItem">item</div>
            <div className="listItem">item</div>
            <div className="listItem">item</div>
            <div className="listItem">item</div>
            <div className="listItem">item</div>
            <div className="listItem">item</div>
            <div className="listItem">item</div>
            <div className="listItem">item</div>
            <div className="listItem">item</div>
            <div className="listItem">item</div>
            <div className="listItem">item</div>
            <div className="listItem">item</div>
            <div className="listItem">item</div>
            <div className="listItem">item</div>
            <div className="listItem">item</div>
            <div className="listItem">item</div>
            <div className="listItem">item</div>
            <div className="listItem">item</div>
            <div className="listItem">item</div>
          </div>
          <FiArrowRight className="sliderArrow right" />
        </div>
      </CategoryWrapper>
    </>
  );
};

export default Waitlist;
