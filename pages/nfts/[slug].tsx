import { Interface } from '@ethersproject/abi';
import { AddressZero } from '@ethersproject/constants';
import { parseEther, parseUnits } from '@ethersproject/units';
import { message, Spin, Tag } from 'antd';
import _ from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { FiEye, FiHeart, FiInfo, FiLink, FiTag } from 'react-icons/fi';
import styled from 'styled-components';
import type Web3 from 'web3';

import { addToFavorites, removeFromFavorites, viewItem } from '../../api/nft';
import request from '../../api/rpc';
import { addresses, CONSTANTS } from '../../assets';
import deployableCollectionAbi from '../../assets/abis/DeployableCollection.json';
import erc20Abi from '../../assets/abis/ERC20.json';
import marketPlaceAbi from '../../assets/abis/Marketplace.json';
import Filled_CTA_Button from '../../components/Button/CTA/Filled';
import MainFooter from '../../components/Footer';
import Listing from '../../components/ListingTable';
import Navbar from '../../components/Navbar';
import OfferPopup from '../../components/Popup/OfferPopup';
import SellPopup from '../../components/Popup/SellPopup';
import PriceChart from '../../components/PriceChart';
import { Periods } from '../../components/PriceChart/period';
import { useAPIContext } from '../../contexts/api';
import { useWeb3Context } from '../../contexts/web3';
import { usePageQuery } from '../../hooks/query';

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
      word-break: break-all;
    }
    @media screen and (max-width: 760px) {
      flex-direction: column;
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
  font-size: 30px;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 60px;
  z-index: 5;
  left: 5%;
  border-radius: 12px;
  :hover {
    cursor: pointer;
  }
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
  .ant-tag {
    margin-bottom: 5px;
    background: #383838;
    color: #ccc !important;
    padding: 2px 7px;
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

const ParentContainer = styled.div``;

export default function NFT() {
  const { slug, liked, marketId, price, tradeCurrency } = usePageQuery();
  const { account, network, library, chainId, explorerUrl } = useWeb3Context();
  const {
    nftById,
    collectionById,
    loadCollectionById,
    loadNFTById,
    itemOnSale,
    checkItemOnSale,
    itemPricePerPeriod,
    loadItemPricePerPeriod,
    favorites,
    loadFavorites,
    allNFTOrders,
    loadAllNFTOrders,
    itemViews,
    loadItemViews,
    token
  } = useAPIContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sellModal, setSellModal] = useState(false);
  const [offerModal, setOfferModal] = useState(false);
  const [transition, setTransition] = useState(false);
  const [period, setPeriod] = useState<Periods>(Periods.ONE_HOUR);
  const [tip, setTip] = useState<string>('');

  const router = useRouter();

  const kFormatter = (num: number): string | number => {
    return Math.abs(num) > 999
      ? Math.sign(num) * parseFloat((Math.abs(num) / 1000).toFixed(1)) + 'k'
      : Math.sign(num) * Math.abs(num);
  };

  const addToFavesOrRemoveFromFaves = async () => {
    try {
      const splitSlug = (slug as string).split(':');

      if (!favorites.map(f => f.accountId).includes(account as string) && !Boolean(liked)) {
        await addToFavorites(network, splitSlug[0], parseInt(splitSlug[1]), token);
        router.push(`/nfts/${slug}?liked=${true}`, undefined, { shallow: true });
      } else {
        await removeFromFavorites(network, splitSlug[0], parseInt(splitSlug[1]), token);
        router.push(`/nfts/${slug}?liked=${false}`, undefined, { shallow: true });
      }
    } catch (error: any) {
      message.error(error.response?.data?.error || error.message);
    }
  };

  const buy = async () => {
    try {
      if (!!tradeCurrency && !!price && !!marketId) {
        setIsLoading(true);
        let amount: ReturnType<typeof parseEther | typeof parseUnits>;

        setTip('Parsing amount');
        if (tradeCurrency !== AddressZero) {
          const erc20AbiInterface = new Interface(erc20Abi);
          const functionHash = erc20AbiInterface.getSighash('decimals()');
          const decimalResponse = await request(network, {
            method: 'eth_call',
            id: 1,
            params: [{ to: tradeCurrency as string, data: functionHash }, 'latest'],
            jsonrpc: '2.0'
          });
          amount = parseUnits(price as string, decimalResponse);

          const erc20Contract = new (library as Web3).eth.Contract(erc20Abi as any, tradeCurrency as string);

          setTip('Requesting approval');

          await erc20Contract.methods.approve(addresses[chainId as number], amount.toHexString()).send({
            from: account
          });
        } else {
          amount = parseEther(price as string);
        }

        const marketPlaceContract = new (library as Web3).eth.Contract(
          marketPlaceAbi as any,
          addresses[chainId as number]
        );

        setTip('Now purchasing item');

        const purchaseResponse = await marketPlaceContract.methods
          .buyItem(marketId, tradeCurrency !== AddressZero ? amount : 0)
          .send({
            from: account,
            value: tradeCurrency === AddressZero ? amount : undefined
          });

        message
          .success(
            <>
              <span style={{ fontSize: 15 }}>Item successfully purchased!</span>{' '}
              <a
                style={{ fontSize: 15, textDecoration: 'none', color: '#6d00c1' }}
                href={explorerUrl.concat('tx/' + purchaseResponse.transactionHash)}
                target="_blank"
                rel="noreferrer"
              >
                View on explorer!
              </a>
            </>,
            2
          )
          .then(() => {
            router.push(`/collections/${(slug as string).split(':')[0]}`);
          });
      }
    } catch (error: any) {
      setIsLoading(false);
      message.error(error.message);
    }
  };

  const acceptOffer = async (orderId: string) => {
    try {
      setIsLoading(true);
      setTip('Proceeding to accept offer for item: ' + nftById.tokenId);
      setTip('Requesting approval');
      const erc721 = new (library as Web3).eth.Contract(deployableCollectionAbi as any, nftById.collectionId);

      await erc721.methods.setApprovalForAll(addresses[chainId as number], true).send({ from: account });

      setTip('Approved!');
      const marketPlaceContract = new (library as Web3).eth.Contract(
        marketPlaceAbi as any,
        addresses[chainId as number]
      );

      setTip('Now accepting offer');
      const acceptanceResponse = await marketPlaceContract.methods.acceptOffer(orderId).send({ from: account });

      setIsLoading(false);
      setTip('');
      message
        .success(
          <>
            <span style={{ fontSize: 15 }}>Offer accepted!</span>{' '}
            <a
              style={{ fontSize: 15, textDecoration: 'none', color: '#6d00c1' }}
              href={explorerUrl.concat('tx/' + acceptanceResponse.transactionHash)}
              target="_blank"
              rel="noreferrer"
            >
              View on explorer!
            </a>
          </>,
          2
        )
        .then(() => {
          router.push(`/collections/${(slug as string).split(':')[0]}`);
        });
    } catch (error: any) {
      setIsLoading(false);
      message.error(error.message);
    }
  };

  const rejectOffer = async (orderId: string) => {
    try {
      setIsLoading(true);
      setTip('Proceeding to reject offer for item: ' + nftById.tokenId);
      const marketPlaceContract = new (library as Web3).eth.Contract(
        marketPlaceAbi as any,
        addresses[chainId as number]
      );

      setTip('Now rejecting offer');
      const rejectionResponse = await marketPlaceContract.methods.rejectOffer(orderId).send({ from: account });

      setIsLoading(false);
      setTip('');
      message
        .success(
          <>
            <span style={{ fontSize: 15 }}>Offer rejected!</span>{' '}
            <a
              style={{ fontSize: 15, textDecoration: 'none', color: '#6d00c1' }}
              href={explorerUrl.concat('tx/' + rejectionResponse.transactionHash)}
              target="_blank"
              rel="noreferrer"
            >
              View on explorer!
            </a>
          </>,
          2
        )
        .then(() => {
          router.push(`/collections/${(slug as string).split(':')[0]}`);
        });
    } catch (error: any) {
      setIsLoading(false);
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (!!slug) {
      const splitSlug = (slug as string).split(':');
      loadNFTById(splitSlug[0], parseInt(splitSlug[1]));
      loadCollectionById(splitSlug[0]);
      checkItemOnSale(splitSlug[0], parseInt(splitSlug[1]));
      loadFavorites(splitSlug[0], parseInt(splitSlug[1]));
      loadAllNFTOrders(splitSlug[0], parseInt(splitSlug[1]));
      loadItemViews(splitSlug[0], parseInt(splitSlug[1]));

      if (token) {
        viewItem(network, splitSlug[0], parseInt(splitSlug[1]), token).then(() => console.log('Item viewed'));
      }

      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (collectionById && nftById) {
      let timestamp: number;

      if (period === Periods.ONE_HOUR) {
        timestamp = Date.now() - 60 * 60 * 1000;
      } else if (period === Periods.TWO_DAYS) {
        timestamp = Date.now() - 60 * 60 * 24 * 2 * 1000;
      } else if (period === Periods.SEVEN_DAYS) {
        timestamp = Date.now() - 60 * 60 * 24 * 7 * 1000;
      } else {
        timestamp = Date.now() - 60 * 60 * 24 * 30 * 1000;
      }

      loadItemPricePerPeriod(collectionById.collectionId, nftById.tokenId, timestamp, Date.now());
    }
  }, [collectionById, nftById, period]);

  const handleBackgroundClick = () => {
    if (offerModal) {
      setTransition(false);
      setTimeout(() => setOfferModal(false), 500);
    }
    if (sellModal) {
      setTransition(false);
      setTimeout(() => setSellModal(false), 500);
    }
  };

  return (
    <ParentContainer>
      <RootContainer onClick={handleBackgroundClick} open={transition}>
        <ProfileContainer>
          <NavContainer>
            <Navbar />
          </NavContainer>

          <Spin spinning={isLoading} tip={tip}>
            {/* <Banner background={collectionById.metadata.bannerURI}>
              <BannerCaption>{collectionById.collectionName || 'Collection Name'}</BannerCaption>
              <ProfileAvatar background={collectionById.metadata.imageURI} />
            </Banner> */}

            <CollectionInfoCont>
              <div className="creator">
                Owner: <div className="blue"> {nftById?.owner || 'NFT owner'}</div>{' '}
                <Image src="/icons/verification.svg" alt="" width="20px" height="20px" className="tick" />
              </div>
            </CollectionInfoCont>

            <BodyContainer>
              <LeftColumn>
                <ProfileAvatarCard>
                  <LikeButtonContainer onClick={addToFavesOrRemoveFromFaves}>
                    <FaHeart
                      color={
                        favorites.map(f => f.accountId).includes(account as string) || !!Boolean(liked as string)
                          ? '#db7093'
                          : undefined
                      }
                    />
                  </LikeButtonContainer>
                  <img src={nftById.metadata?.image} alt="NFT Image" width={398} height={598} />
                </ProfileAvatarCard>

                <DescriptionContainer>
                  <DescriptionHeading>
                    <FiInfo />
                    Description
                  </DescriptionHeading>
                  <DescriptionText>{nftById.metadata?.description || 'No Description Available'}</DescriptionText>
                  {!!nftById.metadata?.externalLink && nftById.metadata?.externalLink?.trim().length > 0 && (
                    <>
                      <DescriptionHeading>
                        <FiLink />
                        External Link
                      </DescriptionHeading>
                      <p>
                        <a
                          style={{ textDecoration: 'none', fontSize: 14, color: '#f5f5f5' }}
                          href={nftById.metadata.externalLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {nftById.metadata.externalLink}
                        </a>
                      </p>
                    </>
                  )}
                  {!!nftById.metadata?.traits && (
                    <>
                      <DescriptionHeading>
                        <FiTag />
                        Traits
                      </DescriptionHeading>
                      <p>
                        {_.map(nftById.metadata.traits, trait => (
                          <Tag closable={false} color="purple" key={trait}>
                            {trait}
                          </Tag>
                        ))}
                      </p>
                    </>
                  )}
                </DescriptionContainer>
              </LeftColumn>
              <RightColumn>
                <ProfileStats>
                  <div className="stat">
                    <span>
                      <FiEye />
                    </span>
                    <span>{kFormatter(itemViews)} Views</span>
                  </div>
                  <div className="stat">
                    <span>
                      <FiHeart />
                    </span>
                    <span>{kFormatter(favorites.length)} Likes</span>
                  </div>
                </ProfileStats>
                <ItemName>{nftById.metadata?.name || 'NFT Name'}</ItemName>
                <div className="button__wrapper">
                  <CTA>
                    {/* <Filled_CTA_Button backgroundColor="#5C95FF" color="#fff">
                      Buy Now
                    </Filled_CTA_Button> */}
                    {!!account && account !== nftById.owner && !itemOnSale && (
                      <Filled_CTA_Button
                        disabled={itemOnSale}
                        onClick={(e: any) => {
                          e.stopPropagation();
                          setOfferModal(!offerModal);
                          setTimeout(() => setTransition(true), 10);
                        }}
                        backgroundColor="#fff"
                        color="#5C95FF"
                      >
                        Make an offer
                      </Filled_CTA_Button>
                    )}
                    {!!account && account === nftById.owner && (
                      <Filled_CTA_Button
                        disabled={itemOnSale}
                        style={{
                          background: itemOnSale ? 'grey' : undefined
                        }}
                        onClick={(e: any) => {
                          e.stopPropagation();
                          setSellModal(!sellModal);
                          setTimeout(() => setTransition(true), 10);
                        }}
                      >
                        Sell
                      </Filled_CTA_Button>
                    )}
                    {!!account && account !== nftById.owner && !!marketId && itemOnSale && (
                      <Filled_CTA_Button
                        style={{ background: !itemOnSale ? 'grey' : undefined }}
                        disabled={!itemOnSale}
                        onClick={buy}
                      >
                        Buy
                      </Filled_CTA_Button>
                    )}
                  </CTA>
                </div>
                <PriceChart
                  onChange={setPeriod}
                  timestamps={itemPricePerPeriod.map(i => i.timestamp * 1000)}
                  prices={itemPricePerPeriod.map(i => i.price)}
                />
                <Listing
                  datasource={allNFTOrders}
                  acceptanceButtonEnabled={!!account && account === nftById.owner}
                  rejectionButtonEnabled={!!account && account === nftById.owner}
                  onAcceptClick={acceptOffer}
                  onRejectClick={rejectOffer}
                />
              </RightColumn>
            </BodyContainer>

            {/* <ColoredBackground></ColoredBackground> */}
          </Spin>
        </ProfileContainer>

        <MainFooter />
      </RootContainer>
      <SellPopup transition={transition} nft={nftById} modal={sellModal} setModal={setSellModal} />
      <OfferPopup
        fp={collectionById.floorPrice || 0}
        transition={transition}
        nft={nftById}
        modal={offerModal}
        setModal={setOfferModal}
      />
    </ParentContainer>
  );
}
