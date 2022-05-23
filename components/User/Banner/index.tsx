import { UserNFTBanner, UserNFTInfo, NFTUserInfo } from '../../../styles/users.styled';
import Avatar from '../Avatar';

type Props = {
    bannerSrcUrl?: string;
    children?: any;
    avatarSrcUrl?: string;
    avatarWidth?: string;
    avatarHeight?: string;
}

const UserBanner = ({ bannerSrcUrl, children, avatarSrcUrl, avatarWidth, avatarHeight }: Props) => {
    return (
        <>
            <div className="user__header__banner">
                <UserNFTBanner bg={bannerSrcUrl} />
                <div className="nft__wrapper">
                    <UserNFTInfo>
                        <div className="display__pics">
                            <Avatar avatarSrcUrl={avatarSrcUrl} width={avatarWidth} height={avatarHeight} />
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
}


export default UserBanner;