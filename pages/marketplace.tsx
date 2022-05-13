import React from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar'
import GreyMarketContainer from '../components/marketplace/GreyMarketContainer';
import FilterComponent from '../components/marketplace/FilterComponent';

type Props = {}

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
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const NavbarContainer = styled.div`
  max-width: 1755px;
  width: 95%;
  min-width: 1000px;
  position: fixed;
  z-index: 3;
`;




const StyledViewNft = styled.img`
  position: absolute;
  height: 585px;
  width: 97px;
  left: 50px;
  top: 150px;
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



export default function marketplace({}: Props) {



  return (
    <>
    <MainContainer>
        <MarketplaceContainer>
            <NavbarContainer>
                <Navbar />
            </NavbarContainer>

            <FilterComponent />

            <GreyMarketContainer />
        

            <StyledViewNft src="/icons/exploreNFT.png" />

            <ColoredBackground></ColoredBackground>
        </MarketplaceContainer>

    </MainContainer>
    </>
  )
}