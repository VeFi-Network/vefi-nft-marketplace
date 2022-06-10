import { Button } from 'antd';
import _ from 'lodash';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';

import { CollectionCategory } from '../../api/models/collection';
import Card from '../../components/Card';
import MainFooter from '../../components/Footer';
import InfiniteScroll from '../../components/InfiniteScroll';
import Navbar from '../../components/Navbar';
import { useAPIContext } from '../../contexts/api';
import { useWeb3Context } from '../../contexts/web3';
import { usePageQuery } from '../../hooks';
import { CollectionWrapper, FilterWrapper, MarktePlaceWrapper } from '../../styles/Market.styled';

const ListCollections = () => {
  const { allCollections, loadAllCollections } = useAPIContext();
  const [categoryFilter, setCategoryFilter] = useState<CollectionCategory | 'ALL'>('ALL');
  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');

  const router = useRouter();
  const { category } = usePageQuery();
  const { network } = useWeb3Context();

  const scrollBase = useRef(null);
  const scrollRoot = useRef(null);

  useEffect(() => {
    if (
      !!category &&
      ['ALL'].concat(Object.values(CollectionCategory)).includes(category as 'ALL' | CollectionCategory)
    ) {
      setCategoryFilter(category as 'ALL' | CollectionCategory);
    } else {
      setCategoryFilter('ALL');
    }
  }, [category]);

  useEffect(() => {
    if (!!network) {
      loadAllCollections();
    }
  }, [network]);

  return (
    <>
      <Head>
        <title>View {categoryFilter} collections</title>
      </Head>
      <MarktePlaceWrapper>
        <div className="marketplace__container">
          <Navbar />
        </div>
        <div className="container">
          <div className="exploreNft">
            <Image src="/icons/exploreNFT.png" width={50} height={500} alt="exploreNFT" />
          </div>
          <FilterWrapper>
            <div className="filter__heading">
              <FiFilter />
              Filter By
            </div>
            <div className="filter__body">
              <div className="filter__left">
                <div className="box">
                  <Button
                    onClick={() => router.push('/collections?category=ALL', undefined, { shallow: true })}
                    className={`btn ${categoryFilter === 'ALL' ? 'active' : ''}`}
                  >
                    All
                  </Button>
                </div>
                {_.map(Object.values(CollectionCategory).sort(), category => (
                  <div className="box" key={category}>
                    <Button
                      onClick={() => router.push(`/collections?category=${category}`)}
                      className={`btn ${categoryFilter === category ? 'active' : ''}`}
                    >
                      {category
                        .split('')
                        .map((character, index) => (index === 0 ? character : character.toLowerCase()))
                        .join('')
                        .split(' ')
                        .map(character => character.replace(character.charAt(0), character.charAt(0).toUpperCase()))
                        .join(' ')}
                    </Button>
                  </div>
                ))}
                {/* <div className="box">
                  <Select labelInValue defaultValue={{ value: 'Price' }}>
                    <Option value="">Price</Option>
                  </Select>
                </div> */}
                <div className="box input__box">
                  <div className="input__wrapper">
                    <FiSearch />
                    <input
                      type="text"
                      value={searchValue}
                      onChange={e => setSearchValue(e.target.value)}
                      placeholder="Search collection"
                    />
                  </div>
                </div>
              </div>
            </div>
          </FilterWrapper>
          <div className="wrapper">
            <CollectionWrapper>
              <InfiniteScroll
                target={scrollBase}
                root={scrollRoot}
                handleScroll={() => {
                  if (allCollections.slice(0, page * 24).length < allCollections.length) {
                    setPage(p => p + 1);
                  }
                }}
                className="collection__container collections"
              >
                {_.map(
                  allCollections
                    .filter(collection => {
                      if (categoryFilter !== 'ALL') return collection.collectionCategory === categoryFilter;
                      else return collection;
                    })
                    .slice(0, page * 24)
                    .filter(collection => {
                      if (searchValue.trim().length > 0) return collection.collectionName.includes(searchValue);
                      else return collection;
                    }),
                  collection => (
                    <div key={collection.collectionId}>
                      <Card
                        name={collection.collectionName}
                        owner={collection.collectionOwner}
                        imageURI={collection.metadata.imageURI}
                        linkTo={`/collections/${collection.collectionId}`}
                        price={collection.floorPrice?.toString()}
                      />
                    </div>
                  )
                )}
                <div ref={scrollBase}></div>
              </InfiniteScroll>
            </CollectionWrapper>
          </div>
        </div>
      </MarktePlaceWrapper>
      <MainFooter />
    </>
  );
};

export default ListCollections;
