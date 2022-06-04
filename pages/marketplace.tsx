import { Button } from 'antd';
import _ from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { FiArrowDown, FiArrowUp, FiFilter, FiList, FiPlus, FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

import Card from '../components/Card';
import MainFooter from '../components/Footer';
import InfiniteScroll from '../components/InfiniteScroll';
import Navbar from '../components/Navbar';
import { useAPIContext } from '../contexts/api/index';
import { useWeb3Context } from '../contexts/web3';
import { CollectionWrapper, FilterWrapper, MarktePlaceWrapper } from '../styles/Market.styled';

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

const Market = () => {
  enum ListFilter {
    ALL,
    TOP_SELLING,
    LOWEST_PRICE
  }

  const { allOngoingSales, loadAllOngoingSales } = useAPIContext();
  const { network } = useWeb3Context();
  const [salesPage, setSalesPage] = useState<number>(1);
  const [listFilter, setFilter] = useState<ListFilter>(ListFilter.ALL);
  const [searchValue, setSearchValue] = useState<string>('');

  const scrollBase = useRef(null);
  const scrollRoot = useRef(null);

  const router = useRouter();

  useEffect(() => {
    (() => {
      if (!!network) {
        loadAllOngoingSales();
      }
    })();
  }, [network]);

  return (
    <>
      <Head>
        <title>Marketplace</title>
      </Head>
      <MarktePlaceWrapper>
        <div className="marketplace__container">
          <Navbar />
        </div>
        <div className="container">
          {/* <div className="exploreNft">
            <Image src="/icons/exploreNFT.png" width={50} height={500} alt="exploreNFT" />
          </div> */}
          <FilterWrapper>
            <div className="filter__heading">
              <FiFilter />
              Filter By
            </div>
            <div className="filter__body">
              <div className="filter__left">
                <div className="box">
                  <Button
                    onClick={() => {
                      setFilter(ListFilter.ALL);
                    }}
                    className={`btn ${listFilter === ListFilter.ALL ? 'active' : ''}`}
                  >
                    <FiList /> All
                  </Button>
                </div>
                <div className="box">
                  <Button
                    onClick={() => {
                      setFilter(ListFilter.TOP_SELLING);
                    }}
                    className={`btn ${listFilter === ListFilter.TOP_SELLING ? 'active' : ''}`}
                  >
                    <FiArrowUp /> Top Selling
                  </Button>
                </div>
                <div className="box">
                  <Button
                    onClick={() => {
                      setFilter(ListFilter.LOWEST_PRICE);
                    }}
                    className={`btn ${listFilter === ListFilter.LOWEST_PRICE ? 'active' : ''}`}
                  >
                    <FiArrowDown /> Lowest Price
                  </Button>
                </div>
                <div className="box input__box">
                  <div className="input__wrapper">
                    <FiSearch />
                    <input
                      value={searchValue}
                      onChange={e => setSearchValue(e.target.value)}
                      type="text"
                      placeholder="Search artwork"
                    />
                  </div>
                </div>
              </div>
              <div className="filter__right">
                <Button onClick={() => router.replace(`/collections/item/new`)} icon={<FiPlus />}>
                  Create New Collection
                </Button>
              </div>
            </div>
          </FilterWrapper>
          <div className="wrapper">
            <CollectionWrapper>
              {allOngoingSales.length === 0 ? (
                <NoItemContainer>
                  <span style={{ color: '#f5f5f5', fontSize: 30, fontFamily: 'Rubik' }}>No Item To Display</span>
                </NoItemContainer>
              ) : (
                <InfiniteScroll
                  root={scrollRoot}
                  className="collection__container collections"
                  target={scrollBase}
                  handleScroll={() => {
                    if (allOngoingSales.slice(0, salesPage * 24).length < allOngoingSales.length) {
                      setSalesPage(p => p + 1);
                    }
                  }}
                >
                  {_.map(
                    allOngoingSales
                      .slice(0, salesPage * 24)
                      .sort((saleA, saleB) => {
                        if (listFilter === ListFilter.LOWEST_PRICE) return saleA.price - saleB.price;
                        else if (listFilter === ListFilter.TOP_SELLING) return saleB.price - saleA.price;
                        else return 0;
                      })
                      .filter(sale => {
                        if (searchValue.trim().length > 0) return sale.nft?.metadata?.name.includes(searchValue);
                        else return sale;
                      }),
                    sale => (
                      <div key={sale.marketId}>
                        <Card
                          name={sale.nft?.metadata?.name as string}
                          imageURI={sale.nft?.metadata?.image as string}
                          owner={sale.nft?.owner as string}
                          linkTo={`/nfts/${sale.nft?.collectionId}:${sale.nft?.tokenId}?marketId=${sale.marketId}&price=${sale.price}&tradeCurrency=${sale.currency}`}
                          price={sale.price.toString()}
                        />
                      </div>
                    )
                  )}
                  <div ref={scrollBase}></div>
                </InfiniteScroll>
              )}
            </CollectionWrapper>
          </div>
        </div>
      </MarktePlaceWrapper>
      <MainFooter />
    </>
  );
};

export default Market;
