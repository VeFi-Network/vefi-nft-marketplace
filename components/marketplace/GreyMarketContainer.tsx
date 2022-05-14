import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Card from '../Card';

const GreyContainerMain = styled.div`
  width: 1248px;
  padding-bottom: 20px;
  background: linear-gradient(254.33deg, rgba(255, 255, 255, 0.1) 1.71%, rgba(255, 255, 255, 0.05) 99.35%);
  backdrop-filter: blur(16.86px);
  border-radius: 20px;
  margin-top: 50px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PaddedSpace = styled.div`
  min-width: 50px;
`;

const NFTScrollableContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 1200px;
  height: 415px;
  flex-direction: row;
  gap: 46px;
  overflow-x: auto;
  transition-duration: 500ms;
  opacity: 1;
  margin-top: 35px;
  margin-bottom: 10px;
`;

const TopSellersDiv = styled.div`
  width: 1200px;
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
`;

const CollectionCard = styled.div`
  width: 200px;
  height: 45px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  transition-duration: 250ms;
  cursor: pointer;

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
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
  }
`;

const topSellersList = [
  {
    name: 'Beasyzakustler',
    verified: true,
    imageUrl: '/marketplace/topSellers/1.png',
  },
  {
    name: 'Cassy Mcconnell',
    verified: false,
    imageUrl: '/marketplace/topSellers/2.png',
  },
  {
    name: 'Coben Day',
    verified: true,
    imageUrl: '/marketplace/topSellers/3.png',
  },
  {
    name: 'Bradly Giles',
    verified: false,
    imageUrl: '/marketplace/topSellers/1.png',
  },
  {
    name: 'Saim Roth',
    verified: false,
    imageUrl: '/marketplace/topSellers/4.png',
  },
  {
    name: 'Dylan Bowen',
    verified: false,
    imageUrl: '/marketplace/topSellers/5.png',
  },
  {
    name: 'Heini Fitzpatrick',
    verified: false,
    imageUrl: '/marketplace/topSellers/8.png',
  },
  {
    name: 'Neshawn Glover',
    verified: false,
    imageUrl: '/marketplace/topSellers/6.png',
  },
  {
    name: 'Nelson Daugherty',
    verified: false,
    imageUrl: '/marketplace/topSellers/7.png',
  },
  {
    name: 'Shiloh York',
    verified: true,
    imageUrl: '/marketplace/topSellers/8.png',
  },
];

type Props = {};

export default function GreyMarketContainer({}: Props) {
  return (
    <GreyContainerMain>
      <NFTScrollableContainer>
        <PaddedSpace />
        <Card collectionName="God of War" NFTImageURI="/nft/nft01.png" NFTPrice="247" NFTName="ToomuchLag"></Card>
        <Card collectionName="Rolling Ape" NFTImageURI="/nft/nft02.png" NFTPrice="7" NFTName="Unknowest"></Card>
        <Card collectionName="Lost in Space" NFTImageURI="/nft/nft03.png" NFTPrice="2" NFTName="Wereywanle"></Card>
        <Card collectionName="Rolling Ape" NFTImageURI="/nft/nft02.png" NFTPrice="7" NFTName="Unknowest"></Card>
        <Card collectionName="Rolling Ape" NFTImageURI="/nft/nft02.png" NFTPrice="7" NFTName="Unknowest"></Card>
        <Card collectionName="Lost in Space" NFTImageURI="/nft/nft03.png" NFTPrice="2" NFTName="Wereywanle"></Card>

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
        <Card collectionName="God of War" NFTImageURI="/nft/nft01.png" NFTPrice="247" NFTName="ToomuchLag"></Card>
        <Card collectionName="Rolling Ape" NFTImageURI="/nft/nft02.png" NFTPrice="7" NFTName="Unknowest"></Card>
        <Card collectionName="Lost in Space" NFTImageURI="/nft/nft03.png" NFTPrice="2" NFTName="Wereywanle"></Card>
        <Card collectionName="Rolling Ape" NFTImageURI="/nft/nft02.png" NFTPrice="7" NFTName="Unknowest"></Card>
        <Card collectionName="Rolling Ape" NFTImageURI="/nft/nft02.png" NFTPrice="7" NFTName="Unknowest"></Card>
        <Card collectionName="Lost in Space" NFTImageURI="/nft/nft03.png" NFTPrice="2" NFTName="Wereywanle"></Card>

        <PaddedSpace />
      </NFTScrollableContainer>

      <NFTScrollableContainer>
        <PaddedSpace />
        <Card collectionName="God of War" NFTImageURI="/nft/nft01.png" NFTPrice="247" NFTName="ToomuchLag"></Card>
        <Card collectionName="Rolling Ape" NFTImageURI="/nft/nft02.png" NFTPrice="7" NFTName="Unknowest"></Card>
        <Card collectionName="Lost in Space" NFTImageURI="/nft/nft03.png" NFTPrice="2" NFTName="Wereywanle"></Card>
        <Card collectionName="Rolling Ape" NFTImageURI="/nft/nft02.png" NFTPrice="7" NFTName="Unknowest"></Card>
        <Card collectionName="Rolling Ape" NFTImageURI="/nft/nft02.png" NFTPrice="7" NFTName="Unknowest"></Card>
        <Card collectionName="Lost in Space" NFTImageURI="/nft/nft03.png" NFTPrice="2" NFTName="Wereywanle"></Card>

        <PaddedSpace />
      </NFTScrollableContainer>
    </GreyContainerMain>
  );
}
