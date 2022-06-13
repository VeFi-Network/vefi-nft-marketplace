import { AddressZero } from '@ethersproject/constants';
import { parseEther } from '@ethersproject/units';

export const addresses: { [key: number]: string } = {
  56: '0x6ad3c20D6B29E363617aBE5f6473E029300b0f73',
  137: '0x6269b4705FCdBAbF81D4636e33c2100f757A05ac',
  32520: '0xA1FcA451AF5782d6A25582DAc5AF77B867a5bcC9',
  1024: '0x64FAF984Bf60dE19e24238521814cA98574E3b00',
  43114: '0xb562b09Bc2317D18a82FD415B7Fb33540Db7e723',
  40: '0x64FAF984Bf60dE19e24238521814cA98574E3b00',
  86: '0x2e19F01B81628CCd8cFce9F7d9F2fACC77343b7c'
};

export const WETH: { [key: number]: string } = {
  56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  137: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  32520: '0x0eb9036cbE0f052386f36170c6b07eF0a0E3f710',
  1024: '0x1376C97C5c512d2d6F9173A9A3A016B6140b4536',
  43114: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
  40: '0xd102ce6a4db07d247fcc28f366a623df0938ca9e',
  86: '0x672f30407A71fa8737A3A14474ff37E09c7Fc44a'
};

export const CONSTANTS: {
  feesPerNetwork: {
    [key: number]: {
      nftMintFee: ReturnType<typeof parseEther>;
      collectionDeployFee: ReturnType<typeof parseEther>;
    };
  };
  paymentTokensPerNetwork: {
    [key: number]: Array<{
      token: string;
      logo: string;
      name: string;
    }>;
  };
} = {
  feesPerNetwork: {
    56: {
      nftMintFee: parseEther('0.007618467164406522'),
      collectionDeployFee: parseEther('0.03802715138608966')
    },
    137: {
      nftMintFee: parseEther('3.8105109133032555'),
      collectionDeployFee: parseEther('19.03094431545693')
    },
    32520: {
      nftMintFee: parseEther('4866606.320748289'),
      collectionDeployFee: parseEther('24365818.654958077')
    },
    1024: {
      nftMintFee: parseEther('1.968503937007874'),
      collectionDeployFee: parseEther('9.84251968503937')
    },
    43114: {
      nftMintFee: parseEther('0.1075268817204301'),
      collectionDeployFee: parseEther('0.5376344086021505')
    },
    40: {
      nftMintFee: parseEther('8.977023308841021'),
      collectionDeployFee: parseEther('44.90446574911875')
    },
    86: {
      nftMintFee: parseEther('0.45248868778280543'),
      collectionDeployFee: parseEther('2.2675736961451247')
    }
  },
  paymentTokensPerNetwork: {
    56: [
      {
        token: AddressZero,
        logo: '/icons/binance.svg',
        name: 'Binance'
      },
      {
        token: WETH[56],
        logo: '/icons/binance.svg',
        name: 'Wrapped Binance'
      }
    ],
    137: [
      {
        token: AddressZero,
        logo: '/icons/matic.svg',
        name: 'Polygon'
      },
      {
        token: WETH[137],
        logo: '/icons/matic.svg',
        name: 'Wrapped Matic'
      }
    ],
    32520: [
      {
        token: AddressZero,
        logo: '/icons/brise.svg',
        name: 'Brise'
      },
      {
        token: WETH[32520],
        logo: '/icons/brise.svg',
        name: 'Wrapped Brise'
      }
    ],
    43114: [
      {
        token: AddressZero,
        logo: '/icons/avax.svg',
        name: 'Avalanche'
      },
      {
        token: WETH[43114],
        logo: '/icons/brise.svg',
        name: 'Wrapped Avax'
      }
    ],
    40: [
      {
        token: AddressZero,
        logo: '/icons/telos.svg',
        name: 'Telos'
      },
      {
        token: WETH[43114],
        logo: '/icons/telos.svg',
        name: 'Wrapped Telos'
      }
    ],
    1024: [
      {
        token: AddressZero,
        logo: '/icons/clover.svg',
        name: 'Clover'
      },
      {
        token: WETH[1024],
        logo: '/icons/clover.svg',
        name: 'Wrapped Clover'
      }
    ],
    86: [
      {
        token: AddressZero,
        logo: '/icons/gatechain.svg',
        name: 'Gatechain'
      },
      {
        token: WETH[86],
        logo: '/icons/gatechain.svg',
        name: 'Wrapped Gatecoin'
      }
    ]
  }
};
