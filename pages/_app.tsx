import '../styles/globals.css';
import 'antd/dist/antd.css';

import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MoralisProvider } from 'react-moralis';
import Web3 from 'web3';

import { APIContextProvider } from '../contexts/api';
import { SocketProvider } from '../contexts/socket';
import { Web3ContextProvider } from '../contexts/web3';

function getLibrary(provider: any) {
  return new Web3(provider);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="crossOrigin" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        ></link>
        <meta
          name="description"
          content="The Vefi NFT marketplace is a product of the Vefi Ecosystem that allows the creation and the trading of non-fungible assets on various chains."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="nft, vefi, multi-chain nft marketplace, xp.network, vefi nft marketplace, earn money from owning collections"
        />
        <meta charSet="UTF-8" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta
          property="og:description"
          content="The Vefi NFT marketplace is a product of the Vefi Ecosystem that allows the creation and the trading of non-fungible assets on various chains."
        />
        <meta property="og:url" content="https://vefinftmarket.place" />
      </Head>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ContextProvider>
          <APIContextProvider>
            <SocketProvider>
              <MoralisProvider
                serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL as string}
                appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID as string}
              >
                <Component {...pageProps} />
              </MoralisProvider>
            </SocketProvider>
          </APIContextProvider>
        </Web3ContextProvider>
      </Web3ReactProvider>
    </>
  );
}

export default MyApp;
