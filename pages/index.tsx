import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Filled_CTA_Button from '../components/Button/CTA/Filled';
import Ghost_CTA_Button from '../components/Button/Ghost';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import Card from '../components/Card';
import Background from '../components/AnimatedBackground';
import { FaQuestion } from 'react-icons/fa';
import { Button } from 'antd';
import _ from 'lodash';
import { useAPIContext } from '../contexts/api/index';
import MainFooter from '../components/Footer';
import Hero from '../components/Hero';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* background: #0c0c0c; */

  width: 100%;
  position: relative;
`;

const MarketplaceContainer = styled.div`
  min-height: 100vh;
  width: 100%;

  background: #0c0c0c;
  overflow: hidden;
  .main__container__wrapper {
    width: 100%;
    margin: 0 auto;
  }
  @media screen and (max-width: 760px) {
    width: 100%;
    padding-left: 0px;
  }
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

  @media screen and (max-width: 760px) {
    margin: 0px;
    font-size: 1.9rem;
    line-height: 50px;
    max-width: 100%;
    font-weight: 600 !important;
    padding: 50px 20px;
  }
  @media screen and (max-width: 320px) {
    font-size: 1.5rem;
    line-height: 35px;
  }
`;

const ButtonContainer = styled.div`
  margin-left: 55px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  gap: 30px;

  @media screen and (max-width: 760px) {
    margin: 0;
    width: 95%;
    margin: 0px auto;
    justify-content: center;
  }
`;

const FilterContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -270px;

  .filter__wrapper {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    .filter__top {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #ccc;
    }
    .filter__bottom {
      display: flex;
      margin-top: 10px;
      gap: 10px;

      @media screen and (max-width: 760px) {
        flex-direction: column;
      }
    }
  }
  @media screen and (max-width: 769px) {
    width: 90%;
    margin: 0px auto;
    flex-direction: column;
    gap: 8px;
  }
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
const NFTSubCont = styled.div`
  width: 90%;
  margin: 0px auto;
  overflow-x: scroll;
  margin-top: -50px;
  transition: all 0.3s ease-in;
  .nft__sub__container {
    display: flex;
    width: max-content;
    gap: 8px;
    transition: all 0.3s ease-in;
  }
`;

export const NFTContainer = styled.div`
  transition: all 0.3s linear;
  opacity: 1;
  z-index: 3;
  background: linear-gradient(254.33deg, rgba(255, 255, 255, 0.1) 1.71%, rgba(255, 255, 255, 0.05) 99.35%);
  backdrop-filter: blur(16.86px);
  border-radius: 20px 20px 0px 0px;
  width: 90%;
  min-height: 400px;
  margin: 0px auto;
  margin-top: 80px;
  border: 1px solid #383838;
  transition: all 0.3s linear;
  @media screen and (max-width: 769px) {
    width: 95%;
  }

  &:hover {
    padding-bottom: 40px;
    transition: all 0.3s linear;
    ${NFTSubCont} {
      margin-top: 40px;
      padding-bottom: 20px;
      transition: all 0.3s linear;
    }
  }
`;

const ParentNFTCont = styled.div``;

const DiscoverAndAnimate = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  position: relative;
`;

const DiscoverPart = styled.div`
  flex: 0.5;
  margin-left: 50px;
  @media screen and (max-width: 760px) {
    width: 100%;
    margin: 0px auto;
    flex: 1;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: max-content;
    padding-bottom: 50px;
  }
`;

const AnimatePart = styled.div`
  flex: 0.5;
  /* margin-top: -330px; */
  z-index: 0;
  @media screen and (max-width: 760px) {
    display: none;
  }
`;

const ExploreNFT = styled.div`
  height: 100%;
  width: 60px;
  position: absolute;
  margin-left: 0;

  img {
    width: 60px !important;
    height: 100vh !important;
    object-fit: contain;
  }
  @media screen and (max-width: 760px) {
    display: none;
  }
`;

