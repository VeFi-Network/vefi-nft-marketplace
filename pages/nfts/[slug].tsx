import { Spin } from 'antd';
import Navbar from '../../components/Navbar';
import styled from 'styled-components';
import Image from 'next/image';
import Filled_CTA_Button from '../../components/Button/CTA/Filled';
import Listing from '../../components/ListingTable/index';
import PriceChart from '../../components/PriceChart/index';
import { usePageQuery } from '../../hooks/query';
import { useAPIContext } from '../../contexts/api';
import { useEffect, useState } from 'react';
import { FiEye, FiHeart, FiInfo } from 'react-icons/fi';
import SellPopup from '../../components/Popup/SellPopup';
import OfferPopup from '../../components/Popup/OfferPopup';

const RootContainer = styled.div`
  width: 100%;
  background: #0c0c0c;
`;

const NavContainer = styled.div`
  max-width: 100%;
`;
const ProfileContainer = styled.div`
  min-height: 100vh;
  width: 100%;

  background: #0c0c0c;
  padding-top: 10px;
  padding-bottom: 30px;
  overflow: hidden;
  position: relative;

  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;

const Banner = styled.div`
  margin-top: 10px;
  width: 100%;
  border-top: 5px solid #5c95ff;
  border-bottom: 5px solid #5c95ff;
  height: 98px;
  background: ${(props: any) => `url(${props.background})`} no-repeat;
  display: flex;
  background-size: cover;
  justify-content: center;
  align-items: center;
  position: relative;
  @media screen and (max-width: 760px) {
    height: 150px;
    margin: 0px auto;
    flex-direction: column;
  }
`;

// const BannerCaption = styled.h3`
//   font-weight: bold;
//   color: #fff;
//   font-size: 40px;
//   @media screen and (max-width: 760px) {
//     text-align: center;
//     font-size: 2rem;
//   }
// `;

// const ProfileAvatar = styled.div`
//   border: 5px solid #5c95ff;
//   border-radius: 50%;
//   width: 125px;
//   height: 125px;
//   position: absolute;
//   left: 80%;
//   background: ${(props: any) => `url(${props.background})`} no-repeat;
//   background-size: 100% 100%;
//   @media screen and (max-width: 760px) {
//     left: auto;
//     align-items: center;
//     top: 50%;
//     justify-content: center;
//     text-align: center;
//   }
// `;

const CollectionInfoCont = styled.div`
  margin-top: 15px;
  padding: 10px;
  display: flex;
  justify-content: center;
  text-align: center;
  color: white;
  gap: 17px;

  .name {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 47px;
    color: #ffffff;
  }

  .creator {
    display: flex;
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #ffffff;
    gap: 12px;

    .blue {
      color: #5c95ff;
    }
  }
  @media screen and (max-width: 760px) {
    padding-top: 60px;
  }
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

const BodyContainer = styled.div`
  margin-top: 45px;
  padding: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
  color: #fff;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
  gap: 20px;

  @media screen and (max-width: 760px) {
    width: 90%;
    margin: 0 auto;

    flex-direction: column;
  }
`;
const LeftColumn = styled.div`
  flex: 0.3;
  width: 100%;
  display: flex;
  max-height: auto;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 10px;
  img {
    border-radius: 21px;
    object-fit: cover;
  }
  @media screen and (max-width: 760px) {
    margin: 0 auto;
    flex: 1;
    justify-content: center;
    align-items: center;
    img {
      width: 330px !important;
      height: 400px !important;
      object-fit: cover;
    }
  }
  @media screen and (max-width: 320px) {
    img {
      width: 300px !important;
      height: 400px !important;
      object-fit: cover;
    }
  }
`;
const RightColumn = styled.div`
  flex: 0.7;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;
const ProfileAvatarCard = styled.div``;

const LikeButtonContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  justify-content: center;
  top: 60px;
  z-index: 5;
  left: 5%;
  background: linear-gradient(180deg, #ffffff 0%, #b4b0b0 100%);
  border-radius: 12px;
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 760px) {
    img {
      object-fit: contain;
      width: 40px !important;
      height: 40px !important ;
    }
  }
`;

const LikeButton = styled.img`
  margin-left: -5px;
  margin-top: 5px;
  filter: drop-shadow(-3px 2px 6px rgba(0, 0, 0, 0.23));
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  height: 504px;
  border-radius: 20px;
  margin-top: 25px;
  background: linear-gradient(254.33deg, rgba(255, 255, 255, 0.1) 1.71%, rgba(255, 255, 255, 0.05) 99.35%);
  backdrop-filter: blur(16.86px);
  padding: 30px;
  border: 1px solid #383838;
  overflow-y: scroll;
  @media screen and (max-width: 760px) {
    width: 100%;
    height: max-content;
  }
`;

const DescriptionHeading = styled.h3`
  display: flex;
  align-items: center;
  column-gap: 10px;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
