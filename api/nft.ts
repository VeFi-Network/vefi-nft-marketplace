import axios, { AxiosResponse } from 'axios';
import { NFT_API } from './constants';
import { NFTModel } from './models/nft';
import { CollectionModel } from './models/collection';
import { AccountModel } from './models/account';
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

export function getAllNFTsByNetwork(network: string, page: number): Promise<NFTModel[]> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/byNetwork?page=${page}`)
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

export function getNFTsByCollection(collection: string, network: string, page: number): Promise<NFTModel[]> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/${collection}/byCollection?page=${page}`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getNFTsByOwner(token: string, network: string, page: number): Promise<NFTModel[]> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/byOwner?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getAllCollections(network: string, page: number): Promise<CollectionModel[]> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/collection/${network}/all?page=${page}`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getTopSellingCollections(network: string, page: number): Promise<CollectionModel[]> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/collection/${network}/topSelling?page=${page}`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getCollectionsByItems(network: string, page: number): Promise<CollectionModel[]> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/collection/${network}/assets?page=${page}`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}

export function getAllCollectionsByOwner(network: string, token: string, page: number): Promise<CollectionModel[]> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/collection/${network}/byOwner?page=${page}`, { headers: { Authorization: `Bearer ${token}` } })
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

export function getAllOngoingSales(network: string, page: number): Promise<Array<SaleModel>> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/sale/${network}/allOngoing?page=${page}`)
      .then(res => handleResponse(res, resolve, reject))
      .catch(reject);
  });
}
