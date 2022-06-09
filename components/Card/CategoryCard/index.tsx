import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { CategoryCardWrapper } from '../../../styles/CategoryCard.styled';

interface ICategoryCardProps {
  image: string;
  name: string;
  linkTo?: string;
}
const CategoryCard = ({ image, name, linkTo }: ICategoryCardProps) => {
  return (
    <>
      <Link href={linkTo || '/'}>
        <a>
          <CategoryCardWrapper>
            <div className="category__card__image">
              <Image src={image} height={200} width={200} alt="image" className="image" />
            </div>
            <div className="cartegory__card__footer">
              <div className="footer__text">
                <h2>{name}</h2>
              </div>
            </div>
          </CategoryCardWrapper>
        </a>
      </Link>
    </>
  );
};

export default CategoryCard;