`;

const DescriptionText = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  height: 400px;
  overflow: auto;
`;

const ProfileStats = styled.div`
  padding-top: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 15px;
  .stat {
    display: flex;
    gap: 5px;
    align-items: center;
    font-size: 1.4rem;

    span {
      display: flex;
    }
  }
  .info {
    display: flex;
    font-size: 20px;
    align-items: center;
  }
  @media screen and (max-width: 760px) {
    .stat {
      font-size: 0.9rem;
    }
  }
`;

const ItemName = styled.p`
  font-size: 3rem;
  line-height: 3.4rem;
  margin: 0 0 25px 0;
  font-weight: bold;

  @media screen and (max-width: 760px) {
    font-size: 1.5rem;
    line-height: 1.8rem;
    margin: 10px 0 25px 0;
  }
`;

const CTA = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
`;

const ParentContainer = styled.div`

`;

export default function NFT() {
  const { slug } = usePageQuery();
  const { nftById, collectionById, loadCollectionById, loadNFTById } = useAPIContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sellModal,setSellModal] = useState(false);
  const [offerModal,setOfferModal] = useState(false);
  const [transition,setTransition] = useState(false);

  useEffect(() => {
    if (!!slug) {
      const splitSlug = (slug as string).split(':');
      loadNFTById(splitSlug[0], parseInt(splitSlug[1]));
      loadCollectionById(splitSlug[0]);
      setIsLoading(false);
    }
  }, [slug]);



  const handleBackgroundClick = ()=>{
    if(offerModal){
      setTransition(false);
      setTimeout(()=>setOfferModal(false),500);
    }
    if(sellModal){
      setTransition(false);
      setTimeout(()=>setSellModal(false),500);
    }
    
  }



  return (
    <ParentContainer>
      <RootContainer onClick={handleBackgroundClick} open={transition}>
        <ProfileContainer>
          <NavContainer>
            <Navbar />
          </NavContainer>

          <Spin spinning={isLoading}>
            {/* <Banner background={collectionById.metadata.bannerURI}>
              <BannerCaption>{collectionById.collectionName || 'Collection Name'}</BannerCaption>
              <ProfileAvatar background={collectionById.metadata.imageURI} />
            </Banner> */}

            <CollectionInfoCont>
              <div className="creator">
                Created By: <div className="blue"> {nftById?.metadata?.owner || 'NFT owner'}</div>{' '}
                <Image src="/icons/verification.svg" alt="" width="20px" height="20px" className="tick" />
              </div>
            </CollectionInfoCont>

            <BodyContainer>
              <LeftColumn>
                <ProfileAvatarCard>
                  <LikeButtonContainer>
                    <LikeButton src="/icons/dark-heart.png" />
                  </LikeButtonContainer>
                  <img src={nftById.metadata?.imageURI} alt="NFT Image" width={398} height={598} />
                </ProfileAvatarCard>

                <DescriptionContainer>
                  <DescriptionHeading>
                    <FiInfo />
                    Description
                  </DescriptionHeading>
                  <DescriptionText>{nftById.metadata?.description || 'No Description Available'}</DescriptionText>
                </DescriptionContainer>
              </LeftColumn>
              <RightColumn>
                <ProfileStats>
                  <div className="stat">
                    <span>
                      <FiEye />
                    </span>
                    <span>3.5k Views</span>
                  </div>
                  <div className="stat">
                    <span>
                      <FiHeart />
                    </span>
                    <span>1.5k Likes</span>
                  </div>
                </ProfileStats>
                <ItemName>{nftById.metadata?.name || 'NFT Name'}</ItemName>
                <div className="button__wrapper">
                  <CTA>
                    {/* <Filled_CTA_Button backgroundColor="#5C95FF" color="#fff">
                      Buy Now
                    </Filled_CTA_Button> */}
                    <Filled_CTA_Button 
                    onClick={(e:any)=>{
                      e.stopPropagation();
                      setOfferModal(!offerModal);
                      setTimeout(()=>setTransition(true),10);
                      }} 
                    backgroundColor="#fff" color="#5C95FF">
                      Make an offer
                    </Filled_CTA_Button>
                    <Filled_CTA_Button 
                    onClick={(e:any)=>{
                      e.stopPropagation();
                      setSellModal(!sellModal);
                      setTimeout(()=>setTransition(true),10);
                      }} backgroundColor="#fff" color="#5C95FF">
                      Sell
                    </Filled_CTA_Button>
                  </CTA>
                </div>
                <PriceChart />
                <Listing />
              </RightColumn>
            </BodyContainer>

            {/* <ColoredBackground></ColoredBackground> */}
          </Spin>
        </ProfileContainer>
      </RootContainer>

      <SellPopup  transition={transition} nftById={nftById} modal={sellModal} setModal={setSellModal} />
      <OfferPopup transition={transition} nftById={nftById} modal={offerModal} setModal={setOfferModal} />
    </ParentContainer>
  );
}
