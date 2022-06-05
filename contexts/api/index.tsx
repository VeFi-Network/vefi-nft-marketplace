import { arrayify } from '@ethersproject/bytes';
import { id as mHash } from '@ethersproject/hash';
import { Web3Provider } from '@ethersproject/providers';
import { keccak256 } from '@ethersproject/solidity';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type Web3 from 'web3';

import { AccountModel } from '../../api/models/account';
import { CollectionModel } from '../../api/models/collection';
import { NFTModel } from '../../api/models/nft';
import { OrderModel } from '../../api/models/order';
import { SaleModel } from '../../api/models/sale';
import {
  checkIfOnSale,
  countAllItemsByCollection,
  countItemViews,
  countSuccessfulTrades,
  fetchPriceFromPeriod,
  getAccountById,
  getAllCollections,
  getAllCollectionsByOwner,
  getAllFavorites,
  getAllNFTsByNetwork,
  getAllOngoingSales,
  getAllOrdersByNFT,
  getAuthenticatedUser,
  getCollectionById,
  getCollectionsByItems,
  getFavoriteNFTsOfUser,
  getNFTByIdAndNetwork,
  getNFTsByCollection,
  getNFTsByOwner,
  getNFTsInCollectionByPrice,
  getNFTsWithOffersInCollection,
  getTopSellingCollections,
  getTopSellingNFTsInCollection,
  getUserWatchList,
  signToken
} from '../../api/nft';
import { useWeb3Context } from '../web3/index';

export enum APIErrorPoint {
  NFT_BY_ID,
  NFTS_BY_USER,
  NFTS_BY_COLLECTION,
  NFTS_BY_NETWORK,
  TOKEN_LOAD,
  AUTH_USER,
  ALL_COLLECTIONS,
  COLLECTION_BY_ID,
  COUNT_COLLECTION_ITEMS,
  ALL_SALES,
  ITEM_ON_SALE,
  ITEM_PRICE_PER_PERIOD,
  FAVORITES,
  ALL_NFT_ORDERS,
  ALL_USER_COLLECTIONS,
  FAVORITES_OF_USER,
  USER_WATCHLIST,
  ITEM_VIEWS,
  SUCCESSFUL_TRADES_COUNT,
  ACCOUNT_BY_ID
}

type APIContextType = {
  accountById?: AccountModel;
  token: string;
  nftById: NFTModel;
  nftsByUser: Array<NFTModel>;
  nftsByCollection: Array<NFTModel>;
  nftsByNetwork: Array<NFTModel>;
  favoriteNFTsOfUser: Array<NFTModel>;
  allCollections: Array<CollectionModel>;
  allUserCollections: Array<CollectionModel>;
  topSellingCollections: Array<CollectionModel>;
  nftsInCollectionByPrice: Array<NFTModel>;
  topSellingNFTsInCollection: Array<NFTModel>;
  nftsInCollectionByOffers: Array<NFTModel>;
  collectionsByAssets: Array<CollectionModel>;
  allOngoingSales: Array<SaleModel>;
  collectionById: CollectionModel;
  itemsInCollection: number;
  isUserAuthenticated: boolean;
  authenticatedUser?: AccountModel;
  itemOnSale: boolean;
  itemViews: number;
  successfulTradesForCollection: number;
  itemPricePerPeriod: Array<{ timestamp: number; price: number }>;
  favorites: Array<any>;
  allNFTOrders: Array<OrderModel>;
  userWatchList: Array<OrderModel>;
  loadAllCollections: (page?: number) => void;
  loadTopSellingCollections: (page?: number) => void;
  loadCollectionsByAssets: (page?: number) => void;
  loadCollectionById: (id: string) => void;
  loadNFTById: (collectionId: string, id: number) => void;
  loadNFTsByUser: (accountId: string, page?: number) => void;
  loadNFTsByCollection: (collection: string, page?: number) => void;
  loadNFTsByNetwork: (page?: number) => void;
  loadNumberOfItemsInCollection: (collectionId: string) => void;
  loadAllOngoingSales: (page?: number) => void;
  loadAllUserCollections: (accountId: string, page?: number) => void;
  checkItemOnSale: (collectionId: string, tokenId: number) => void;
  loadItemPricePerPeriod: (collectionId: string, tokenId: number, fromTime?: number, toTime?: number) => void;
  loadFavorites: (collectionId: string, tokenId: number) => void;
  loadAllNFTOrders: (collectionId: string, tokenId: number) => void;
  loadNFTsInCollectionByPrice: (collectionId: string, page?: number) => void;
  loadTopSellingNFTsInCollection: (collectionId: string, page?: number) => void;
  loadNFTsInCollectionByOffers: (collectionId: string, page?: number) => void;
  loadFavoriteNFTsOfUser: (accountId: string, page?: number) => void;
  loadUserWatchList: (page?: number) => void;
  loadItemViews: (collectionId: string, tokenId: number) => void;
  loadSuccessfulTradesForCollection: (collectionId: string) => void;
  loadToken: (signature: string, messageHash: string) => void;
  loadAccountById: (accountId: string) => void;
  logout: () => void;
  error?: {
    point: APIErrorPoint;
    message: string;
  };
};

