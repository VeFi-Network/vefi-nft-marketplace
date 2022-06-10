import { Interface } from '@ethersproject/abi';
import { parseEther, parseUnits } from '@ethersproject/units';
import { Button, message } from 'antd';
// @ts-ignore
import ethAddress from 'ethereum-address';
import _ from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import type Web3 from 'web3';

import request from '../../api/rpc';
import { addresses, WETH } from '../../assets';
import erc20Abi from '../../assets/abis/ERC20.json';
import marketPlaceAbi from '../../assets/abis/Marketplace.json';
import { CONSTANTS } from '../../assets/index';
import { useWeb3Context } from '../../contexts/web3';

const MainContainer = styled.div`
  height: max-content;
  padding-bottom: 50px;
  width: 1006px;
  /* margin-top: -330px; */
  margin-left: -503px;
  background: #222222;
  border-radius: 15px;
  position: absolute;
  top: 100px;
  left: 50%;
  display: flex;
  flex-direction: column;
  padding-left: 67px;
  top: ${(props: { open: boolean }) => (props.open ? '100px' : '-50%')};
  opacity: ${(props: { open: boolean }) => (props.open ? '1' : '0')};
  transition-timing-function: ease-out;
  transition-duration: 500ms;
  z-index: 999;

  .img-title {
    display: flex;
    flex-direction: row;
    margin-left: 20px;

    .image-container {
      width: 265px;
      height: 263px;
      margin-top: -80px;
      background: #222222;
      border-radius: 11px;
      display: flex;
      align-items: center;
      justify-content: center;

      .nft-img {
        border-radius: 14px;
      }

      @media screen and (max-width: 760px) {
        width: 100%;
        img {
          object-fit: cover;
        }
      }
    }

    .title {
      font-family: 'Rubik';
      font-style: normal;
      color: #ebf8ff;
      font-weight: 500;
      font-size: 40px;
      line-height: 47px;
      margin-left: 55px;
      margin-top: 51px;

      @media screen and (max-width: 760px) {
        margin: 20px 0;
        text-align: center;
      }
    }
  }

  .text {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #ebf8ff;
    margin-top: 11px;

    @media screen and (max-width: 760px) {
      font-size: 0.7rem;
    }
  }

  .input-div {
    width: 195px;
    height: 38px;
    border: 1.5px solid #5c95ff;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 13px;
    margin-top: 10px;
    @media screen and (max-width: 760px) {
      width: 100%;
    }
    .eth-container {
      border-radius: 50%;
      width: 18px;
      height: 18px;
      background: #edf0f4;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    .input {
      width: 100px;
      margin-left: 10px;
      border: none;
      background: transparent;
      outline: none;

      -moz-appearance: textfield;
      color: rgba(255, 255, 255, 0.58);

      @media screen and (max-width: 760px) {
        width: 100%;
      }
    }
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .input-div-large {
    width: 404px;
    height: 38px;
    border: 1.5px solid #5c95ff;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 13px;
    margin-top: 10px;
    @media screen and (max-width: 760px) {
      width: 100%;
    }
    .input-large {
      width: 380px;
      border: none;
      outline: none;
      background: transparent;
      color: rgba(255, 255, 255, 0.58);
    }
  }

  .sell-btn {
    width: 152px;
    height: 42px;
    margin-top: 32px;
  }

  @media screen and (max-width: 760px) {
    width: 95%;
    margin: 0px auto;
    left: 10px;

    padding: 0 2rem;
    .btn {
      margin-bottom: 30px;
      width: 100%;
    }
    .container__inner {
      padding-bottom: 50px;
    }
    .img-title {
      flex-direction: column;
      margin: 0;
    }
  }
`;

const Heading = styled.div`
  margin-top: ${(props: { top: string }) => (props.top ? props.top : '58px')};
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #ebf8ff;
  @media screen and (max-width: 760px) {
    font-size: 1.4rem;
    margin: 20px 0;
  }
`;

type Props = {
  modal: boolean;
  setModal: any;
  nft: any;
  transition: boolean;
  fp: number;
};

