import { Button, Spin } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';
import { FaBars, FaShoppingBasket, FaMoneyBill, FaDollarSign, FaPlus, FaExclamationTriangle } from 'react-icons/fa';
import { FiBarChart, FiGrid } from 'react-icons/fi';
import NFTCard from '../../../components/Card/NFTCard';
import FilterProperty from '../../../components/Filter';
import FIlterBy from '../../../components/Filter/FIlterBy';
import Navbar from '../../../components/Navbar';
import CollectionBanner from '../../../components/Collections/CollectionBanner';
import { usePageQuery } from '../../../hooks';
import { NFTCollectionDescription, NFTCollectionWrapper, NFTUserStats } from '../../../styles/collections.styled';
import { NFTCollection, NFTUserCollectionInfo, UsersWrapper } from '../../../styles/users.styled';
import { useAPIContext } from '../../../contexts/api';
import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import MainFooter from '../../../components/Footer';
import InfiniteScroll from '../../../components/InfiniteScroll';
import { NFTModel } from '../../../api/models/nft';

const NoItemContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  background: linear-gradient(254.33deg, rgba(255, 255, 255, 0.1) 1.71%, rgba(255, 255, 255, 0.05) 99.35%);
  backdrop-filter: blur(16.86px);
  padding: 50px 0;
  border-radius: 20px;
  margin-top: 50px;
`;

const Collection = () => {
  enum CollectionFilter {
    ALL,
    BY_PRICE,
    TOP_SELLING,
    HAS_OFFERS
  }

  const router = useRouter();
  const { id } = usePageQuery();
  const {
    collectionById,
    nftsByCollection,
    nftsInCollectionByPrice,
    nftsInCollectionByOffers,
    topSellingNFTsInCollection,
    itemsInCollection,
    loadCollectionById,
    loadNFTsByCollection,
    loadNumberOfItemsInCollection,
    loadNFTsInCollectionByPrice,
    loadTopSellingNFTsInCollection,
    loadNFTsInCollectionByOffers
  } = useAPIContext();

  const kFormatter = (num: number): string | number => {
    return Math.abs(num) > 999
      ? Math.sign(num) * parseFloat((Math.abs(num) / 1000).toFixed(1)) + 'k'
      : Math.sign(num) * Math.abs(num);
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<CollectionFilter>(CollectionFilter.ALL);
  const [list, setList] = useState<Array<NFTModel>>([]);
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');

  const scrollBase = useRef(null);
  const infiniteScrollRoot = useRef(null);

  useEffect(() => {
    if (!!id) {
      loadCollectionById(id as string);
      loadNFTsByCollection(id as string);
      loadNumberOfItemsInCollection(id as string);
      loadNFTsInCollectionByPrice(id as string);
      loadNFTsInCollectionByOffers(id as string);
      loadTopSellingNFTsInCollection(id as string);
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!!nftsByCollection) setList(nftsByCollection);
  }, [nftsByCollection]);

  return (
    <>
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
                  <Link href="/">
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
                  <h1>{kFormatter(collectionById.floorPrice || 0)}</h1>
                </div>
                <div className="label">Floor Price</div>
              </div>
              <div className="stat">
                <div className="count">
                  <h1>20.5</h1>
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
                <div className="sort active">
                  <span>
                    <FiGrid />
                  </span>
                  <span>Items</span>
                </div>
                <div className="sort">
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
                          key={nft.id}
                        />
                      </div>
                    )
                  )}
                  <div ref={scrollBase}></div>
                </InfiniteScroll>
              )}
            </NFTCollection>
          </NFTUserCollectionInfo>
        </Spin>
      </UsersWrapper>
      <MainFooter />
    </>
  );
};

export default Collection;
