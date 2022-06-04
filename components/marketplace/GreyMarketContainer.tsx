import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

import Card from '../Card';

const GreyContainerMain = styled.div`
  width: 1180px;
  min-width: 900px;
  padding-bottom: 20px;
  background: linear-gradient(254.33deg, rgba(255, 255, 255, 0.1) 1.71%, rgba(255, 255, 255, 0.05) 99.35%);
  backdrop-filter: blur(16.86px);

  border-radius: 20px;
  margin-top: 50px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #383838;

  @media (max-width: 1280px) {
    width: 950px;
    min-width: 700px;
  }
`;

const PaddedSpace = styled.div`
  min-width: 50px;
`;

const NFTScrollableContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  height: 415px;
  flex-direction: row;
  gap: 46px;
  overflow-x: auto;
  transition-duration: 500ms;
  opacity: 1;
  margin-top: 35px;
  margin-bottom: 10px;

  @media (max-width: 1280px) {
    width: 900px;
    min-width: 650px;
  }
`;

const TopSellersDiv = styled.div`
  width: 1130px;
  margin-top: 50px;
  margin-bottom: 40px;
  height: 150px;

  .title {
    font-family: 'RubikRegular';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #ebf8ff;
    margin-left: 20px;
  }

  .collection-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 30px;
    margin-top: 20px;
    margin-left: 20px;
  }

  @media (max-width: 1280px) {
    width: 900px;
    min-width: 650px;
  }
`;

const CollectionCard = styled.div`
  width: 200px;
  height: 45px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  transition-duration: 250ms;
  cursor: pointer;

  @media (max-width: 1280px) {
    width: 150px;
  }

  &:hover {
    transform: scale(1.05);
  }

  .img-cont {
    width: 45px;

    .seller-img {
      border-radius: 50%;
      width: 40.4px;
      height: 40.04px;
      border: 1.83647px solid #ffffff;
      position: relative;
    }

    .tick {
      position: absolute;
      margin-left: -10px;
    }
  }

  .name {
    width: 150px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #ffffff;
    font-family: 'RubikRegular';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;

    @media (max-width: 1280px) {
      font-size: 12px;
      margin-top: -10px;
    }
  }
`;

const topSellersList = [
  {
    name: 'Beasyzakustler',
    verified: true,
    imageUrl: '/marketplace/topSellers/1.png'
  },
  {
    name: 'Cassy Mcconnell',
    verified: false,
    imageUrl: '/marketplace/topSellers/2.png'
  },
  {
    name: 'Coben Day',
    verified: true,
    imageUrl: '/marketplace/topSellers/3.png'
  },
  {
    name: 'Bradly Giles',
    verified: false,
    imageUrl: '/marketplace/topSellers/1.png'
  },
  {
    name: 'Saim Roth',
    verified: false,
    imageUrl: '/marketplace/topSellers/4.png'
  },
  {
    name: 'Dylan Bowen',
    verified: false,
    imageUrl: '/marketplace/topSellers/5.png'
  },
  {
    name: 'Heini Fitzpatrick',
    verified: false,
    imageUrl: '/marketplace/topSellers/8.png'
  },
  {
    name: 'Neshawn Glover',
    verified: false,
    imageUrl: '/marketplace/topSellers/6.png'
  },
  {
    name: 'Nelson Daugherty',
    verified: false,
    imageUrl: '/marketplace/topSellers/7.png'
  },
  {
    name: 'Shiloh York',
    verified: true,
    imageUrl: '/marketplace/topSellers/8.png'
  }
];

type Props = {};

export default function GreyMarketContainer({}: Props) {
  return (
    <GreyContainerMain>
      <NFTScrollableContainer>
        <PaddedSpace />
        <Card name="God of War" imageURI="/nft/nft01.png" price="247" owner="ToomuchLag" linkTo="/marketplace"></Card>
        <Card name="Rolling Ape" imageURI="/nft/nft02.png" price="7" owner="Unknowest" linkTo="/marketplace"></Card>
        <Card name="Lost in Space" imageURI="/nft/nft03.png" price="2" owner="Wereywanle" linkTo="/marketplace"></Card>
        <Card name="Rolling Ape" imageURI="/nft/nft02.png" price="7" owner="Unknowest" linkTo="/marketplace"></Card>
        <Card name="Lost in Space" imageURI="/nft/nft03.png" price="2" owner="Wereywanle" linkTo="/marketplace"></Card>
        <Card name="Rolling Ape" imageURI="/nft/nft02.png" price="7" owner="Unknowest" linkTo="/marketplace"></Card>

        <PaddedSpace />
      </NFTScrollableContainer>

      <TopSellersDiv>
        <div className="title">Top Sellers</div>

        <div className="collection-grid">
          {topSellersList &&
            topSellersList.map((seller, i) => (
              <CollectionCard key={i}>
                <div className="img-cont">
                  <Image width="40.4px" height="40.4px" src={seller.imageUrl} className="seller-img" />
                  {seller.verified && <img src="/icons/verification.svg" width="20px" height="20px" className="tick" />}
                </div>

                <div className="name">{seller.name}</div>
              </CollectionCard>
            ))}
        </div>
      </TopSellersDiv>

      <NFTScrollableContainer>
        <PaddedSpace />
        <Card name="God of War" imageURI="/nft/nft01.png" price="247" owner="ToomuchLag" linkTo="/marketplace"></Card>
        <Card name="Rolling Ape" imageURI="/nft/nft02.png" price="7" owner="Unknowest" linkTo="/marketplace"></Card>
        <Card name="Lost in Space" imageURI="/nft/nft03.png" price="2" owner="Wereywanle" linkTo="/marketplace"></Card>
        <Card name="Rolling Ape" imageURI="/nft/nft02.png" price="7" owner="Unknowest" linkTo="/marketplace"></Card>
        <Card name="Lost in Space" imageURI="/nft/nft03.png" price="2" owner="Wereywanle" linkTo="/marketplace"></Card>
        <Card name="Rolling Ape" imageURI="/nft/nft02.png" price="7" owner="Unknowest" linkTo="/marketplace"></Card>
        <PaddedSpace />
      </NFTScrollableContainer>

      <NFTScrollableContainer>
        <PaddedSpace />
        <Card name="God of War" imageURI="/nft/nft01.png" price="247" owner="ToomuchLag" linkTo="/marketplace"></Card>
        <Card name="Rolling Ape" imageURI="/nft/nft02.png" price="7" owner="Unknowest" linkTo="/marketplace"></Card>
        <Card name="Lost in Space" imageURI="/nft/nft03.png" price="2" owner="Wereywanle" linkTo="/marketplace"></Card>
        <Card name="Rolling Ape" imageURI="/nft/nft02.png" price="7" owner="Unknowest" linkTo="/marketplace"></Card>
        <Card name="Lost in Space" imageURI="/nft/nft03.png" price="2" owner="Wereywanle" linkTo="/marketplace"></Card>
        <Card name="Rolling Ape" imageURI="/nft/nft02.png" price="7" owner="Unknowest" linkTo="/marketplace"></Card>

        <PaddedSpace />
      </NFTScrollableContainer>
    </GreyContainerMain>
  );
}
