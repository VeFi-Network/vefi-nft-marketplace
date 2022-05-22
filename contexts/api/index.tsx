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
  getTopSellingCollections
} from '../../api/nft';
import chains from '../../chains.json';
import { useWeb3Context } from '../web3/index';
import { CollectionModel } from '../../api/models/collection';

export enum APIErrorPoint {
  NFT_BY_ID,
  NFTS_BY_USER,
  NFTS_BY_COLLECTION,
  NFTS_BY_NETWORK,
  TOKEN_LOAD,
  AUTH_USER,
  ALL_COLLECTIONS,
  COLLECTION_BY_ID,
  COUNT_COLLECTION_ITEMS
}

type APIContextType = {
  nftById: NFTModel;
  nftsByUser: Array<NFTModel>;
  nftsByCollection: Array<NFTModel>;
  nftsByNetwork: Array<NFTModel>;
  allCollections: Array<CollectionModel>;
  topSellingCollections: Array<CollectionModel>;
  collectionsByAssets: Array<CollectionModel>;
  collectionById: CollectionModel;
  itemsInCollection: number;
  isUserAuthenticated: boolean;
  authenticatedUser?: AccountModel;
  loadAllCollections: (page?: number) => void;
  loadTopSellingCollections: (page?: number) => void;
  loadCollectionsByAssets: (page?: number) => void;
  loadCollectionById: (id: string) => void;
  loadAuthUser: () => void;
  loadToken: (accountId: any) => void;
  loadNFTById: (collectionId: string, id: number) => void;
  loadNFTsByUser: (page?: number) => void;
  loadNFTsByCollection: (collection: string, page?: number) => void;
  loadNFTsByNetwork: (page?: number) => void;
  loadNumberOfItemsInCollection: (collectionId: string) => void;
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
  const [authenticatedUser, setAuthenticatedUser] = useState<AccountModel>();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  const { chainId } = useWeb3Context();
  const network = chains['97'].appName;

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
    getAuthenticatedUser(token)
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

  useEffect(() => {
    if (!!localStorage.getItem('VEFI_NFT_TOKEN')) {
      setToken(localStorage.getItem('VEFI_NFT_TOKEN') as string);
      setIsUserAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!!token && token.length > 0) {
      loadAuthUser();
    }
  }, [token]);

  return (
    <APIContext.Provider
      value={{
        nftById,
        nftsByUser,
        nftsByCollection,
        nftsByNetwork,
        allCollections,
        collectionsByAssets,
        topSellingCollections,
        collectionById,
        itemsInCollection,
        loadNFTById,
        loadNFTsByUser,
        loadNFTsByCollection,
        loadNFTsByNetwork,
        loadToken,
        loadAuthUser,
        loadAllCollections,
        loadCollectionsByAssets,
        loadTopSellingCollections,
        loadCollectionById,
        loadNumberOfItemsInCollection,
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
