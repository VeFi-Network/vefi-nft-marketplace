import Image from 'next/image';
import React from 'react';
import { FaBars, FaFilter, FaHandHoldingUsd, FaRegEyeSlash, FaSearch } from 'react-icons/fa';
import { FiBarChart, FiChevronDown, FiEyeOff, FiGrid, FiHeart, FiList, FiRotateCcw, FiTag } from 'react-icons/fi';
import FilterProperty from '../../components/FilterProperty';
import Navbar from '../../components/Navbar';
import UserBanner from '../../components/Profile/UserBanner';
import { NFTArt, NFTCollection, NFTUserCollectionInfo, UsersWrapper } from '../../styles/users.styled';

const Users = () => {
  return (
    <>
      <UsersWrapper>
        <Navbar />
        <UserBanner>
          <div className="user__info">
            <div className="username">
              <h2>
                Unnamed <span></span>
              </h2>
            </div>
            <div className="join__date">
              <p>Joined September 2022</p>
            </div>
          </div>
        </UserBanner>
        <NFTUserCollectionInfo>
          <div className="filter__collection">
            <div className="heading">
              <span>
                <FaFilter />
              </span>
              <span>
                <h3>Filter By</h3>
              </span>
            </div>
            <div className="collection">
              <div className="properties">
                <FilterProperty icon={<FaHandHoldingUsd />} count="20" label="Collected" />
                <FilterProperty icon={<FaRegEyeSlash />} count="20" label="created" />
                <FilterProperty icon={<FiEyeOff />} label="hidden" count={0} />
                <FilterProperty icon={<FiList />} label="offers" count={0} />
                <FilterProperty icon={<FiHeart />} label="favorited" count={1} />
                <FilterProperty icon={<FiRotateCcw />} label="activity" count={1} />
                <FilterProperty icon={<FiTag />} label="listing" count={<FiChevronDown />} />
              </div>
              <div className="search">
                <div className="search__box">
                  <FaSearch />
                  <input type="text" placeholder="Search for artwork" />
                </div>
              </div>
            </div>
          </div>
          <div className="sort__collection">
            <div className="sort__collection__container">
              <div className="sort active">
                <span>
                  <FiGrid />
                </span>
                <span>Single Items</span>
              </div>
              <div className="sort">
                <span>
                  <FiBarChart />
                </span>
                <span>Recently received</span>
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
          </div>
          <NFTCollection>
            <div className="container">
              <NFTArt>
                <div className="nft__image">
                  <Image src="/nft/nft01.png" width={200} height={200} alt="nft user" />
                </div>
                <div className="nft__footer">
                  <div className="nft__prev__users">
                    <span>
                      <Image src="/nft/nft01.png" width={30} height={30} alt="nft user" />
                    </span>
                    <span>
                      <Image src="/nft/nft01.png" width={30} height={30} alt="nft user" />
                    </span>
                    <span>
                      <Image src="/nft/nft01.png" width={30} height={30} alt="nft user" />
                    </span>
                  </div>
                  <div className="nft__footer__info__left">
                    <div className="title">
                      <h2>Lost in Space</h2>
                      <p>wereywanle</p>
                    </div>
                  </div>
                  <div className="nft__footer__info__right">
                    <div className="price">
                      <div className="icon"></div>
                      <div className="price__value">2eth</div>
                    </div>
                    <div className="purchase__btn">
                      <button>Purchase</button>
                    </div>
                  </div>
                </div>
              </NFTArt>
            </div>
          </NFTCollection>
        </NFTUserCollectionInfo>
      </UsersWrapper>
    </>
  );
};

export default Users;
