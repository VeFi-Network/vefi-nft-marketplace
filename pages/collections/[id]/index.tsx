import { hexStripZeros } from '@ethersproject/bytes';
import { AddressZero } from '@ethersproject/constants';
import { id as hashId } from '@ethersproject/hash';
import { Button, message, Spin, Table } from 'antd';
import { formatEthAddress } from 'eth-address';
import _ from 'lodash';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import {
  FaBars,
  FaDollarSign,
  FaExchangeAlt,
  FaExclamationTriangle,
  FaMoneyBill,
  FaPlus,
  FaQuestion,
  FaShoppingBasket
} from 'react-icons/fa';
import { FiBarChart, FiGrid, FiThumbsUp } from 'react-icons/fi';
import styled from 'styled-components';

import { NFTModel } from '../../../api/models/nft';
import request from '../../../api/rpc';
import NFTCard from '../../../components/Card/NFTCard';
import CollectionBanner from '../../../components/Collections/CollectionBanner';
import FilterProperty from '../../../components/Filter';
import FIlterBy from '../../../components/Filter/FIlterBy';
import MainFooter from '../../../components/Footer';
import InfiniteScroll from '../../../components/InfiniteScroll';
import Navbar from '../../../components/Navbar';
import { useAPIContext } from '../../../contexts/api';
import { useWeb3Context } from '../../../contexts/web3';
import { usePageQuery } from '../../../hooks';
import { NFTCollectionDescription, NFTCollectionWrapper, NFTUserStats } from '../../../styles/collections.styled';
import { NFTCollection, NFTUserCollectionInfo, UsersWrapper } from '../../../styles/users.styled';

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

