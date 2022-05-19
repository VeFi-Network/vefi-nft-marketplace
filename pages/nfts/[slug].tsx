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
  max-width: 2000px;
  min-width: 1000px;
  background: #0c0c0c;
  padding-top: 10px;
  padding-bottom: 30px;
  overflow: hidden;
  position: relative;
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
`;

const BannerCaption = styled.h3`
  font-weight: bold;
  color: #fff;
  font-size: 40px;
`;

const ProfileAvatar = styled.div`
  border: 5px solid #5c95ff;
  border-radius: 50%;
  width: 125px;
  height: 125px;
  position: absolute;
  left: 80%;
  background: ${(props: any) => `url(${props.background})`} no-repeat;
  background-size: 100% 100%;
`;

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
  margin-top: 40px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  color: #fff;
  justify-content: center;
`;
const LeftColumn = styled.div`
  width: 40%;
  display: flex;
  max-height: auto;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 10px;
  img {
    border-radius: 21px;
  }
`;
const RightColumn = styled.div`
  width: 60%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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
  margin-top: 15px;
  background: linear-gradient(254.33deg, rgba(255, 255, 255, 0.1) 1.71%, rgba(255, 255, 255, 0.05) 99.35%);
  backdrop-filter: blur(16.86px);
  padding: 30px;
  border: 1px solid #383838;
`;

const DescriptionHeading = styled.h3`
  display: flex;
  column-gap: 10px;
  font-size: 18px;
`;

const DescriptionText = styled.p`
  font-size: 20px;
  height: 400px;
  overflow: auto;
`;

const ProfileStats = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
  .stat {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 10px;
  }
  img {
    margin-top: 5px !important;
  }
  .info {
    font-size: 20px;
  }
`;

const ItemName = styled.p`
  font-size: 70px;
  margin: 0;
  font-weight: bold;
`;

const PriceInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 1.5rem;
  padding: 0;
  height: 50px;
  margin: 10px 0;
  .nft_price {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 1px;
  }
  .price {
    font-size: 40px;
    font-weight: bold;
  }
  .nft_price img {
    margin: 5px 0 0 0 !important;
  }
  .sales {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 1px;
  }
  .sales p {
    font-size: 30px;
    overflow: hidden;
  }
`;

const CTA = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
  height: 42px;
`;

export default function NFT() {
  const { slug } = usePageQuery();
  const { nftById, collectionById, loadCollectionById, loadNFTById } = useAPIContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!!slug) {
      const splitSlug = (slug as string).split(':');
      loadNFTById(splitSlug[0], parseInt(splitSlug[1]));
      loadCollectionById(splitSlug[0]);
      setIsLoading(false);
    }
  }, [slug]);

  return (
    <>
      <RootContainer>
        <ProfileContainer>
          <NavContainer>
            <Navbar />
          </NavContainer>

          <Spin spinning={isLoading}>
            <Banner background={collectionById.metadata.bannerURI}>
              <BannerCaption>{collectionById.collectionName || 'Collection Name'}</BannerCaption>
              <ProfileAvatar background={collectionById.metadata.imageURI} />
            </Banner>

            <CollectionInfoCont>
              <div className="creator">
                Created By: <div className="blue"> {nftById.metadata?.owner || 'NFT owner'}</div>{' '}
                <Image src="/icons/verification.svg" alt="" width="20px" height="20px" className="tick" />
              </div>
            </CollectionInfoCont>

            <BodyContainer>
              <LeftColumn>
                <ProfileAvatarCard>
                  <LikeButtonContainer>
                    <LikeButton src="/icons/dark-heart.png" />
                  </LikeButtonContainer>
                  <img src={nftById.metadata?.imageURI} alt="NFT Image" width={398} height={498} />
                </ProfileAvatarCard>

                <DescriptionContainer>
                  <DescriptionHeading>
                    <Image src="/icons/info.svg" alt="Info Icon" width={20} height={20} />
                    Description
                  </DescriptionHeading>
                  <DescriptionText>{nftById.metadata?.description || 'No Description Available'}</DescriptionText>
                </DescriptionContainer>
              </LeftColumn>
              <RightColumn>
                <ProfileStats>
                  <div className="stat">
                    <span className="icon">
                      <Image width={20} height={20} src="/icons/eye.svg" />
                    </span>
                    <p className="info">3.5k Views</p>
                  </div>
                  <div className="stat">
                    <span className="icon">
                      <Image width={20} height={20} src="/icons/heart.svg" />
                    </span>
                    <p className="info">1.5k Likes</p>
                  </div>
                </ProfileStats>
                <ItemName>{nftById.metadata?.name || 'NFT Name'}</ItemName>
                <CTA>
                  <Filled_CTA_Button backgroundColor="#fff" color="#5C95FF">
                    Make an offer
                  </Filled_CTA_Button>
                </CTA>
                <PriceChart />
                <Listing />
              </RightColumn>
            </BodyContainer>

            <ColoredBackground></ColoredBackground>
          </Spin>
        </ProfileContainer>
      </RootContainer>
    </>
  );
}
