import React, { useEffect, useRef, useState } from 'react';
import { FaListAlt, FaRegUser, FaUserEdit } from 'react-icons/fa';
import { FiBarChart, FiGrid, FiHeart, FiEye, FiUserPlus } from 'react-icons/fi';
import _ from 'lodash';
import InfiniteScroll from '../../components/InfiniteScroll';
import Card from '../../components/Card';
import NFTCard from '../../components/Card/NFTCard';
import FilterProperty from '../../components/Filter';
import FIlterBy from '../../components/Filter/FIlterBy';
import Navbar from '../../components/Navbar';
import UserBanner from '../../components/User/Banner';
import { NFTCollection, NFTUserCollectionInfo, UsersWrapper, ButtonContainer } from '../../styles/users.styled';
import Link from 'next/link';
import Button from '../../components/Button/Ghost';
import FilledButton from '../../components/Button/CTA/Filled';
import { useAPIContext } from '../../contexts/api';
import { usePageQuery } from '../../hooks';
import { useWeb3Context } from '../../contexts/web3';
import { useRouter } from 'next/router';
import { NFTModel } from '../../api/models/nft';

const Users = () => {
  enum SelectedTab {
    COLLECTIONS = '1',
    CREATED = '2',
    WATCHLIST = '3',
    FAVORITES = '4'
  }

  enum Rendered {
    EVENTS,
    ITEMS
  }

  const {
    authenticatedUser,
    allUserCollections,
    nftsByUser,
    favoriteNFTsOfUser,
    userWatchList,
    loadAllUserCollections,
    loadNFTsByUser,
    loadFavoriteNFTsOfUser,
    loadUserWatchList
  } = useAPIContext();
  const { account } = useWeb3Context();
  const [selectedTab, setSelectedTab] = useState<SelectedTab>(SelectedTab.COLLECTIONS);
  const [renderedItem, setRenderedItem] = useState<Rendered>(Rendered.ITEMS);
  const [nftList, setNFTList] = useState<Array<NFTModel>>([]);
  const [collectionsPage, setCollectionsPage] = useState<number>(1);
  const [nftsPage, setNFTsPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const { id, tab } = usePageQuery();
  const router = useRouter();

  const scrollBase = useRef(null);
  const scrollBase2 = useRef(null);
  const infiniteScrollRoot1 = useRef(null);
  const infiniteScrollRoot2 = useRef(null);

  const switchTabs = (s: SelectedTab) => {
    if (!!id) {
      router.push(`/users/${id}?tab=${s}`, undefined, { shallow: true });
    }
  };

  useEffect(() => {
    loadAllUserCollections(id as string);
    loadNFTsByUser(id as string);
    loadFavoriteNFTsOfUser(id as string);

    if (id === account) {
      loadUserWatchList();
    }
  }, [id]);

  useEffect(() => {
    if (!!tab && (tab === '1' || tab === '2' || tab === '3' || tab === '4')) {
      setSelectedTab(tab as SelectedTab);
    }
  }, [tab]);

  useEffect(() => {
    if (tab === SelectedTab.CREATED) setNFTList(nftsByUser);
    else if (tab === SelectedTab.FAVORITES) setNFTList(favoriteNFTsOfUser);
    else if (tab === SelectedTab.WATCHLIST) setNFTList(_.map(userWatchList, list => list.nft as unknown as NFTModel));
  }, [nftsByUser, favoriteNFTsOfUser, userWatchList]);

  useEffect(() => {
    if (!!account && !!id) {
      if (selectedTab === SelectedTab.WATCHLIST && account !== id)
        router.push(`/users/${id}?tab=${SelectedTab.COLLECTIONS}`, undefined, { shallow: true });
    }
  }, [account, id]);

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
          <FIlterBy onSearchEnter={setSearchValue} placeholder="Search for item">
            <div className="properties">
              <FilterProperty
                isActive={selectedTab === SelectedTab.COLLECTIONS}
                icon={<FaListAlt />}
                count={allUserCollections.length}
                label="collections"
                onClick={() => switchTabs(SelectedTab.COLLECTIONS)}
              />
              <FilterProperty
                isActive={selectedTab === SelectedTab.CREATED}
                icon={<FiUserPlus />}
                count={nftsByUser.length}
                label="created"
                onClick={() => {
                  switchTabs(SelectedTab.CREATED);
                  setNFTList(nftsByUser);
                }}
              />
              {!!account && account === id && (
                <FilterProperty
                  isActive={selectedTab === SelectedTab.WATCHLIST}
                  icon={<FiEye />}
                  label="watchlist"
                  count={userWatchList.length}
                  onClick={() => {
                    switchTabs(SelectedTab.WATCHLIST);
                    setNFTList(_.map(userWatchList, list => list.nft as unknown as NFTModel));
                  }}
                />
              )}
              <FilterProperty
                isActive={selectedTab === SelectedTab.FAVORITES}
                icon={<FiHeart />}
                label="favorites"
                count={favoriteNFTsOfUser.length}
                onClick={() => {
                  switchTabs(SelectedTab.FAVORITES);
                  setNFTList(favoriteNFTsOfUser);
                }}
              />
            </div>
          </FIlterBy>
          <div className="sort__collection">
            <div className="sort__collection__container">
              <div
                onClick={() => {
                  setRenderedItem(Rendered.ITEMS);
                }}
                className={`sort ${renderedItem === Rendered.ITEMS ? 'active' : ''}`}
              >
                <span>
                  <FiGrid />
                </span>
                <span>Items</span>
              </div>
              <div
                onClick={() => {
                  setRenderedItem(Rendered.EVENTS);
                }}
                className={`sort ${renderedItem === Rendered.EVENTS ? 'active' : ''}`}
              >
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
                  <button className="grid_btn">
                    <FiGrid />
                  </button>
                </div>
              </div> */}
            </div>
          </div>
          <NFTCollection>
            {selectedTab === SelectedTab.COLLECTIONS ? (
              <InfiniteScroll
                root={infiniteScrollRoot1}
                className="container"
                handleScroll={() => {
                  if (allUserCollections.slice(0, collectionsPage * 24).length < allUserCollections.length) {
                    setCollectionsPage(p => p + 1);
                  }
                }}
                target={scrollBase}
              >
                {_.map(
                  allUserCollections.slice(0, collectionsPage * 24).filter(cm => {
                    if (searchValue.trim().length > 0) return cm.collectionName.includes(searchValue);
                    else return cm;
                  }),
                  collection => (
                    <div key={collection.collectionId}>
                      <Card
                        name={collection?.collectionName}
                        owner={collection?.metadata.owner}
                        imageURI={collection?.metadata.imageURI}
                        linkTo={`/collections/${collection?.collectionId}`}
                      />
                    </div>
                  )
                )}
                <div ref={scrollBase}></div>
              </InfiniteScroll>
            ) : (
              <>
                {nftList.length === 0 ? (
                  <></>
                ) : (
                  <InfiniteScroll
                    root={infiniteScrollRoot2}
                    className="container"
                    handleScroll={() => {
                      if (nftList.slice(0, nftsPage * 24).length < nftList.length) {
                        setNFTsPage(p => p + 1);
                      }
                    }}
                    target={scrollBase2}
                  >
                    {_.map(
                      nftList.slice(0, nftsPage * 24).filter(nft => {
                        if (searchValue.trim().length > 0) return nft.metadata?.name.includes(searchValue);
                        else return nft;
                      }),
                      nft => (
                        <div key={`${nft.collectionId}:${nft.tokenId}`}>
                          <NFTCard
                            model={nft}
                            onClick={() => {
                              router.push(`/nfts/${nft.collectionId}:${nft.tokenId}`);
                            }}
                            key={nft.id}
                          />
                        </div>
                      )
                    )}
                    <div ref={scrollBase2}></div>
                  </InfiniteScroll>
                )}
              </>
            )}
          </NFTCollection>
        </NFTUserCollectionInfo>
      </UsersWrapper>
    </>
  );
};

export default Users;
