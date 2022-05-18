import React from 'react';
import { NFTModel } from '../../../api/models/nft';
import { NFTArt } from '../../../styles/users.styled';

type Props = {
  model: NFTModel;
  onClick?: (event: any) => void;
};

const NFTCard = ({ model, onClick }: Props) => {
  return (
    <>
      <NFTArt>
        <div className="nft__image">
          <img src={model.metadata?.imageURI} width={200} height={200} alt="nft user" />
        </div>
        <div className="nft__footer">
          {/* <div className="nft__prev__users">
            <span>
              <Image src="/nft/nft01.png" width={30} height={30} alt="nft user" />
            </span>
            <span>
              <Image src="/nft/nft01.png" width={30} height={30} alt="nft user" />
            </span>
            <span>
              <Image src="/nft/nft01.png" width={30} height={30} alt="nft user" />
            </span>
          </div> */}
          <div className="nft__footer__info__left">
            <div className="title">
              <h2>{model.metadata?.name}</h2>
              <p>{model.metadata?.owner}</p>
            </div>
          </div>
          <div className="nft__footer__info__right">
            <div className="price">
              <div className="icon"></div>
              <div className="price__value">2eth</div>
            </div>
            <div className="purchase__btn">
              <button onClick={onClick}>View</button>
            </div>
          </div>
        </div>
      </NFTArt>
    </>
  );
};

export default NFTCard;