const RoundBlueLine = styled.div`
  position: absolute;
  margin-left: 300px;
  margin-top: 65px;
  @media screen and (max-width: 760px) {
    margin-left: 150px;
    margin-top: 45px;
    display: none;
    img {
      width: 100px !important;
    }
  }
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

const Footer = styled.footer`
  width: 100%;
  width: calc(100% - 150px);
  margin: 0px auto;
  margin-top: 80px;
  height: 250px;

  .footer__container {
    background: rgba(255, 255, 255, 0.1);
    padding: 20px 30px;
    height: 100%;
    border-radius: 10px;
    display: flex;

    .footer__left {
      flex: 0.7;

      h2 {
        font-family: 'MonumentExtended';
        font-size: 1.8rem;
        font-weight: 800;
        line-height: 38px;
        color: rgba(255, 255, 255, 1);
      }
      p {
        max-width: 500px;
        color: rgba(255, 255, 255, 0.3);
        font-size: 0.8rem;
      }
      button {
        border-radius: 5px;
        margin-top: 10px;
      }
    }
    .footer__right {
      flex: 0.3;
      margin-top: -70px;
      img {
        width: 310px !important;
        height: 300px !important;
        object-fit: contain;
        opacity: 0.6;
      }
    }
  }
  @media screen and (max-width: 769px) {
    width: 95%;
    height: max-content;
    .footer__container {
      flex-direction: column;
    }
    .footer__left {
      flex: 1;
      h2 {
        font-size: 1.4rem !important;
        line-height: 30px !important ;
      }
    }
    .footer__right {
      flex: 1;
      margin-top: 20px !important;
    }
  }
`;

const NoItemContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  background: linear-gradient(254.33deg, rgba(255, 255, 255, 0.1) 1.71%, rgba(255, 255, 255, 0.05) 99.35%);
  backdrop-filter: blur(16.86px);
  padding: 50px 0;
  border-radius: 20px;
  margin-top: 50px;
`;

const HeroContainer = styled.div`

`

export default function Homepage() {
  const [searchValue, setSearchValue] = useState('');
  const { allCollections, loadAllCollections } = useAPIContext();

  useEffect(() => {
    (() => {
      loadAllCollections(1);
    })();
  }, []);

  return (
    <>
      <MainContainer>
        <MarketplaceContainer>
          <div className="main__container__wrapper">
            <div className="header">
              <Navbar />
            </div>
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

            <FilterContainer>
              <div className="filter__wrapper">
                <div className="filter__top">
                  <Image height={18} width={18} src="/icons/filter.svg" />
                  <div> Filter by</div>
                </div>
                <div className="filter__bottom">
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
                      placeholder="Search Collection"
                      onChange={e => {
                        setSearchValue(e.target.value);
                      }}
                      onClick={() => setSearchValue('')}
                    />
                  </SearchBar>
                </div>
              </div>
            </FilterContainer>
            <ParentNFTCont>
              {allCollections.length === 0 ? (
                <NoItemContainer>
                  <span style={{ color: '#f5f5f5', fontSize: 30, fontFamily: 'Rubik' }}>No Item To Display</span>
                </NoItemContainer>
              ) : (
                <NFTContainer className="nft-container">
                  <NFTSubCont>
                    <div className="nft__sub__container">
                      {_.map(allCollections, collection => (
                        <>
                          <Card
                            name={collection?.collectionName}
                            price="0"
                            owner={collection?.metadata.owner}
                            imageURI={collection?.metadata.imageURI}
                            key={collection?.collectionId}
                            linkTo={`/collections/${collection?.collectionId}`}
                          />
                        </>
                      ))}
                    </div>
                  </NFTSubCont>
                </NFTContainer>
              )}
            </ParentNFTCont>
          </div>
          <Footer>
            <div className="footer__container">
              <div className="footer__left">
                <h2>Introducing the Vefi bridging technology </h2>
                <p>
                  Get to link your Nft from one network to another Quick and easy right from the VefiNft website Read
                  more
                </p>
                <Button type="primary">Start Bridging</Button>
              </div>
              <div className="footer__right">
                <Image src="/objects/bridge.svg" width={300} height={300} alt="image" />
              </div>
            </div>
          </Footer>
          <HeroContainer>          <Hero/>
</HeroContainer>
        </MarketplaceContainer>

        <FooterHelpIcon>
          <div className="help">
            <FaQuestion />
          </div>
        </FooterHelpIcon>
        

      </MainContainer>
      <MainFooter/>
    </>
  );
}
