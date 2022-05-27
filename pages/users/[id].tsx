import React from 'react';
import { FaBars, FaRegUser, FaUserEdit } from 'react-icons/fa';
import {
  FiBarChart,
  FiGrid,
  FiHeart,
  FiList,
  FiUserPlus
} from 'react-icons/fi';
import NFTCard from '../../components/Card/NFTCard';
import FilterProperty from '../../components/Filter';
import FIlterBy from '../../components/Filter/FIlterBy';
import Navbar from '../../components/Navbar';
import UserBanner from '../../components/User/Banner';
import { NFTCollection, NFTUserCollectionInfo, UsersWrapper, ButtonContainer } from '../../styles/users.styled';
import Link from 'next/link';
import Button from '../../components/Button/Ghost';
import FilledButton from '../../components/Button/CTA/Filled';
import { useAPIContext } from '../../contexts/api/index';

const Users = () => {
  const { authenticatedUser } = useAPIContext();
  return (
    <>
      <UsersWrapper>
        <Navbar />
        <UserBanner
          bannerUrl={authenticatedUser?.metadata?.bannerURI || ''}
          avatarUrl={authenticatedUser?.metadata?.imageURI || ''}
        >
          <div className="user__info">
            <div className="username">
              <h2>
                {authenticatedUser?.name || 'Unnamed'} <span></span>
              </h2>
            </div>
            <div className="join__date">
              <p>Joined {authenticatedUser?.createdAt as string}</p>
            </div>
          </div>
          <ButtonContainer>
            {(!authenticatedUser || !authenticatedUser.email) && (
              <Link href="/users/profile/create">
                <Button>
                  <FaRegUser />
                  Create Profile
                </Button>
              </Link>
            )}
            {!!authenticatedUser && !!authenticatedUser.email && (
              <Link href="/users/profile/update">
                <FilledButton>
                  <FaUserEdit />
                  Update Profile
                </FilledButton>
              </Link>
            )}
          </ButtonContainer>
        </UserBanner>

        <NFTUserCollectionInfo>
          <FIlterBy>
            <div className="properties">
              <FilterProperty icon={<FiUserPlus />} count="20" label="created" />
              <FilterProperty icon={<FiList />} label="watchlist" count={0} />
              <FilterProperty icon={<FiHeart />} label="favorites" count={1} />
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
                  <button className="grid_btn">
                    <FiGrid />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <NFTCollection>
            <div className="container">{/* <Card /> */}</div>
          </NFTCollection>
        </NFTUserCollectionInfo>
      </UsersWrapper>
    </>
  );
};

export default Users;
