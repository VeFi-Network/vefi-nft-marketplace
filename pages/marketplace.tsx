import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import GreyMarketContainer from '../components/marketplace/GreyMarketContainer';
import FilterComponent from '../components/marketplace/FilterComponent';

type Props = {};

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
  width: 100vw;
  background: #0c0c0c;
  padding-top: 20px;
  padding-bottom: 30px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const NavbarContainer = styled.div`
  width: 1400px;
  min-width: 1000px;
  padding-left: 100px;
  z-index: 3;

  @media (max-width: 1280px) {
    width: 1100px;
    min-width: 700px;
    padding-left: 0px;
  }
`;

const StyledViewNft = styled.img`
  height: 585px;
  width: 97px;
  margin-top: 52px;
`;

const ColoredBackground = styled.div`
  width: 964px;
  height: 1048px;
  background: url('/objects/marketplaceObjects.svg') no-repeat;
  position: absolute;
  top: -5%;
  right: 0%;
  z-index: 0;
`;

const ParentGreyAndExploreNFT = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const FilterAndGrey = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Marketplace({}: Props) {
  return (
    <>
      <MainContainer>
        <MarketplaceContainer>
          <NavbarContainer>
            <Navbar />
          </NavbarContainer>

          <ParentGreyAndExploreNFT>
            <StyledViewNft src="/icons/exploreNFT.png" />
            <FilterAndGrey>
              <FilterComponent />
              <GreyMarketContainer />
            </FilterAndGrey>
            <ColoredBackground></ColoredBackground>
          </ParentGreyAndExploreNFT>
        </MarketplaceContainer>
      </MainContainer>
    </>
  );
}
