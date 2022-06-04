import axios, { AxiosResponse } from 'axios';

import { NFT_API } from './constants';
import { AccountModel } from './models/account';
import { CollectionModel } from './models/collection';
import { NFTModel } from './models/nft';
import { OrderModel } from './models/order';
import { SaleModel } from './models/sale';

const baseAxios = axios.create({
  baseURL: NFT_API
});

function handleResponse(res: AxiosResponse, resolve: any, reject: any) {
  if (res.status >= 400)
    if (!!res.data && !!res.data.error) {
      reject(new Error(res.data.error));
      console.log(res.data);
    } else reject(new Error(`API responded with ${res.status}`));
  else resolve(res.data.result);
}

export function createAccount(body: any): Promise<any> {
  return new Promise((resolve, reject) => {
    baseAxios
      .post('/api/account', body, { headers: { 'Content-Type': 'application/json' } })
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function updateAccount(body: any, token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    baseAxios
      .patch(`/api/account`, body, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function signToken(body: any): Promise<any> {
  return new Promise((resolve, reject) => {
    baseAxios
      .post('/api/account/auth', body, { headers: { 'Content-Type': 'application/json' } })
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getAuthenticatedUser(token: string): Promise<AccountModel> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get('/api/account', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getAccountById(accountId: string): Promise<AccountModel> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/account/${accountId}`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getAllNFTsByNetwork(network: string, page?: number): Promise<NFTModel[]> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/byNetwork${!!page ? `?page=${page}` : ''}`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getNFTByIdAndNetwork(collectionId: string, id: number, network: string): Promise<NFTModel> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/${collectionId}/${id}/byId`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getNFTsByCollection(collection: string, network: string, page?: number): Promise<NFTModel[]> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/${collection}/byCollection${!!page ? `?page=${page}` : ''}`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getNFTsByOwner(network: string, accountId: string, page?: number): Promise<NFTModel[]> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/${accountId}/byOwner${!!page ? `?page=${page}` : ''}`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getAllCollections(network: string, page?: number): Promise<CollectionModel[]> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/collection/${network}/all${!!page ? `?page=${page}` : ''}`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getTopSellingCollections(network: string, page?: number): Promise<CollectionModel[]> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/collection/${network}/topSelling${!!page ? `?page=${page}` : ''}`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getCollectionsByItems(network: string, page?: number): Promise<CollectionModel[]> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/collection/${network}/assets${!!page ? `?page=${page}` : ''}`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getAllCollectionsByOwner(
  network: string,
  accountId: string,
  page?: number
): Promise<CollectionModel[]> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/collection/${network}/${accountId}/byOwner${!!page ? `?page=${page}` : ''}`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getCollectionById(network: string, id: string): Promise<CollectionModel> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/collection/${network}/${id}/byNetwork`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function countAllItemsByCollection(network: string, collectionId: string): Promise<number> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/${collectionId}/count`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getAllOngoingSales(network: string, page?: number): Promise<Array<SaleModel>> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/sale/${network}/allOngoing${!!page ? `?page=${page}` : ''}`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function checkIfOnSale(network: string, collectionId: string, tokenId: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/${collectionId}/${tokenId}/isOnSale`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function fetchPriceFromPeriod(
  network: string,
  collectionId: string,
  tokenId: number,
  fromTime?: number,
  toTime?: number
): Promise<Array<{ timestamp: number; price: number }>> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/${collectionId}/${tokenId}/prices?fromTime=${fromTime}&toTime=${toTime}`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getAllFavorites(network: string, collectionId: string, tokenId: number): Promise<Array<any>> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/${collectionId}/${tokenId}/getAllFavorites`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getFavoriteNFTsOfUser(network: string, accountId: string, page?: number): Promise<Array<NFTModel>> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/${accountId}/getFavorites${!!page ? `?page=${page}` : ''}`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getUserWatchList(network: string, token: string, page?: number): Promise<Array<OrderModel>> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/order/${network}/watchlist${!!page ? `?page=${page}` : ''}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function addToFavorites(network: string, collectionId: string, tokenId: number, token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    baseAxios
      .post(`/api/nft/${network}/${collectionId}/${tokenId}/addToFavorites`, undefined, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function removeFromFavorites(
  network: string,
  collectionId: string,
  tokenId: number,
  token: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    baseAxios
      .delete(`/api/nft/${network}/${collectionId}/${tokenId}/removeFromFavorites`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getAllOrdersByNFT(network: string, collectionId: string, tokenId: number): Promise<Array<OrderModel>> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/order/${network}/${collectionId}/${tokenId}/byNFT`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getNFTsInCollectionByPrice(
  network: string,
  collectionId: string,
  page?: number
): Promise<Array<NFTModel>> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/${collectionId}/price${!!page ? `?page=${page}` : ''}`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getTopSellingNFTsInCollection(
  network: string,
  collectionId: string,
  page?: number
): Promise<Array<NFTModel>> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/${collectionId}/topSelling${!!page ? `?page=${page}` : ''}`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getNFTsWithOffersInCollection(
  network: string,
  collectionId: string,
  page?: number
): Promise<Array<NFTModel>> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/${collectionId}/hasOffers${!!page ? `?page=${page}` : ''}`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function countItemViews(network: string, collectionId: string, tokenId: number): Promise<number> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/${collectionId}/${tokenId}/countViews`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function viewItem(network: string, collectionId: string, tokenId: number, token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    baseAxios
      .post(`/api/nft/${network}/${collectionId}/${tokenId}/view`, undefined, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function countSuccessfulTrades(network: string, collectionId: string): Promise<number> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/sale/${network}/${collectionId}/traded/count`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}
