import React, { createContext, useState, useContext } from 'react';
import { NFTModel } from '../../api/models/nft';
import { getNFTsByOwner, getNFTsByCollection, getAllNFTsByNetwork } from '../../api/nft';

export enum APIErrorPoint {
  NFTS_BY_USER,
  NFTS_BY_COLLECTION,
  NFTS_BY_NETWORK
}

type APIContextType = {
  nftsByUser: Array<NFTModel>;
  nftsByCollection: Array<NFTModel>;
  nftsByNetwork: Array<NFTModel>;
  loadNFTsByUser: (page?: number) => void;
  loadNFTsByCollection: (collection: string, page?: number) => void;
  loadNFTsByNetwork: (network: string, page?: number) => void;
  error?: {
    point: APIErrorPoint;
    message: string;
  };
};

const APIContext: React.Context<APIContextType> = createContext<APIContextType>({} as APIContextType);

export const APIContextProvider = ({ children }: any) => {
  const [error, setError] = useState<{ point: APIErrorPoint; message: string }>();
  const [nftsByUser, setNFTsByUser] = useState<Array<NFTModel>>([]);
  const [nftsByCollection, setNFTsByCollection] = useState<Array<NFTModel>>([]);
  const [nftsByNetwork, setNFTsByNetwork] = useState<Array<NFTModel>>([]);

  const clearError = () => {
    setError(undefined);
  };

  const loadNFTsByUser = (page: number = 1) => {
    clearError();
    getNFTsByOwner('', '', page)
      .then(setNFTsByUser)
      .catch((error: any) => setError({ point: APIErrorPoint.NFTS_BY_USER, message: error.message }));
  };

  const loadNFTsByCollection = (collection: string, page: number = 1) => {
    clearError();
    getNFTsByCollection(collection, '', page)
      .then(setNFTsByCollection)
      .catch((error: any) => setError({ point: APIErrorPoint.NFTS_BY_COLLECTION, message: error.message }));
  };

  const loadNFTsByNetwork = (network: string, page: number = 1) => {
    clearError();
    getAllNFTsByNetwork(network, page)
      .then(setNFTsByNetwork)
      .catch((error: any) => setError({ point: APIErrorPoint.NFTS_BY_NETWORK, message: error.message }));
  };

  return (
    <APIContext.Provider
      value={{
        nftsByUser,
        nftsByCollection,
        nftsByNetwork,
        loadNFTsByUser,
        loadNFTsByCollection,
        loadNFTsByNetwork,
        error
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export const useAPIContext = () => useContext(APIContext);