const APIContext: React.Context<APIContextType> = createContext<APIContextType>({} as APIContextType);

export const APIContextProvider = ({ children }: any) => {
  const [error, setError] = useState<{ point: APIErrorPoint; message: string }>();
  const [nftById, setNftById] = useState<NFTModel>({} as NFTModel);
  const [nftsByUser, setNFTsByUser] = useState<Array<NFTModel>>([]);
  const [nftsByCollection, setNFTsByCollection] = useState<Array<NFTModel>>([]);
  const [nftsByNetwork, setNFTsByNetwork] = useState<Array<NFTModel>>([]);
  const [allCollections, setAllCollections] = useState<Array<CollectionModel>>([]);
  const [collectionById, setCollectionById] = useState<CollectionModel>({
    metadata: { imageURI: '', bannerURI: '' }
  } as CollectionModel);
  const [itemsInCollection, setItemsInCollection] = useState<number>(0);
  const [topSellingCollections, setTopSellingCollections] = useState<Array<CollectionModel>>([]);
  const [collectionsByAssets, setCollectionsByAssets] = useState<Array<CollectionModel>>([]);
  const [allOngoingSales, setAllOngoinSales] = useState<Array<SaleModel>>([]);
  const [authenticatedUser, setAuthenticatedUser] = useState<AccountModel>();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);
  const [itemOnSale, setItemOnSale] = useState<boolean>(false);
  const [itemPricePerPeriod, setItemPricePerPeriod] = useState<Array<{ timestamp: number; price: number }>>([]);
  const [favorites, setFavorites] = useState<Array<any>>([]);
  const [allNFTOrders, setAllNFTOrders] = useState<Array<OrderModel>>([]);
  const [nftsInCollectionByPrice, setNFTsInCollectionByPrice] = useState<Array<NFTModel>>([]);
  const [topSellingNFTsInCollection, setTopSellingNFTsInCollection] = useState<Array<NFTModel>>([]);
  const [nftsInCollectionByOffers, setNFTsInCollectionByOffers] = useState<Array<NFTModel>>([]);
  const [allUserCollections, setAllUserCollections] = useState<Array<CollectionModel>>([]);
  const [favoriteNFTsOfUser, setFavoriteNFTsOfUser] = useState<Array<NFTModel>>([]);
  const [userWatchList, setUserWatchList] = useState<Array<OrderModel>>([]);
  const [itemViews, setItemViews] = useState<number>(0);
  const [successfulTradesForCollection, setSuccessfulTradesForCollection] = useState<number>(0);
  const [token, setToken] = useState<string>('');
  const [accountById, setAccountById] = useState<AccountModel>();
  const { network, account, library } = useWeb3Context();

  const clearError = () => {
    setError(undefined);
  };

  const loadToken = (signature: string, messageHash: string) => {
    clearError();
    signToken({ signature, messageHash })
      .then(res => setToken(res.token))
      .catch((error: any) => setError({ point: APIErrorPoint.TOKEN_LOAD, message: error.message }));
  };

  const loadAuthUser = () => {
    clearError();
    if (!!token || !!localStorage.getItem('VEFI_NFT_TOKEN'))
      getAuthenticatedUser(token.trim().length > 0 ? token : (localStorage.getItem('VEFI_NFT_TOKEN') as string))
        .then(setAuthenticatedUser)
        .catch((error: any) => setError({ point: APIErrorPoint.AUTH_USER, message: error.message }));
  };

  const loadNFTById = (collectionId: string, id: number) => {
    clearError();
    getNFTByIdAndNetwork(collectionId, id, network)
      .then(setNftById)
      .catch((error: any) => setError({ point: APIErrorPoint.NFT_BY_ID, message: error.message }));
  };

  const loadNFTsByUser = (accountId: string, page?: number) => {
    clearError();
    getNFTsByOwner(network, accountId, page)
      .then(setNFTsByUser)
      .catch((error: any) => setError({ point: APIErrorPoint.NFTS_BY_USER, message: error.message }));
  };

  const loadNFTsByCollection = (collection: string, page?: number) => {
    clearError();
    getNFTsByCollection(collection, network, page)
      .then(setNFTsByCollection)
      .catch((error: any) => setError({ point: APIErrorPoint.NFTS_BY_COLLECTION, message: error.message }));
  };

  const loadNFTsByNetwork = (page?: number) => {
    clearError();
    getAllNFTsByNetwork(network, page)
      .then(setNFTsByNetwork)
      .catch((error: any) => setError({ point: APIErrorPoint.NFTS_BY_NETWORK, message: error.message }));
  };

  const loadAllCollections = (page?: number) => {
    clearError();
    getAllCollections(network, page)
      .then(setAllCollections)
      .catch((error: any) => setError({ point: APIErrorPoint.ALL_COLLECTIONS, message: error.message }));
  };

  const loadTopSellingCollections = (page?: number) => {
    clearError();
    getTopSellingCollections(network, page)
      .then(setTopSellingCollections)
      .catch((error: any) => setError({ point: APIErrorPoint.ALL_COLLECTIONS, message: error.message }));
  };

  const loadCollectionsByAssets = (page?: number) => {
    clearError();
    getCollectionsByItems(network, page)
      .then(setCollectionsByAssets)
      .catch((error: any) => setError({ point: APIErrorPoint.ALL_COLLECTIONS, message: error.message }));
  };

  const loadCollectionById = (id: string) => {
    clearError();
    getCollectionById(network, id)
      .then(setCollectionById)
      .catch((error: any) => setError({ point: APIErrorPoint.COLLECTION_BY_ID, message: error.message }));
  };

  const loadNumberOfItemsInCollection = (collectionId: string) => {
    clearError();
    countAllItemsByCollection(network, collectionId)
      .then(setItemsInCollection)
      .catch((error: any) => setError({ point: APIErrorPoint.COUNT_COLLECTION_ITEMS, message: error.message }));
  };

  const loadAllOngoingSales = (page?: number) => {
    clearError();
    getAllOngoingSales(network, page)
      .then(setAllOngoinSales)
      .catch((error: any) => setError({ point: APIErrorPoint.ALL_SALES, message: error.message }));
  };

  const checkItemOnSale = (collectionId: string, tokenId: number) => {
    clearError();
    checkIfOnSale(network, collectionId, tokenId)
      .then(setItemOnSale)
      .catch((error: any) => setError({ point: APIErrorPoint.ITEM_ON_SALE, message: error.message }));
  };

  const loadItemPricePerPeriod = (collectionId: string, tokenId: number, fromTime?: number, toTime?: number) => {
    clearError();
    fetchPriceFromPeriod(network, collectionId, tokenId, fromTime, toTime)
      .then(setItemPricePerPeriod)
      .catch((error: any) => setError({ point: APIErrorPoint.ITEM_PRICE_PER_PERIOD, message: error.message }));
  };

  const loadFavorites = (collectionId: string, tokenId: number) => {
    clearError();
    getAllFavorites(network, collectionId, tokenId)
      .then(setFavorites)
      .catch((error: any) => setError({ point: APIErrorPoint.FAVORITES, message: error.message }));
  };

  const loadAllNFTOrders = (collectionId: string, tokenId: number) => {
    clearError();
    getAllOrdersByNFT(network, collectionId, tokenId)
      .then(setAllNFTOrders)
      .catch((error: any) => setError({ point: APIErrorPoint.ALL_NFT_ORDERS, message: error.message }));
  };

  const loadNFTsInCollectionByPrice = (collectionId: string, page?: number) => {
    clearError();
    getNFTsInCollectionByPrice(network, collectionId, page)
      .then(setNFTsInCollectionByPrice)
      .catch((error: any) => setError({ point: APIErrorPoint.NFTS_BY_COLLECTION, message: error.message }));
  };

  const loadTopSellingNFTsInCollection = (collectionId: string, page?: number) => {
    clearError();
    getTopSellingNFTsInCollection(network, collectionId, page)
      .then(setTopSellingNFTsInCollection)
      .catch((error: any) => setError({ point: APIErrorPoint.NFTS_BY_COLLECTION, message: error.message }));
  };

  const loadNFTsInCollectionByOffers = (collectionId: string, page?: number) => {
    clearError();
    getNFTsWithOffersInCollection(network, collectionId, page)
      .then(setNFTsInCollectionByOffers)
      .catch((error: any) => setError({ point: APIErrorPoint.NFTS_BY_COLLECTION, message: error.message }));
  };

  const loadAllUserCollections = (accountId: string, page?: number) => {
    clearError();
    getAllCollectionsByOwner(network, accountId, page)
      .then(setAllUserCollections)
      .catch((error: any) => setError({ point: APIErrorPoint.ALL_USER_COLLECTIONS, message: error.message }));
  };

  const loadFavoriteNFTsOfUser = (accountId: string, page?: number) => {
    clearError();
    getFavoriteNFTsOfUser(network, accountId, page)
      .then(setFavoriteNFTsOfUser)
      .catch((error: any) => setError({ point: APIErrorPoint.FAVORITES_OF_USER, message: error.message }));
  };

  const loadUserWatchList = (page?: number) => {
    clearError();
    getUserWatchList(network, token, page)
      .then(setUserWatchList)
      .catch((error: any) => setError({ point: APIErrorPoint.USER_WATCHLIST, message: error.message }));
  };

  const loadItemViews = (collectionId: string, tokenId: number) => {
    clearError();
    countItemViews(network, collectionId, tokenId)
      .then(setItemViews)
      .catch((error: any) => setError({ point: APIErrorPoint.ITEM_VIEWS, message: error.message }));
  };

  const loadSuccessfulTradesForCollection = (collectionId: string) => {
    clearError();
    countSuccessfulTrades(network, collectionId)
      .then(setSuccessfulTradesForCollection)
      .catch((error: any) => setError({ point: APIErrorPoint.SUCCESSFUL_TRADES_COUNT, message: error.message }));
  };

  const loadAccountById = (accountId: string) => {
    clearError();
    getAccountById(accountId)
      .then(setAccountById)
      .catch((error: any) => setError({ point: APIErrorPoint.ACCOUNT_BY_ID, message: error.message }));
  };

  const logout = () => {
    clearError();
    setAuthenticatedUser(undefined);
    localStorage.clear();
    setToken('');
  };

  useEffect(() => {
    if (!!localStorage.getItem('VEFI_NFT_TOKEN')) {
      setToken(localStorage.getItem('VEFI_NFT_TOKEN') as string);
    }
  }, []);

  useEffect(() => {
    if (!!token && token.trim().length > 0) {
      loadAuthUser();
      localStorage.setItem('VEFI_NFT_TOKEN', token);
    }
  }, [token]);

  useEffect(() => {
    if (!!account) {
      (async () => {
        const messageHash = keccak256(
          ['bytes32', 'string', 'address'],
          [mHash('load_token '.concat(account as string)), 'load_token', account]
        );
        const ethersProvider = new Web3Provider((library as Web3).givenProvider);
        const signer = ethersProvider.getSigner();
        const signature = await signer.signMessage(arrayify(messageHash));
        loadToken(signature, messageHash);
      })();
    }
  }, [account]);

  return (
    <APIContext.Provider
      value={{
        token,
        accountById,
        nftById,
        nftsByUser,
        nftsByCollection,
        nftsByNetwork,
        allCollections,
        collectionsByAssets,
        allUserCollections,
        topSellingCollections,
        topSellingNFTsInCollection,
        nftsInCollectionByOffers,
        collectionById,
        itemViews,
        loadItemViews,
        itemsInCollection,
        nftsInCollectionByPrice,
        allOngoingSales,
        favorites,
        favoriteNFTsOfUser,
        allNFTOrders,
        successfulTradesForCollection,
        userWatchList,
        loadUserWatchList,
        loadAllUserCollections,
        loadAllNFTOrders,
        loadNFTById,
        loadNFTsByUser,
        loadNFTsByCollection,
        loadTopSellingNFTsInCollection,
        loadNFTsInCollectionByOffers,
        loadNFTsByNetwork,
        loadAllCollections,
        loadCollectionsByAssets,
        loadTopSellingCollections,
        loadCollectionById,
        loadNFTsInCollectionByPrice,
        loadNumberOfItemsInCollection,
        loadAllOngoingSales,
        loadFavorites,
        loadFavoriteNFTsOfUser,
        loadSuccessfulTradesForCollection,
        loadToken,
        loadAccountById,
        checkItemOnSale,
        itemOnSale,
        itemPricePerPeriod,
        loadItemPricePerPeriod,
        logout,
        isUserAuthenticated,
        authenticatedUser,
        error
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export const useAPIContext = () => useContext(APIContext);
