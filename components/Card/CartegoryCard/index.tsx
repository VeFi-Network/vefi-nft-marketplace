import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CartegoryCardWrapper } from '../../../styles/CartegoryCard.styled';

interface ICartegoryCard {
  image: string;
  name: string;
}
const CartegoryCard = ({ image, name }: ICartegoryCard) => {
  return (
    <>
      <Link href="/">
        <a>
          <CartegoryCardWrapper>
            <div className="category__card__image">
              <Image src={image} height={200} width={200} alt="image" className="image" />
            </div>
            <div className="cartegory__card__footer">
              <div className="footer__text">
                <h2>{name}</h2>
              </div>
            </div>
          </CartegoryCardWrapper>
        </a>
      </Link>
    </>
  );
};

export default CartegoryCard;
