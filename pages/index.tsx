import React, { useState } from 'react';
import styled from 'styled-components';
import Filled_CTA_Button from '../components/Button/CTA/Filled';
import Ghost_CTA_Button from '../components/Button/Ghost';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import Card from '../components/Card';
import Background from '../components/AnimatedBackground';
import { FaQuestion } from 'react-icons/fa';
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #0c0c0c;
  width: 100%;
  position: relative;
`;

const MarketplaceContainer = styled.div`
  min-height: 100vh;
  width: 1800px;
  max-width: 2000px;
  min-width: 1000px;
  background: #0c0c0c;
  padding-left: 55px;
  padding-top: 20px;
  padding-bottom: 30px;
  overflow: hidden;
`;

const DiscoverText = styled.div`
  font-family: 'MonumentExtended';
  font-style: normal;
  font-weight: 800;
  font-size: 3.5rem;
  margin-top: 60px;
  display: flex;
  align-items: center;
  color: #ffffff;
  margin-left: 55px;
  line-height: 120%;
`;

const ButtonContainer = styled.div`
  margin-left: 55px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const FilterByText = styled.div`
  margin-top: -240px;
  margin-left: 55px;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ebf8ff;

  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-top: 21px;
  margin-left: 55px;
`;

const FilterBtn = styled.button`
  background: #373943;
  border-radius: 11px;
  cursor: pointer;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  border: none;

  color: #ccc;
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const FilterAllBtn = styled.button`
  background: #373943;
  border-radius: 11px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  border: none;

  color: #ccc;
  padding: 10px 50px 10px 10px;

  cursor: pointer;

  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 20px 10px 10px;

  background: #373943;
  border-radius: 11px;
  gap: 10px;

  z-index: 3;

  .input {
    background: transparent;
    color: #828282;
    border: none;
    outline: none;
    width: 150px;
  }
`;

const NFTContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;

  transition: all 300ms ease-in-out;
  opacity: 1;
  z-index: 3;
  background: linear-gradient(254.33deg, rgba(255, 255, 255, 0.1) 1.71%, rgba(255, 255, 255, 0.05) 99.35%);
  backdrop-filter: blur(16.86px);
  border-radius: 20px 20px 0px 0px;
  width: -moz-calc(100% - 150px);
  width: -webkit-calc(100% - 150px);
  width: -o-calc(100% - 150px);
  width: calc(100% - 150px);
  height: 400px;
  margin: 0px auto;
  margin-top: 80px;
  border: 1px solid #383838;
`;

const NFTTransparentContainer = styled.div`
  margin-left: 55px;
  background: linear-gradient(254.33deg, rgba(255, 255, 255, 0.1) 1.71%, rgba(255, 255, 255, 0.05) 99.35%);
  backdrop-filter: blur(16.86px);
  border-radius: 20px 20px 0px 0px;
  box-sizing: border-box;
  height: 400px;
  width: -moz-calc(100% - 150px);
  width: -webkit-calc(100% - 150px);
  width: -o-calc(100% - 150px);
  width: calc(100% - 150px);
  margin-top: -310px;
  border: 1px solid #383838;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease-out;
`;

const ParentNFTCont = styled.div``;

const NFTSubCont = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: -120px;
  width: 100%;
  gap: 20px;
  transition: all 300ms ease-in-out;
  opacity: 1;
`;

const PaddedSpace = styled.div`
  min-width: 50px;
`;

const NFTScrollableContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  display: none;
  align-items: center;
  margin-top: 20px;

  height: 415px;

  flex-direction: row;
  gap: 25px;
  overflow-x: auto;
  transition-duration: 500ms;
  opacity: 1;
`;

const DiscoverAndAnimate = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  position: relative;
`;

const SeeMore = styled.div`
  color: white;
  display: none;
  margin-left: 90%;
  margin-top: 15px;
  cursor: pointer;
  flex-direction: row;
  gap: 15px;
`;

const DiscoverPart = styled.div`
  flex: 0.5;
`;

const AnimatePart = styled.div`
  flex: 0.5;
  /* margin-top: -330px; */
  z-index: 0;
`;

const ExploreNFT = styled.div`
  height: 585px;
  width: 97px;

  position: absolute;
  margin-left: -60px;
`;

const RoundBlueLine = styled.div`
  position: absolute;
  margin-left: 300px;
  margin-top: 65px;