const Collection = () => {
  enum CollectionFilter {
    ALL,
    BY_PRICE,
    TOP_SELLING,
    HAS_OFFERS
  }

  enum SelectedTab {
    ITEMS,
    EVENTS
  }

  const router = useRouter();
  const { id } = usePageQuery();
  const {
    collectionById,
    nftsByCollection,
    nftsInCollectionByPrice,
    nftsInCollectionByOffers,
    topSellingNFTsInCollection,
    successfulTradesForCollection,
    itemsInCollection,
    loadCollectionById,
    loadNFTsByCollection,
    loadNumberOfItemsInCollection,
    loadNFTsInCollectionByPrice,
    loadTopSellingNFTsInCollection,
    loadNFTsInCollectionByOffers,
    loadSuccessfulTradesForCollection
  } = useAPIContext();
  const { network, explorerUrl, networkSymbol } = useWeb3Context();

  const kFormatter = (num: number): string | number => {
    return Math.abs(num) > 999
      ? Math.sign(num) * parseFloat((Math.abs(num) / 1000).toFixed(1)) + 'k'
      : Math.sign(num) * Math.abs(num);
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<CollectionFilter>(CollectionFilter.ALL);
  const [selectedTab, setSelectedTab] = useState<SelectedTab>(SelectedTab.ITEMS);
  const [list, setList] = useState<Array<NFTModel>>([]);
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [eventLogs, setEventLogs] = useState<Array<any>>([]);

  const scrollBase = useRef(null);
  const infiniteScrollRoot = useRef(null);

  const allCollectionRelevantEvents = async () => {
    try {
      const logs = await request(network, {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_getLogs',
        params: [
          {
            topics: [],
            fromBlock: '0x0',
            toBlock: 'latest',
            address: id
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
      if (!!id) {
        loadCollectionById(id as string);
        loadNFTsByCollection(id as string);
        loadNumberOfItemsInCollection(id as string);
        loadNFTsInCollectionByPrice(id as string);
        loadNFTsInCollectionByOffers(id as string);
        loadTopSellingNFTsInCollection(id as string);
        loadSuccessfulTradesForCollection(id as string);
        await allCollectionRelevantEvents();
        setIsLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (!!nftsByCollection) setList(nftsByCollection);
  }, [nftsByCollection]);

  return (
    <>
      <Head>
        <title>View {collectionById.collectionName} on Vefi NFT marketplace</title>
      </Head>
      <UsersWrapper>
        <Navbar />
        <Spin spinning={isLoading}>
          <CollectionBanner imageSrc={collectionById.metadata.imageURI} bannerSrc={collectionById.metadata.bannerURI}>
            <NFTCollectionWrapper>
              <div className="username">
                <h2>{collectionById.collectionName}</h2>
              </div>
              <div className="user__info">
                <p>
                  Created By:{' '}
                  <Link href={`/users/${collectionById.collectionOwner}`}>
                    <a>{collectionById.metadata.owner}</a>
                  </Link>
                </p>
              </div>
            </NFTCollectionWrapper>
          </CollectionBanner>
          <NFTUserStats>
            <div className="user__nft__statistics">
              <div className="stat">
                <div className="count">
                  <h1>{kFormatter(itemsInCollection)}</h1>
                </div>
                <div className="label">Items</div>
              </div>
              <div className="stat">
                <div className="count">
                  <h1>
                    {kFormatter(parseFloat(collectionById.floorPrice?.toPrecision(4) || '0'))} {networkSymbol}
                  </h1>
                </div>
                <div className="label">Floor Price</div>
              </div>
              <div className="stat">
                <div className="count">
                  <h1>{kFormatter(successfulTradesForCollection)}</h1>
                </div>
                <div className="label">Successful Sales</div>
              </div>
            </div>
          </NFTUserStats>
          <NFTCollectionDescription>
            <div className="container">
              <p>{collectionById.metadata.description || 'No Description Available'}</p>
            </div>
            {collectionById.metadata.hasExplicitContent && (
              <div className="container">
                <FaExclamationTriangle style={{ color: 'red' }} />{' '}
                <span style={{ fontSize: 15, color: 'red', marginLeft: 5 }}>Explicit Content!</span>
              </div>
            )}
          </NFTCollectionDescription>
          <NFTUserCollectionInfo>
            <FIlterBy onSearchEnter={setSearchValue}>
              <div className="properties">
                <FilterProperty
                  onClick={() => {
                    setFilter(CollectionFilter.ALL);
                    setList(nftsByCollection);
                  }}
                  isActive={filter === CollectionFilter.ALL}
                  label="All"
                  count={<FaBars />}
                />
                <FilterProperty
                  onClick={() => {
                    setFilter(CollectionFilter.TOP_SELLING);
                    setList(topSellingNFTsInCollection);
                  }}
                  isActive={filter === CollectionFilter.TOP_SELLING}
                  label="Top Selling"
                  count={<FaShoppingBasket />}
                />
                <FilterProperty
                  onClick={() => {
                    setFilter(CollectionFilter.BY_PRICE);
                    setList(nftsInCollectionByPrice);
                  }}
                  isActive={filter === CollectionFilter.BY_PRICE}
                  label="Price"
                  count={<FaDollarSign />}
                />
                <FilterProperty
                  onClick={() => {
                    setFilter(CollectionFilter.HAS_OFFERS);
                    setList(nftsInCollectionByOffers);
                  }}
                  isActive={filter === CollectionFilter.HAS_OFFERS}
                  label="Has Offers"
                  count={<FaMoneyBill />}
                />
              </div>
            </FIlterBy>
            <div className="sort__collection">
              <div className="sort__collection__container">
                <div
                  className={`sort ${selectedTab === SelectedTab.ITEMS ? 'active' : ''}`}
                  onClick={() => setSelectedTab(SelectedTab.ITEMS)}
                >
                  <span>
                    <FiGrid />
                  </span>
                  <span>Items</span>
                </div>
                <div
                  className={`sort ${selectedTab === SelectedTab.EVENTS ? 'active' : ''}`}
                  onClick={() => setSelectedTab(SelectedTab.EVENTS)}
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
                    <button>
                      <FiGrid />
                    </button>
                  </div>
                </div> */}
              </div>
              <div className="create__collection__btn">
                <Button
                  onClick={() => {
                    router.push(`/collections/${id}/nft/new`);
                  }}
                  icon={<FaPlus />}
                >
                  Create New Item
                </Button>
              </div>
            </div>
            {selectedTab === SelectedTab.ITEMS ? (
              <NFTCollection style={{ marginTop: '-50px' }}>
                {list.length === 0 ? (
                  <NoItemContainer>
                    <span style={{ color: '#f5f5f5', fontSize: 30, fontFamily: 'Rubik' }}>No Item To Display</span>
                  </NoItemContainer>
                ) : (
                  <InfiniteScroll
                    className="container"
                    target={scrollBase}
                    root={infiniteScrollRoot}
                    handleScroll={() => {
                      if (list.slice(0, page * 24).length < list.length) {
                        setPage(p => p + 1);
                      }
                    }}
                  >
                    {_.map(
                      list.slice(0, page * 24).filter(nft => {
                        if (searchValue.trim().length > 0) return nft.metadata?.name.includes(searchValue);
                        else return nft;
                      }),
                      nft => (
                        <div key={nft.tokenId}>
                          <NFTCard
                            model={nft}
                            onClick={() => {
                              router.push(`/nfts/${collectionById.collectionId}:${nft.tokenId}`);
                            }}
                          />
                        </div>
                      )
                    )}
                    <div ref={scrollBase}></div>
                  </InfiniteScroll>
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
                        title: 'To',
                        dataIndex: 'topics',
                        key: 'topics',
                        render: value => (
                          <a
                            href={explorerUrl.concat(
                              'address/' + `${hexStripZeros(value[2]) === '0x' ? AddressZero : hexStripZeros(value[2])}`
                            )}
                            style={{ textDecoration: 'none' }}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span style={{ fontSize: 17, fontFamily: 'Rubik', color: '#6495ed' }}>
                              {hexStripZeros(value[2]) === '0x'
                                ? 'NullAddress'
                                : formatEthAddress(hexStripZeros(value[2]), 5)}
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
                      <h4 style={{ fontWeight: 'bold', color: '#fff' }}>Events for {collectionById.collectionName}</h4>
                    )}
                  />
                </div>
              </>
            )}
          </NFTUserCollectionInfo>
        </Spin>
      </UsersWrapper>
      <MainFooter />
    </>
  );
};

export default Collection;
