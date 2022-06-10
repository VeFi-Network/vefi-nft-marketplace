import axios from 'axios';

import { IPFS_API } from './constants';

const baseAxios = axios.create({
  baseURL: IPFS_API
});

export function pinJson(json: any): Promise<any> {
  return new Promise((resolve, reject) => {
    baseAxios
      .post('/ipfs/json', json)
      .then(res => {
        resolve(res.data);
      })
      .catch(reject);
  });
}

export function pinFile(formData: any): Promise<any> {
  return new Promise((resolve, reject) => {
    baseAxios
      .post('/ipfs/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(reject);
  });
}
