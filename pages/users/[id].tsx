import { hexStripZeros, hexZeroPad } from '@ethersproject/bytes';
import { AddressZero } from '@ethersproject/constants';
import { id as hashId } from '@ethersproject/hash';
import { message, Table } from 'antd';
import { formatEthAddress } from 'eth-address';
import _ from 'lodash';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { FaExchangeAlt, FaListAlt, FaQuestion, FaRegUser, FaUserEdit } from 'react-icons/fa';
import { FiBarChart, FiEye, FiGrid, FiHeart, FiThumbsUp, FiUserPlus } from 'react-icons/fi';
import styled from 'styled-components';

import { NFTModel } from '../../api/models/nft';
import request from '../../api/rpc';
import { addresses } from '../../assets';
import FilledButton from '../../components/Button/CTA/Filled';
import Button from '../../components/Button/Ghost';
import Card from '../../components/Card';
import NFTCard from '../../components/Card/NFTCard';
import FilterProperty from '../../components/Filter';
import FIlterBy from '../../components/Filter/FIlterBy';
import MainFooter from '../../components/Footer';
import InfiniteScroll from '../../components/InfiniteScroll';
import Navbar from '../../components/Navbar';
import UserBanner from '../../components/User/Banner';
import { useAPIContext } from '../../contexts/api';
import { useWeb3Context } from '../../contexts/web3';
import { usePageQuery } from '../../hooks';
import { ButtonContainer, NFTCollection, NFTUserCollectionInfo, UsersWrapper } from '../../styles/users.styled';

// We'll leverage this in the population of events table
const eventHashMap = {
  Transfer: hashId('Transfer(address,address,uint256)'),
  ApprovalForAll: hashId('ApprovalForAll(address,address,bool)')
};

const NoItemContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: calc(100% - 150px);

  background: linear-gradient(254.33deg, rgba(255, 255, 255, 0.1) 1.71%, rgba(255, 255, 255, 0.05) 99.35%);
  backdrop-filter: blur(16.86px);
  padding: 50px 0;
  border-radius: 20px;
  margin-top: 50px;

  @media screen and (max-width: 760px) {
    width: 100%;

    span {
      font-size: 1.4rem !important;
    }
  }
  @media screen and (max-width: 320px) {
    span {
      font-size: 1rem !important;
    }
  }