`;
const FooterHelpIcon = styled.div`
  position: absolute;
  bottom: 0;
  margin-bottom: 20px;
  right: 0;
  margin-right: 20px;
  width: 60px;
  height: 60px;
  background: #373943;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  .help {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1.5rem;
    color: #fff;
  }
`;

export default function Homepage() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <MainContainer>
        <MarketplaceContainer>
          <Navbar />
          <DiscoverAndAnimate>
            <ExploreNFT>
              <Image width="97px" height="585px" src="/icons/exploreNFT.png" />
            </ExploreNFT>
            <DiscoverPart>
              <RoundBlueLine>
                <Image width="149px" height="80px" src="/objects/round.svg" />
              </RoundBlueLine>
              <DiscoverText>Discover, collect, and sell extraordinary NFTs</DiscoverText>
              <ButtonContainer>
                <Filled_CTA_Button>Get Started</Filled_CTA_Button>
                <Ghost_CTA_Button>Become a Creator</Ghost_CTA_Button>
              </ButtonContainer>
            </DiscoverPart>
            <AnimatePart>
              <Background />
            </AnimatePart>
          </DiscoverAndAnimate>

          <FilterByText>
            <Image height={18} width={18} src="/icons/filter.svg" />
            <div> Filter by</div>
          </FilterByText>
          <FilterContainer>
            <FilterAllBtn>All</FilterAllBtn>
            <FilterBtn>
              Top Selling{' '}
              <div style={{ marginTop: -1 }}>
                <Image width="12px" height="9px" src="/icons/downIcon.svg" />
              </div>
            </FilterBtn>
            <FilterBtn>
              Price{' '}
              <div style={{ marginTop: -1 }}>
                <Image width="12px" height="9px" src="/icons/downIcon.svg" />
              </div>
            </FilterBtn>
            <SearchBar>
              <Image height="18px" width="18px" src={'/icons/search.svg'} />{' '}
              <input
                className="input"
                value={searchValue}
                placeholder="Search artwork"
                onChange={e => {
                  setSearchValue(e.target.value);
                }}
                onClick={() => setSearchValue('')}
                placeholder="Search Artwork"
              />
            </SearchBar>
          </FilterContainer>
          <ParentNFTCont>
            <NFTContainer className="nft-container">
              <NFTSubCont>
                <Card
                  collectionName="God of War"
                  NFTImageURI="/nft/nft01.png"
                  NFTPrice="247"
                  NFTName="ToomuchLag"
                ></Card>
                <Card collectionName="Rolling Ape" NFTImageURI="/nft/nft02.png" NFTPrice="7" NFTName="Unknowest"></Card>
                <Card
                  collectionName="Lost in Space"
                  NFTImageURI="/nft/nft03.png"
                  NFTPrice="2"
                  NFTName="Wereywanle"
                ></Card>
              </NFTSubCont>
            </NFTContainer>
            <NFTTransparentContainer className="transparent-cont">
              <NFTScrollableContainer className="hover-container">
                <PaddedSpace />
                <Card
                  collectionName="God of War"
                  NFTImageURI="/nft/nft01.png"
                  NFTPrice="247"
                  NFTName="ToomuchLag"
                ></Card>
                <Card collectionName="Rolling Ape" NFTImageURI="/nft/nft02.png" NFTPrice="7" NFTName="Unknowest"></Card>
                <Card
                  collectionName="Lost in Space"
                  NFTImageURI="/nft/nft03.png"
                  NFTPrice="2"
                  NFTName="Wereywanle"
                ></Card>
                <Card collectionName="Rolling Ape" NFTImageURI="/nft/nft02.png" NFTPrice="7" NFTName="Unknowest"></Card>
                <Card collectionName="Rolling Ape" NFTImageURI="/nft/nft02.png" NFTPrice="7" NFTName="Unknowest"></Card>
                <Card
                  collectionName="Lost in Space"
                  NFTImageURI="/nft/nft03.png"
                  NFTPrice="2"
                  NFTName="Wereywanle"
                ></Card>

                <PaddedSpace />
              </NFTScrollableContainer>

              <SeeMore className="hover-container">
                See more
                <Image height={18} width={18} src="/icons/right-arrow.svg" />
              </SeeMore>
            </NFTTransparentContainer>
          </ParentNFTCont>
        </MarketplaceContainer>
        <FooterHelpIcon>
          <div className="help">
            <FaQuestion />
          </div>
        </FooterHelpIcon>
      </MainContainer>
    </>
  );
}
