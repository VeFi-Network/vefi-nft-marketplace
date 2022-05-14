import React from 'react';
import { FaBars, FaHandHoldingUsd, FaRegEyeSlash, FaSearch } from 'react-icons/fa';
import { FiBarChart, FiChevronDown, FiEyeOff, FiGrid, FiHeart, FiList, FiRotateCcw, FiTag } from 'react-icons/fi';
import NFTCard from '../../components/Card/NftCard';
import FilterProperty from '../../components/Filter';
import FIlterBy from '../../components/Filter/FIlterBy';
import Navbar from '../../components/Navbar';
import UserBanner from '../../components/Profile/UserBanner';
import { NFTCollection, NFTUserCollectionInfo, UsersWrapper } from '../../styles/users.styled';

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
          <FIlterBy>
            <div className="properties">
              <FilterProperty icon={<FaHandHoldingUsd />} count="20" label="Collected" />
              <FilterProperty icon={<FaRegEyeSlash />} count="20" label="created" />
              <FilterProperty icon={<FiEyeOff />} label="hidden" count={0} />
              <FilterProperty icon={<FiList />} label="offers" count={0} />
              <FilterProperty icon={<FiHeart />} label="favorited" count={1} />
              <FilterProperty icon={<FiRotateCcw />} label="activity" count={1} />
              <FilterProperty icon={<FiTag />} label="listing" count={<FiChevronDown />} />
            </div>
          </FIlterBy>
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
              <NFTCard />
            </div>
          </NFTCollection>
        </NFTUserCollectionInfo>
      </UsersWrapper>
    </>
  );
};

export default Users;
