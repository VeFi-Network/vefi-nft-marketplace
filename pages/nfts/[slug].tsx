import Navbar from '../../components/Navbar';
import styled from 'styled-components';
import Image from 'next/image';
import Filled_CTA_Button from '../../components/Button/CTA/Filled';
import Listing from '../../components/ListingTable/index';
import PriceChart from '../../components/PriceChart/index';

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
  background-size: no-repeat;
  background-height: 100%;
  background-image: url('/objects/solarSystem.png');
  display: flex;
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
  background: url('/nft/nft03.png') no-repeat;
  background-size: 100%;
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

const CollectionName = styled.p`
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

export default function NFTs() {
  return (
    <>
      <RootContainer>
        <ProfileContainer>
          <NavContainer>
            <Navbar />
          </NavContainer>

          <Banner>
            <BannerCaption>Lost in Space</BannerCaption>
            <ProfileAvatar />
          </Banner>

          <CollectionInfoCont>
            <div className="creator">
              Created By: <div className="blue"> Wereywanle</div>{' '}
              <Image src="/icons/verification.svg" alt="" width="20px" height="20px" className="tick" />
            </div>
          </CollectionInfoCont>

          <BodyContainer>
            <LeftColumn>
              <ProfileAvatarCard>
                <LikeButtonContainer>
                  <LikeButton src="/icons/dark-heart.png" />
                </LikeButtonContainer>
                <Image src="/nft/nft03.png" width={398} height={498} />
              </ProfileAvatarCard>

              <DescriptionContainer>
                <DescriptionHeading>
                  <Image src="/icons/info.svg" alt="Info Icon" width={20} height={20} />
                  Description
                </DescriptionHeading>
                <DescriptionText>
                  Lost in space in collaboration with The MetaArt Club launches an NFT collection inspired by the theme
                  of 'Every Body'—exploring the relationship between avatars and bodies in the metaverse Lost in space
                  depicts letting go of doubts, negativity and unrealistic expectations to bring about inner peace.
                  According to Owo, his futuristic female subject, “Understands the power she possesses when she is at
                  peace with her body and she’s thriving in her world – where acceptance, peace, and beauty dominate.”
                </DescriptionText>
              </DescriptionContainer>
            </LeftColumn>
            <RightColumn>
              <ProfileStats>
                <div className="stat">
                  <span className="icon">
                    <Image width={20} height={20} src="/icons/people.svg" />
                  </span>
                  <p className="info">20 Owners</p>
                </div>
                <div className="stat">
                  <span className="icon">
                    <Image width={20} height={20} src="/icons/apps.svg" />
                  </span>
                  <p className="info">50 Total</p>
                </div>
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
              <CollectionName>Lost In Space</CollectionName>
              <PriceInfo>
                <div className="nft_price">
                  <span>
                    <Image width={50} height={50} src="/icons/eth_classic.svg" />
                  </span>
                  <p className="price">2eth</p>
                </div>
                <div className="sales">
                  <span>
                    <Image width={35} height={35} src="/icons/timer.svg" />
                  </span>
                  <p>Sale ends October, 3rd 2022</p>
                </div>
              </PriceInfo>
              <CTA>
                <Filled_CTA_Button>Buy Now</Filled_CTA_Button>
                <Filled_CTA_Button backgroundColor="#fff" color="#5C95FF">
                  Make an offer
                </Filled_CTA_Button>
              </CTA>
              <PriceChart />
              <Listing />
            </RightColumn>
          </BodyContainer>

          <ColoredBackground></ColoredBackground>
        </ProfileContainer>
      </RootContainer>
    </>
  );
}
