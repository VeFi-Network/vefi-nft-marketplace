import { Button, Spin } from 'antd';
import Link from 'next/link';
import { FaBars, FaChevronDown, FaPlus, FaExclamationTriangle } from 'react-icons/fa';
import { FiBarChart, FiGrid } from 'react-icons/fi';
import NFTCard from '../../../components/Card/NFTCard';
import FilterProperty from '../../../components/Filter';
import FIlterBy from '../../../components/Filter/FIlterBy';
import Navbar from '../../../components/Navbar';
import CollectionBanner from '../../../components/Collections/CollectionBanner';
import { usePageQuery } from '../../../hooks';
import { NFTCollectionDescription, NFTCollectionWrapper, NFTUserStats } from '../../../styles/collections.styled';
import { NFTCollection, NFTUserCollectionInfo, UsersWrapper } from '../../../styles/users.styled';
import { useAPIContext } from '../../../contexts/api/index';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import MainFooter from '../../../components/Footer';

const Collection = () => {
  const router = useRouter();
  const { id } = usePageQuery();
  const {
    collectionById,
    nftsByCollection,
    itemsInCollection,
    loadCollectionById,
    loadNFTsByCollection,
    loadNumberOfItemsInCollection
  } = useAPIContext();

  const kFormatter = (num: number): string | number => {
    return Math.abs(num) > 999
      ? Math.sign(num) * parseFloat((Math.abs(num) / 1000).toFixed(1)) + 'k'
      : Math.sign(num) * Math.abs(num);
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!!id) {
      loadCollectionById(id as string);
      loadNFTsByCollection(id as string, 1);
      loadNumberOfItemsInCollection(id as string);
      setIsLoading(false);
    }
  }, [id]);

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
            <FIlterBy>
              <div className="properties">
                <FilterProperty label="All" />
                <FilterProperty label="Top Selling" count={<FaChevronDown />} />
                <FilterProperty label="Price" count={<FaChevronDown />} />
                <FilterProperty label="Buy Now" />
                <FilterProperty label="New" />
                <FilterProperty label="Has Offers" />
                <FilterProperty label="Single Items" />
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
                <div className="sort">
                  <div className="sort__display">
                    <button>
                      <FaBars />
                    </button>
                    <button>
                      <FiGrid />
                    </button>
                  </div>
                </div>
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
              <div className="container">
                {_.map(nftsByCollection, nft => (
                  <div key={nft.tokenId}>
                    <NFTCard
                      model={nft}
                      onClick={() => {
                        router.push(`/nfts/${collectionById.collectionId}:${nft.tokenId}`);
                      }}
                      key={nft.id}
                    />
                  </div>
                ))}
              </div>
            </NFTCollection>
          </NFTUserCollectionInfo>
        </Spin>
      </UsersWrapper>
      <MainFooter />
    </>
  );
};

export default Collection;
