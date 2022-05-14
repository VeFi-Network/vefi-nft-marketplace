import { useRouter } from 'next/router';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import GreyContainer from '../../components/Collections/GreyContainer';
import CollectionData from '../../components/Collections/CollectionData';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #0c0c0c;
  width: 100%;
`;

const CollectionContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 2000px;
  min-width: 1000px;
  background: #0c0c0c;
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

const Banner = styled.div`
  margin-top: 10px;
  width: 100%;
  border-top: 5px solid #5c95ff;
  border-bottom: 5px solid #5c95ff;
  height: 265px;
  background-size: 100%;
`;

const CollectionImage = styled.img`
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
  const router = useRouter();
  // const { id } = router.query;

  return (
    <>
      <MainContainer>
        <CollectionContainer>
          <NavbarContainer>
            <Navbar />
          </NavbarContainer>

          <Banner>
            <CollectionImage src="/objects/solarSystem.png" />
          </Banner>

          <CollectionData></CollectionData>

          <GreyContainer></GreyContainer>

          <StyledViewNft src="/icons/exploreNFT.png" />

          <ColoredBackground></ColoredBackground>
        </CollectionContainer>
      </MainContainer>
    </>
  );
};

export default Collection;
