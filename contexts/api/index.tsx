import React, { createContext, useState, useContext, useEffect } from 'react';
import { AccountModel } from '../../api/models/account';
import { NFTModel } from '../../api/models/nft';
import {
  getNFTsByOwner,
  getNFTsByCollection,
  getAllNFTsByNetwork,
  signToken,
  getAuthenticatedUser,
  getCollectionById,
  getCollectionsByItems,
  getAllCollections,
  getNFTByIdAndNetwork,
  countAllItemsByCollection,
  getTopSellingCollections,
  getAllOngoingSales,
  checkIfOnSale,
  fetchPriceFromPeriod,
  getAllFavorites,
  getAllOrdersByNFT
} from '../../api/nft';
import { useWeb3Context } from '../web3/index';
import { CollectionModel } from '../../api/models/collection';
import { SaleModel } from '../../api/models/sale';
import { OrderModel } from '../../api/models/order';

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
  ALL_NFT_ORDERS
}

type APIContextType = {
  token: string;
  nftById: NFTModel;
  nftsByUser: Array<NFTModel>;
  nftsByCollection: Array<NFTModel>;
  nftsByNetwork: Array<NFTModel>;
  allCollections: Array<CollectionModel>;
  topSellingCollections: Array<CollectionModel>;
  collectionsByAssets: Array<CollectionModel>;
  allOngoingSales: Array<SaleModel>;
  collectionById: CollectionModel;
  itemsInCollection: number;
  isUserAuthenticated: boolean;
  authenticatedUser?: AccountModel;
  itemOnSale: boolean;
  itemPricePerPeriod: Array<{ timestamp: number; price: number }>;
  favorites: Array<any>;
  allNFTOrders: Array<OrderModel>;
  loadAllCollections: (page?: number) => void;
  loadTopSellingCollections: (page?: number) => void;
  loadCollectionsByAssets: (page?: number) => void;
  loadCollectionById: (id: string) => void;
  loadNFTById: (collectionId: string, id: number) => void;
  loadNFTsByUser: (page?: number) => void;
  loadNFTsByCollection: (collection: string, page?: number) => void;
  loadNFTsByNetwork: (page?: number) => void;
  loadNumberOfItemsInCollection: (collectionId: string) => void;
  loadAllOngoingSales: (page?: number) => void;
  checkItemOnSale: (collectionId: string, tokenId: number) => void;
  loadItemPricePerPeriod: (collectionId: string, tokenId: number, fromTime?: number, toTime?: number) => void;
  loadFavorites: (collectionId: string, tokenId: number) => void;
  loadAllNFTOrders: (collectionId: string, tokenId: number) => void;
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
  const [token, setToken] = useState<string>('');
  const { network, account, active } = useWeb3Context();

  const clearError = () => {
    setError(undefined);
  };

  const loadToken = (accountId: string) => {
    clearError();
    signToken({ accountId })
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

  const loadNFTsByUser = (page: number = 1) => {
    clearError();
    getNFTsByOwner(token, network, page)
      .then(setNFTsByUser)
      .catch((error: any) => setError({ point: APIErrorPoint.NFTS_BY_USER, message: error.message }));
  };

  const loadNFTsByCollection = (collection: string, page: number = 1) => {
    clearError();
    getNFTsByCollection(collection, network, page)
      .then(setNFTsByCollection)
      .catch((error: any) => setError({ point: APIErrorPoint.NFTS_BY_COLLECTION, message: error.message }));
  };

  const loadNFTsByNetwork = (page: number = 1) => {
    clearError();
    getAllNFTsByNetwork(network, page)
      .then(setNFTsByNetwork)
      .catch((error: any) => setError({ point: APIErrorPoint.NFTS_BY_NETWORK, message: error.message }));
  };

  const loadAllCollections = (page: number = 1) => {
    clearError();
    getAllCollections(network, page)
      .then(setAllCollections)
      .catch((error: any) => setError({ point: APIErrorPoint.ALL_COLLECTIONS, message: error.message }));
  };

  const loadTopSellingCollections = (page: number = 1) => {
    clearError();
    getTopSellingCollections(network, page)
      .then(setTopSellingCollections)
      .catch((error: any) => setError({ point: APIErrorPoint.ALL_COLLECTIONS, message: error.message }));
  };

  const loadCollectionsByAssets = (page: number = 1) => {
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

  const loadAllOngoingSales = (page: number = 1) => {
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
    if (!!account && !!active) loadToken(account);
  }, [account, active]);

  return (
    <APIContext.Provider
      value={{
        token,
        nftById,
        nftsByUser,
        nftsByCollection,
        nftsByNetwork,
        allCollections,
        collectionsByAssets,
        topSellingCollections,
        collectionById,
        itemsInCollection,
        allOngoingSales,
        favorites,
        allNFTOrders,
        loadAllNFTOrders,
        loadNFTById,
        loadNFTsByUser,
        loadNFTsByCollection,
        loadNFTsByNetwork,
        loadAllCollections,
        loadCollectionsByAssets,
        loadTopSellingCollections,
        loadCollectionById,
        loadNumberOfItemsInCollection,
        loadAllOngoingSales,
        loadFavorites,
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
