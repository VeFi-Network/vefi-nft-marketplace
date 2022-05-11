import { useRouter } from 'next/router'
import Head from 'next/head';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import GreyContainer from '../../components/Collections/GreyContainer';
import CollectionData from '../../components/Collections/CollectionData';

const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: #0C0C0C;



`;

const ArtistContainer = styled.div`
    min-height: 100vh;
    width: 1800px;
    max-width: 2000px;
    min-width: 1000px;
    background: #0C0C0C;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 20px;
    padding-bottom: 30px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;


`;

const NavbarContainer = styled.div`
    width: 100%;

`;

const SolarSystem = styled.div`
    margin-top: 10px;
    width: 100%;
    border-top: 5px solid #5C95FF;
    border-bottom: 5px solid #5C95FF;
    height: 265px;
    background-size: 100%;
    background-height: 100%;


`;

const SolarImage = styled.img`
    height: 254px;
    width: 100%;


`;

const ColoredBackground = styled.div`
    width: 825px;
    height: 960px;
    background: url('/objects/colorBackground.svg') no-repeat;
    position: absolute;
    top: 15%;
    right: 0%;
    z-index: 0;


`;

const StyledViewNft = styled.img`
    position: absolute;
    height: 585px;
    width: 97px;
    left: 50px;
    top: 380px;


`;


const Collection = () => {
  const router = useRouter()
  const { id } = router.query;


  return (
  <>
  <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com"  />
    <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet" /> 
  </Head>
  <MainContainer>
        <ArtistContainer>
            <NavbarContainer>
                 <Navbar />
            </NavbarContainer>
           
            <SolarSystem>
                <SolarImage src="/objects/solarSystem.png"/>
            </SolarSystem>

            <CollectionData></CollectionData>
           
            <GreyContainer></GreyContainer>
            
            <StyledViewNft src='/icons/exploreNFT.png' />
            
            <ColoredBackground></ColoredBackground>
        </ArtistContainer>
      
      </MainContainer>
  </>
      )
}

export default Collection
