import Image from 'next/image';
import { NFTUserInfo, UserNFTBanner, UserNFTInfo } from '../../styles/users.styled';

const UserBanner = ({ children }: any) => {
  return (
    <>
      <div className="user__header__banner">
        <UserNFTBanner bg="/objects/bg.png" />
        <div className="nft__wrapper">
          <UserNFTInfo>
            <div className="display__pics">
              <Image src="/nft/nft01.png" height="100px" width="100px" alt="user pics" />
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

export default UserBanner;