`;

const Users = () => {
  enum SelectedTab {
    COLLECTIONS = '1',
    OWNED = '2',
    WATCHLIST = '3',
    FAVORITES = '4'
  }

  enum Rendered {
    EVENTS,
    ITEMS
  }

  const {
    authenticatedUser,
    allUserCollections,
    nftsByUser,
    favoriteNFTsOfUser,
    userWatchList,
    loadAllUserCollections,
    loadNFTsByUser,
    loadFavoriteNFTsOfUser,
    loadUserWatchList,
    accountById,
    loadAccountById
  } = useAPIContext();
  const { account, network, chainId, explorerUrl } = useWeb3Context();
  const [selectedTab, setSelectedTab] = useState<SelectedTab>(SelectedTab.COLLECTIONS);
  const [renderedItem, setRenderedItem] = useState<Rendered>(Rendered.ITEMS);
  const [nftList, setNFTList] = useState<Array<NFTModel>>([]);
  const [collectionsPage, setCollectionsPage] = useState<number>(1);
  const [nftsPage, setNFTsPage] = useState<number>(1);
  const [eventLogs, setEventLogs] = useState<Array<any>>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const { id, tab } = usePageQuery();
  const router = useRouter();

  const scrollBase = useRef(null);
  const scrollBase2 = useRef(null);
  const infiniteScrollRoot1 = useRef(null);
  const infiniteScrollRoot2 = useRef(null);

  const kFormatter = (num: number): string | number => {
    return Math.abs(num) > 999
      ? Math.sign(num) * parseFloat((Math.abs(num) / 1000).toFixed(1)) + 'k'
      : Math.sign(num) * Math.abs(num);
  };

  const switchTabs = (s: SelectedTab) => {
    if (!!id) {
      router.push(`/users/${id}?tab=${s}`, undefined, { shallow: true });
    }
  };

  const allAccountRelevantEvents = async () => {
    try {
      const logs = await request(network, {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_getLogs',
        params: [
          {
            topics: [null, hexZeroPad(id as string, 32)],
            fromBlock: '0x0',
            toBlock: 'latest',
            address: addresses[chainId as number]
          }
        ]
      });
      setEventLogs(logs);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      if (!!id && !!network) {
        loadAllUserCollections(id as string);
        loadNFTsByUser(id as string);
        loadFavoriteNFTsOfUser(id as string);
        loadAccountById(id as string);
        await allAccountRelevantEvents();

        if (id === account) {
          loadUserWatchList();
        }
      }
    })();
  }, [id, network]);

  useEffect(() => {
    if (!!tab && (tab === '1' || tab === '2' || tab === '3' || tab === '4')) {
      setSelectedTab(tab as SelectedTab);
    }
  }, [tab]);

  useEffect(() => {
    if (tab === SelectedTab.OWNED) setNFTList(nftsByUser);
    else if (tab === SelectedTab.FAVORITES) setNFTList(favoriteNFTsOfUser);
    else if (tab === SelectedTab.WATCHLIST) setNFTList(_.map(userWatchList, list => list.nft as unknown as NFTModel));
  }, [nftsByUser, favoriteNFTsOfUser, userWatchList]);

  useEffect(() => {
    if (!!account && !!id) {
      if (selectedTab === SelectedTab.WATCHLIST && account !== id)
        router.push(`/users/${id}?tab=${SelectedTab.COLLECTIONS}`, undefined, { shallow: true });
    }
  }, [account, id]);

  return (
    <>
      <Head>
        <title>{id === account ? 'Your' : accountById?.name ? accountById.name + "'s" : id + "'s"} profile</title>
      </Head>
      <UsersWrapper>
        <Navbar />
        <UserBanner
          bannerUrl={accountById?.metadata?.bannerURI || ''}
          avatarUrl={accountById?.metadata?.imageURI || ''}
        >
          <div className="user__info">
            <div className="username">
              <h2>
                {accountById?.name || 'Unnamed'} <span></span>
              </h2>
            </div>
            <div className="join__date">
              <p>Joined {accountById?.createdAt as string}</p>
            </div>
          </div>
          <ButtonContainer>
            {(!authenticatedUser || !authenticatedUser.email) && authenticatedUser?.accountId === id && (
              <Link href="/users/profile/create" passHref>
                <Button>
                  <FaRegUser />
                  Create Profile
                </Button>
              </Link>
            )}
            {!!authenticatedUser && !!authenticatedUser.email && authenticatedUser.accountId === id && (
              <Link href="/users/profile/update" passHref>
                <FilledButton>
                  <FaUserEdit />
                  Update Profile
                </FilledButton>
              </Link>
            )}
          </ButtonContainer>
        </UserBanner>

        <NFTUserCollectionInfo>
          <FIlterBy onSearchEnter={setSearchValue} placeholder="Search for item">
            <div className="properties">
              <FilterProperty
                isActive={selectedTab === SelectedTab.COLLECTIONS}
                icon={<FaListAlt />}
                count={kFormatter(allUserCollections.length)}
                label="collections"
                onClick={() => switchTabs(SelectedTab.COLLECTIONS)}
              />
              <FilterProperty
                isActive={selectedTab === SelectedTab.OWNED}
                icon={<FiUserPlus />}
                count={kFormatter(nftsByUser.length)}
                label="owned"
                onClick={() => {
                  switchTabs(SelectedTab.OWNED);
                  setNFTList(nftsByUser);
                }}
              />
              {!!account && account === id && (
                <FilterProperty
                  isActive={selectedTab === SelectedTab.WATCHLIST}
                  icon={<FiEye />}
                  label="watchlist"
                  count={kFormatter(userWatchList.length)}
                  onClick={() => {
                    switchTabs(SelectedTab.WATCHLIST);
                    setNFTList(_.map(userWatchList, list => list.nft as unknown as NFTModel));
                  }}
                />
              )}
              <FilterProperty
                isActive={selectedTab === SelectedTab.FAVORITES}
                icon={<FiHeart />}
                label="favorites"
                count={kFormatter(favoriteNFTsOfUser.length)}
                onClick={() => {
                  switchTabs(SelectedTab.FAVORITES);
                  setNFTList(favoriteNFTsOfUser);
                }}
              />
            </div>
          </FIlterBy>
          <div className="sort__collection">
            <div className="sort__collection__container">
              <div
                onClick={() => {
                  setRenderedItem(Rendered.ITEMS);
                }}
                className={`sort ${renderedItem === Rendered.ITEMS ? 'active' : ''}`}
              >
                <span>
                  <FiGrid />
                </span>
                <span>Items</span>
              </div>
              <div
                onClick={() => {
                  setRenderedItem(Rendered.EVENTS);
                }}
                className={`sort ${renderedItem === Rendered.EVENTS ? 'active' : ''}`}
              >
                <span>
                  <FiBarChart />
                </span>
                <span>Events</span>
              </div>
              {/* <div className="sort">
                <div className="sort__display">
                  <button>
                    <FaBars />
                  </button>
                  <button className="grid_btn">
                    <FiGrid />
                  </button>
                </div>
              </div> */}
            </div>
          </div>
          {renderedItem === Rendered.ITEMS ? (
            <NFTCollection>
              {selectedTab === SelectedTab.COLLECTIONS ? (
                <>
                  {allUserCollections.length === 0 ? (
                    <NoItemContainer>
                      <span style={{ color: '#f5f5f5', fontSize: 30, fontFamily: 'Rubik' }}>No Item To Display</span>
                    </NoItemContainer>
                  ) : (
                    <InfiniteScroll
                      root={infiniteScrollRoot1}
                      className="container"
                      handleScroll={() => {
                        if (allUserCollections.slice(0, collectionsPage * 24).length < allUserCollections.length) {
                          setCollectionsPage(p => p + 1);
                        }
                      }}
                      target={scrollBase}
                    >
                      {_.map(
                        allUserCollections.slice(0, collectionsPage * 24).filter(cm => {
                          if (searchValue.trim().length > 0) return cm.collectionName.includes(searchValue);
                          else return cm;
                        }),
                        collection => (
                          <div key={collection.collectionId}>
                            <Card
                              name={collection?.collectionName}
                              owner={collection?.metadata.owner}
                              imageURI={collection?.metadata.imageURI}
                              linkTo={`/collections/${collection?.collectionId}`}
                              price={collection.floorPrice?.toPrecision(4)}
                            />
                          </div>
                        )
                      )}
                      <div ref={scrollBase}></div>
                    </InfiniteScroll>
                  )}
                </>
              ) : (
                <>
                  {nftList.length === 0 ? (
                    <NoItemContainer>
                      <span style={{ color: '#f5f5f5', fontSize: 30, fontFamily: 'Rubik' }}>No Item To Display</span>
                    </NoItemContainer>
                  ) : (
                    <InfiniteScroll
                      root={infiniteScrollRoot2}
                      className="container"
                      handleScroll={() => {
                        if (nftList.slice(0, nftsPage * 24).length < nftList.length) {
                          setNFTsPage(p => p + 1);
                        }
                      }}
                      target={scrollBase2}
                    >
                      {_.map(
                        nftList.slice(0, nftsPage * 24).filter(nft => {
                          if (searchValue.trim().length > 0) return nft.metadata?.name.includes(searchValue);
                          else return nft;
                        }),
                        nft => (
                          <div key={`${nft.collectionId}:${nft.tokenId}`}>
                            <NFTCard
                              model={nft}
                              onClick={() => {
                                router.push(`/nfts/${nft.collectionId}:${nft.tokenId}`);
                              }}
                            />
                          </div>
                        )
                      )}
                      <div ref={scrollBase2}></div>
                    </InfiniteScroll>
                  )}
                </>
              )}
            </NFTCollection>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <Table
                  className="table-listing"
                  dataSource={eventLogs.map((val, index) => ({
                    ...val,
                    key: index
                  }))}
                  columns={[
                    {
                      title: 'Event',
                      dataIndex: 'topics',
                      key: 'topics',
                      render: value => {
                        const text =
                          value[0] === eventHashMap.ApprovalForAll
                            ? 'ApprovalForAll'
                            : value[0] === eventHashMap.Transfer
                            ? 'Transfer'
                            : 'Unknown Event';
                        const icon =
                          value[0] === eventHashMap.ApprovalForAll ? (
                            <FiThumbsUp />
                          ) : value[0] === eventHashMap.Transfer ? (
                            <FaExchangeAlt />
                          ) : (
                            <FaQuestion />
                          );
                        return (
                          <span style={{ fontSize: 17, fontFamily: 'Rubik', color: '#f5f5f5' }}>
                            {icon} {text}
                          </span>
                        );
                      }
                    },
                    {
                      title: 'From',
                      dataIndex: 'topics',
                      key: 'topics',
                      render: value => (
                        <a
                          href={explorerUrl.concat(
                            'address/' + `${hexStripZeros(value[1]) === '0x' ? AddressZero : hexStripZeros(value[1])}`
                          )}
                          style={{ textDecoration: 'none' }}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span style={{ fontSize: 17, fontFamily: 'Rubik', color: '#6495ed' }}>
                            {hexStripZeros(value[1]) === '0x'
                              ? 'NullAddress'
                              : formatEthAddress(hexStripZeros(value[1]), 5)}
                          </span>
                        </a>
                      )
                    },
                    {
                      title: 'For',
                      dataIndex: 'topics',
                      key: 'topics',
                      render: value => (
                        <span style={{ fontSize: 17, fontFamily: 'Rubik', color: '#f5f5f5' }}>
                          {value[0] === eventHashMap.Transfer ? parseInt(hexStripZeros(value[3])) : ''}
                        </span>
                      )
                    },
                    {
                      title: 'Tx',
                      dataIndex: 'transactionHash',
                      key: 'transactionHash',
                      render: value => (
                        <a
                          href={explorerUrl.concat('tx/' + value)}
                          style={{ textDecoration: 'none' }}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span style={{ fontSize: 17, fontFamily: 'Rubik', color: '#6495ed' }}>{value}</span>
                        </a>
                      )
                    }
                  ]}
                  scroll={{ y: 240 }}
                  size="middle"
                  pagination={false}
                  title={() => (
                    <h4 style={{ fontWeight: 'bold', color: '#fff' }}>Events for {accountById?.accountId}</h4>
                  )}
                />
              </div>
            </>
          )}
        </NFTUserCollectionInfo>
      </UsersWrapper>
      <MainFooter />
    </>
  );
};

export default Users;
