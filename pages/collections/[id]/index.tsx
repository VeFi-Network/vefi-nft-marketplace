import { Button, Spin } from 'antd';
import Link from 'next/link';
import { FaBars, FaChevronDown, FaPlus } from 'react-icons/fa';
import { FiBarChart, FiGrid } from 'react-icons/fi';
import NFTCard from '../../../components/Card/NftCard';
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

const Collection = () => {
  const router = useRouter();
  const { id } = usePageQuery();
  const { collectionById, nftsByCollection, loadCollectionById, loadNFTsByCollection } = useAPIContext();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!!id) {
      loadCollectionById(id as string);
      loadNFTsByCollection(id as string, 1);
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
                  <h1>10</h1>
                </div>
                <div className="label">Items</div>
              </div>
              <div className="stat">
                <div className="count">
                  <h1>20</h1>
                </div>
                <div className="label">Item</div>
              </div>
              <div className="stat">
                <div className="count">
                  <h1>2.0</h1>
                </div>
                <div className="label">Floor Price</div>
              </div>
              <div className="stat">
                <div className="count">
                  <h1>20.5</h1>
                </div>
                <div className="label">Volumn traided</div>
              </div>
            </div>
          </NFTUserStats>
          <NFTCollectionDescription>
            <div className="container">
              <p>{collectionById.metadata.description || 'No Description Available'}</p>
            </div>
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
                <Button icon={<FaPlus />}>Create New Item</Button>
              </div>
            </div>
            <NFTCollection>
              <div className="container">
                {_.map(nftsByCollection, nft => (
                  <NFTCard
                    model={nft}
                    onClick={() => {
                      router.push(`/nfts/${collectionById.collectionId}:${nft.id}`);
                    }}
                    key={nft.id}
                  />
                ))}
              </div>
            </NFTCollection>
          </NFTUserCollectionInfo>
        </Spin>
      </UsersWrapper>
    </>
  );
};

export default Collection;
