import axios from 'axios';

import chains from '../chains.json';

type JsonRpcRequest = {
  method: string;
  jsonrpc: '2.0';
  params: Array<any>;
  id: number | string;
};

export default (network: string, req: JsonRpcRequest): Promise<any> => {
  return new Promise((resolve, reject) => {
    const url = Object.values(chains).find(val => val.appName === network)?.chainRpc;
    axios
      .post(url as string, req)
      .then(res => {
        const data = res.data;

        if (!!data.result) resolve(data.result);
        else {
          if (!!data.error) reject(new Error(data.error.message || data.error));
        }
      })
      .catch(reject);
  });
};
