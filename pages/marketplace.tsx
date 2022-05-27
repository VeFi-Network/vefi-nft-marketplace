import { Button } from 'antd';
import { FiFilter, FiPlus, FiSearch, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { CollectionWrapper, FilterWrapper, MarktePlaceWrapper, SellersWrapper } from '../styles/Market.styled';
import { Select } from 'antd';
import Card from '../components/Card';
import MainFooter from '../components/Footer';
import SellerInfo from '../components/SellerInfo';
import { useAPIContext } from '../contexts/api/index';
import { useEffect, useState } from 'react';
import _ from 'lodash';

const { Option } = Select;

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Paginator = styled.button`
  border: 1px solid #f5f5f5;
  width: 30px;
  height: 30px;
  fontsize: 10px;
  background: transparent;
  cursor: pointer;

  &:disabled {
    border: none;
  }
`;

const Market = () => {
  const { allOngoingSales, loadAllOngoingSales } = useAPIContext();
  const [salesPage, setSalesPage] = useState<number>(1);

  useEffect(() => {
    (() => {
      loadAllOngoingSales(1);
    })();
  }, []);

  useEffect(() => {
    if (salesPage) loadAllOngoingSales(salesPage);
  }, [salesPage]);

  return (
    <>
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
                  <Button className="btn">All</Button>
                </div>
                <div className="box">
                  <Select labelInValue defaultValue={{ value: 'Top selling' }}>
                    <Option value="">Select</Option>
                  </Select>
                </div>
                <div className="box">
                  <Select labelInValue defaultValue={{ value: 'Price' }}>
                    <Option value="">Price</Option>
                  </Select>
                </div>
                <div className="box input__box">
                  <div className="input__wrapper">
                    <FiSearch />
                    <input type="text" placeholder="Search artwork" />
                  </div>
                </div>
              </div>
              <div className="filter__right">
                <Button icon={<FiPlus />}>Create New Item</Button>
              </div>
            </div>
          </FilterWrapper>
          <div className="wrapper">
            <PaginationContainer>
              <CollectionWrapper>
                <div className="collection__container">
                  {_.map(allOngoingSales, sale => (
                    <div key={sale.marketId}>
                      <Card
                        name={sale.nft?.metadata?.name as string}
                        imageURI={sale.nft?.metadata?.image as string}
                        owner={sale.nft?.metadata?.owner as string}
                        linkTo={`/nfts/${sale.nft?.collectionId}:${sale.nft?.tokenId}?isSale=${true}&marketId=${
                          sale.marketId
                        }&price=${sale.price}&tradeCurrency=${sale.currency}`}
                        price={sale.price.toString()}
                      />
                    </div>
                  ))}
                </div>
              </CollectionWrapper>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  margin: '0.5em',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 14
                }}
              >
                <Paginator
                  disabled={salesPage === 1}
                  onClick={() => {
                    setSalesPage(page => page - 1);
                  }}
                  style={{ margin: 4 }}
                >
                  <FiChevronLeft style={{ color: '#f5f5f5' }} />
                </Paginator>
                <Paginator
                  onClick={() => {
                    setSalesPage(page => page + 1);
                  }}
                  style={{ margin: 4 }}
                >
                  <FiChevronRight style={{ color: '#f5f5f5' }} />
                </Paginator>
              </div>
            </PaginationContainer>
            <SellersWrapper>
              <div className="sellers__container">
                <SellerInfo imageURI="/marketplace/topSellers/1.png" name="John Doe" linkTo="/" />
                <SellerInfo imageURI="/marketplace/topSellers/2.png" name="John Doe" linkTo="/" />
                <SellerInfo imageURI="/marketplace/topSellers/3.png" name="John Doe" linkTo="/" />
                <SellerInfo imageURI="/marketplace/topSellers/4.png" name="John Doe" linkTo="/" />
                <SellerInfo imageURI="/marketplace/topSellers/5.png" name="John Doe" linkTo="/" />
                <SellerInfo imageURI="/marketplace/topSellers/6.png" name="John Doe" linkTo="/" />
              </div>
            </SellersWrapper>
            <CollectionWrapper>
              <div className="collection__container collections">
                <Card
                  name="Collection Name"
                  price="0"
                  owner="owner name"
                  imageURI="/nft/nft01.png"
                  key="1"
                  linkTo="/"
                />
                <Card
                  name="Collection Name"
                  price="0"
                  owner="owner name"
                  imageURI="/nft/nft02.png"
                  key="1"
                  linkTo="/"
                />
                <Card
                  name="Collection Name"
                  price="0"
                  owner="owner name"
                  imageURI="/nft/nft01.png"
                  key="1"
                  linkTo="/"
                />
                <Card
                  name="Collection Name"
                  price="0"
                  owner="owner name"
                  imageURI="/nft/nft03.png"
                  key="1"
                  linkTo="/"
                />
                <Card
                  name="Collection Name"
                  price="0"
                  owner="owner name"
                  imageURI="/nft/nft03.png"
                  key="1"
                  linkTo="/"
                />
              </div>
            </CollectionWrapper>
          </div>
        </div>
      </MarktePlaceWrapper>
      <MainFooter />
    </>
  );
};

export default Market;
