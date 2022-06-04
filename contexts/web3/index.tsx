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
  balance: string;
  connectMetamask: () => void;
  connectWalletConnect: () => void;
  disconnectWallet: () => void;
};

const Web3Context = createContext<Web3ContextType>({} as Web3ContextType);

const injectedConnector = new InjectedConnector({
  supportedChainIds: [97, 80001, 4]
});

const walletConnectConnector = new WalletConnectConnector({
  qrcode: true,
  bridge: 'https://bridge.walletconnect.org',
  supportedChainIds: [97, 80001, 4],
  rpc: {
    97: chains[97].chainRpc,
    80001: chains[80001].chainRpc,
    4: chains[4].chainRpc
  }
});

export const Web3ContextProvider = ({ children }: any) => {
  const { library, account, activate, deactivate, active, chainId, error, setError } = useWeb3React<Web3>();
  const [network, setNetwork] = useState<string>('smartchain');
  const [networkSymbol, setNetworkSymbol] = useState<string>('BNB');
  const [explorerUrl, setExplorerUrl] = useState<string>(chains['97'].explorerUrl);
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
        activate(injectedConnector, undefined, true).then(() => {
          setTried(true);
          setTimeout(() => {
            if (!!chainId) {
              setNetwork(chains[chainId?.toString() as keyof typeof chains].appName);
              setExplorerUrl(chains[chainId?.toString() as keyof typeof chains].explorerUrl);
              setNetworkSymbol(chains[chainId?.toString() as keyof typeof chains].symbol);
            }
          }, 500);
        });
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
