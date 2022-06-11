import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type Web3 from 'web3';

import request from '../../api/rpc';
import chains from '../../chains.json';

type Web3ContextType = {
  account?: string | null;
  library?: Web3;
  chainId?: number;
  active: boolean;
  error?: Error;
  network: string;
  networkSymbol: string;
  explorerUrl: string;
  txPath: string;
  balance: string;
  connectMetamask: () => void;
  connectWalletConnect: () => void;
  disconnectWallet: () => void;
};

const Web3Context = createContext<Web3ContextType>({} as Web3ContextType);

const injectedConnector = new InjectedConnector({
  supportedChainIds: [56, 137, 32520, 1024, 43114, 40]
});

const walletConnectConnector = new WalletConnectConnector({
  qrcode: true,
  bridge: 'https://bridge.walletconnect.org',
  supportedChainIds: [56, 137, 32520, 1024, 43114],
  rpc: {
    56: chains[56].chainRpc,
    137: chains[137].chainRpc,
    32520: chains[32520].chainRpc,
    1024: chains[1024].chainRpc,
    43114: chains[43114].chainRpc,
    40: chains[40].chainRpc
  }
});

export const Web3ContextProvider = ({ children }: any) => {
  const { library, account, activate, deactivate, active, chainId, error, setError } = useWeb3React<Web3>();
  const [network, setNetwork] = useState<string>('smartchain');
  const [networkSymbol, setNetworkSymbol] = useState<string>('BNB');
  const [explorerUrl, setExplorerUrl] = useState<string>(chains['56'].explorerUrl);
  const [txPath, setTxPath] = useState<string>(chains['56'].txPath);
  const [tried, setTried] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>('0');

  const fetchBalance = () => {
    try {
      request(network, { id: 1, jsonrpc: '2.0', method: 'eth_getBalance', params: [account, 'latest'] })
        .then(formatEther)
        .then(setBalance)
        .catch(setError);
    } catch (error: any) {
      setError(error);
    }
  };

  const connectMetamask = useCallback(() => {
    activate(injectedConnector, undefined, true).then(() => {
      console.log('Metamask connected!');
    });
  }, []);

  const connectWalletConnect = useCallback(() => {
    activate(walletConnectConnector, undefined, true).then(() => {
      console.log('Walletconnect connected');
    });
  }, []);

  const disconnectWallet = useCallback(() => {
    if (active) deactivate();
  }, [active]);

  useEffect(() => {
    injectedConnector.isAuthorized().then(isAuth => {
      if (isAuth) {
        activate(injectedConnector, setError, true)
          .then(() => {
            setTried(true);
            setTimeout(() => {
              if (!!chainId) {
                setNetwork(chains[chainId?.toString() as keyof typeof chains].appName);
                setExplorerUrl(chains[chainId?.toString() as keyof typeof chains].explorerUrl);
                setNetworkSymbol(chains[chainId?.toString() as keyof typeof chains].symbol);
                setTxPath(chains[chainId?.toString() as keyof typeof chains].txPath);
              }
            }, 500);
          })
          .catch(setError);
      } else {
        setTried(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  useEffect(() => {
    if (!!chainId && active) {
      setNetwork(chains[chainId.toString() as keyof typeof chains].appName);
      setExplorerUrl(chains[chainId.toString() as keyof typeof chains].explorerUrl);
      setNetworkSymbol(chains[chainId.toString() as keyof typeof chains].symbol);
      setTxPath(chains[chainId.toString() as keyof typeof chains].txPath);
    }
  }, [chainId, active]);

  useEffect(() => {
    if (active && !!account && !!network) {
      fetchBalance();
    } else {
      setBalance('0');
    }
  }, [active, network, account]);

  return (
    <Web3Context.Provider
      value={{
        account,
        library,
        chainId,
        connectMetamask,
        connectWalletConnect,
        disconnectWallet,
        active,
        network,
        networkSymbol,
        explorerUrl,
        txPath,
        balance,
        error
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => {
  return useContext(Web3Context);
};
