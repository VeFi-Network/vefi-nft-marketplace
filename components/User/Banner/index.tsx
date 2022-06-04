import { NFTUserInfo, UserNFTBanner, UserNFTInfo } from '../../../styles/users.styled';
import Avatar from '../Avatar';

type Props = {
  bannerUrl?: string;
  children?: any;
  avatarUrl?: string;
  avatarWidth?: string;
  avatarHeight?: string;
};

const UserBanner = ({ bannerUrl, children, avatarUrl, avatarWidth, avatarHeight }: Props) => {
  return (
    <>
      <div className="user__header__banner">
        <UserNFTBanner bg={bannerUrl} />
        <div className="nft__wrapper">
          <UserNFTInfo>
            <div className="display__pics">
              <Avatar avatarSrcUrl={avatarUrl} width={avatarWidth} height={avatarHeight} />
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
