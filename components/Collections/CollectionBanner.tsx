import { NFTUserInfo, UserNFTBanner, UserNFTInfo } from '../../styles/users.styled';

const CollectionBanner = ({ children, bannerSrc, imageSrc }: any) => {
  return (
    <>
      <div className="user__header__banner">
        <UserNFTBanner bg={bannerSrc} />
        <div className="nft__wrapper">
          <UserNFTInfo>
            <div className="display__pics">
              <img src={imageSrc} height="100px" width="100px" alt="image" />
            </div>
            {children}
          </UserNFTInfo>
        </div>
      </div>
      <NFTUserInfo>
        <div></div>
        <div></div>
      </NFTUserInfo>
    </>
  );
};

export default CollectionBanner;
