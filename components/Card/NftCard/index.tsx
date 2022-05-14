import Image from 'next/image';
import React from 'react';
import { NFTArt } from '../../../styles/users.styled';

const NFTCard = () => {
  return (
    <>
      <NFTArt>
        <div className="nft__image">
          <Image src="/nft/nft01.png" width={200} height={200} alt="nft user" />
        </div>
        <div className="nft__footer">
          <div className="nft__prev__users">
            <span>
              <Image src="/nft/nft01.png" width={30} height={30} alt="nft user" />
            </span>
            <span>
              <Image src="/nft/nft01.png" width={30} height={30} alt="nft user" />
            </span>
            <span>
              <Image src="/nft/nft01.png" width={30} height={30} alt="nft user" />
            </span>
          </div>
          <div className="nft__footer__info__left">
            <div className="title">
              <h2>Lost in Space</h2>
              <p>wereywanle</p>
            </div>
          </div>
          <div className="nft__footer__info__right">
            <div className="price">
              <div className="icon"></div>
              <div className="price__value">2eth</div>
            </div>
            <div className="purchase__btn">
              <button>Purchase</button>
            </div>
          </div>
        </div>
      </NFTArt>
    </>
  );
};

export default NFTCard;