export default function OfferPopup({ modal, setModal, nft, transition, fp }: Props) {
  const { chainId, account, network, library, explorerUrl } = useWeb3Context();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ recipient: string; price: number }>({
    recipient: account as string,
    price: fp
  });

  const router = useRouter();

  const setProperty = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(d => ({ ...d, [e.target.name]: e.target.value }));

  const allConditionsSatisfied = (): boolean => ethAddress.isAddress(data.recipient) && data.price > 0;

  const resetAllFields = () =>
    setData({
      recipient: '',
      price: 0
    });

  const placeOffer = async () => {
    try {
      if (allConditionsSatisfied()) {
        setIsLoading(true);
        let price: ReturnType<typeof parseEther | typeof parseUnits>;
        const wrappedToken = WETH[chainId as number];

        message.info('Parsing price');
        const erc20AbiInterface = new Interface(erc20Abi);
        const functionSigHash = erc20AbiInterface.getSighash('decimals');
        const decimals = await request(network, {
          method: 'eth_call',
          jsonrpc: '2.0',
          id: 1,
          params: [{ to: wrappedToken, data: functionSigHash }, 'latest']
        });

        price = parseUnits(data.price.toString(), decimals);

        if (price.lt(parseUnits(fp.toString(), decimals))) throw new Error('Offer cannot be less than floor price');

        const erc20 = new (library as Web3).eth.Contract(erc20Abi as any, WETH[chainId as number]);
        const tokenName = await erc20.methods.name().call();
        const balanceOfHash = erc20AbiInterface.encodeFunctionData('balanceOf', [account]);

        const balance = await request(network, {
          method: 'eth_call',
          jsonrpc: '2.0',
          id: 1,
          params: [{ to: wrappedToken, data: balanceOfHash }, 'latest']
        });

        if (!price.lte(balance))
          throw new Error('You do not have enough '.concat(tokenName).concat(' to make this offer.'));

        message.info('Requesting approval');
        await erc20.methods.approve(addresses[chainId as number], price.toHexString()).send({
          from: account
        });

        message.success('Approved!');

        const contract = new (library as Web3).eth.Contract(marketPlaceAbi as any, addresses[chainId as number]);

        message.info('Now placing offer');
        const offerResponse = await contract.methods
          .placeOffer(nft.collectionId, nft.tokenId, data.recipient, wrappedToken, price.toHexString())
          .send({ from: account });

        setModal(false);
        message
          .success(
            <>
              <span style={{ fontSize: 15 }}>Offer successfully made!</span>{' '}
              <a
                style={{ fontSize: 15, textDecoration: 'none', color: '#6d00c1' }}
                href={explorerUrl.concat('tx/' + offerResponse.transactionHash)}
                target="_blank"
                rel="noreferrer"
              >
                View on explorer!
              </a>
            </>,
            5
          )
          .then(() => router.push(`/collections/${nft.collectionId}`));
      }
      resetAllFields();
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      message.error(error.message);
    }
  };

  return (
    <>
      {modal ? (
        <MainContainer open={transition}>
          <div className="container__inner">
            <div className="img-title">
              <div className="image-container">
                <img
                  width="244px"
                  height="238.53px"
                  src={nft ? nft.metadata?.image : '/nft/nft02.png'}
                  alt=""
                  className="nft-img"
                />
              </div>
              <div className="title">Cool! Place your offer!</div>
            </div>

            <Heading top="68px">Set A Price</Heading>

            <div className="text">
              How much would you like to offer for this NFT? <span style={{ color: 'blue' }}>Note:</span> You'll be
              offering a wrapped token for this NFT and the lowest you can offer is {fp}.
            </div>

            <div className="input-div">
              <div className="eth-container">
                <Image
                  width="12px"
                  height="12px"
                  src={CONSTANTS.paymentTokensPerNetwork[chainId as number][0].logo as string}
                />
              </div>
              <input
                value={data.price}
                name="price"
                onChange={setProperty}
                placeholder="0.00"
                type="number"
                className="input"
              />
            </div>

            <Heading top="15px">Recipient</Heading>

            <div className="text">Which address would receive this NFT if this offer is accepted?</div>

            <div className="input-div-large">
              <input
                type="text"
                value={data.recipient}
                name="recipient"
                onChange={setProperty}
                className="input-large"
              />
            </div>

            <div style={{ marginTop: 6 }}>
              <Button
                type="primary"
                size="large"
                disabled={!allConditionsSatisfied() || isLoading}
                loading={isLoading}
                onClick={placeOffer}
                className="btn"
              >
                {allConditionsSatisfied() ? 'Place Offer' : 'Please fill in all necessary details'}{' '}
              </Button>
            </div>
          </div>
        </MainContainer>
      ) : null}
    </>
  );
}
