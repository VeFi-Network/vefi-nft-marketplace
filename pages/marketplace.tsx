import { Button } from 'antd';
import { FiFilter, FiPlus, FiSearch } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import { CollectionWrapper, FilterWrapper, MarktePlaceWrapper, SellersWrapper } from '../styles/Market.styled';
import { Select } from 'antd';
import Card from '../components/Card';

import MainFooter from '../components/Footer';
import SellerInfo from '../components/SellerInfo';
import Image from 'next/image';
const { Option } = Select;

const Market = () => {
  return (
    <>
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
            <CollectionWrapper>
              <div className="collection__container">
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
