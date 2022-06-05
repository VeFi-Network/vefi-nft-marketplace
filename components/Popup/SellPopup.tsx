// @ts-ignore
import { Interface } from '@ethersproject/abi';
import { AddressZero } from '@ethersproject/constants';
import { parseEther, parseUnits } from '@ethersproject/units';
import { Button, message } from 'antd';
// @ts-ignore
import ethAddress from 'ethereum-address';
import _ from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import type Web3 from 'web3';

import request from '../../api/rpc';
import { addresses, CONSTANTS } from '../../assets';
import deployableCollectionAbi from '../../assets/abis/DeployableCollection.json';
import erc20Abi from '../../assets/abis/ERC20.json';
import marketPlaceAbi from '../../assets/abis/Marketplace.json';
import { useWeb3Context } from '../../contexts/web3';
import DropdownComponentWithIcon from './DropdownWithIcon';

const MainSellContainer = styled.div`
  height: max-content;
  padding-bottom: 50px;
  width: 1006px;
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
};

export default function SellPopup({ modal, setModal, nft, transition }: Props) {
  const [tokenDropdownShown, setTokenDropdownShown] = useState(false);
  const [token, setToken] = useState<{ name: string; image: string; address: string }>();
  const { chainId, account, network, library, explorerUrl } = useWeb3Context();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ paymentReceiver: string; currency: string; price: number }>({
    paymentReceiver: account as string,
    currency: AddressZero,
    price: 0
  });

  const router = useRouter();

  const setProperty = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(d => ({ ...d, [e.target.name]: e.target.value }));

  const allConditionsSatisfied = (): boolean =>
    ethAddress.isAddress(data.paymentReceiver) &&
    !!data.currency &&
    ethAddress.isAddress(data.currency) &&
    data.price > 0;

  const resetAllFields = () =>
    setData({
      paymentReceiver: '',
      currency: '',
      price: 0
    });

  const sellItem = async () => {
    try {
      if (allConditionsSatisfied()) {
        setIsLoading(true);
        let price: ReturnType<typeof parseEther | typeof parseUnits>;

        message.info('Requesting approval');
        const erc721 = new (library as Web3).eth.Contract(deployableCollectionAbi as any, nft.collectionId);

        await erc721.methods.setApprovalForAll(addresses[chainId as number], true).send({
          from: account
        });

        message.success('Approved!');

        message.info('Parsing price');
        if (data.currency === AddressZero) {
          price = parseEther(data.price.toString());
        } else {
          const erc20AbiInterface = new Interface(erc20Abi);
          const functionSigHash = erc20AbiInterface.getSighash('decimals');
          const decimals = await request(network, {
            method: 'eth_call',
            jsonrpc: '2.0',
            id: 1,
            params: [{ to: data.currency, data: functionSigHash }, 'latest']
          });
          price = parseUnits(data.price.toString(), decimals);
        }

        const contract = new (library as Web3).eth.Contract(marketPlaceAbi as any, addresses[chainId as number]);

        message.info('Now putting up for sale');
        const saleResponse = await contract.methods
          .placeForSale(nft.tokenId, nft.collectionId, data.paymentReceiver, data.currency, price.toHexString())
          .send({
            from: account
          });
        setModal(false);
        message
          .success(
            <>
              <span style={{ fontSize: 15 }}>NFT successfully sold!</span>{' '}
              <a
                style={{ fontSize: 15, textDecoration: 'none', color: '#6d00c1' }}
                href={explorerUrl.concat('tx/' + saleResponse.transactionHash)}
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

  useEffect(() => {
    setToken(
      CONSTANTS.paymentTokensPerNetwork[chainId || 97].map(t => ({
        name: t.name,
        image: t.logo,
        address: t.token
      }))[0]
    );
  }, []);

  return (
    <>
      {modal ? (
        <MainSellContainer open={transition}>
          <div className="img-title">
            <div className="image-container">
              <img
                width="244px"
                height="238.53px"
                src={nft ? nft?.metadata?.image : '/nft/nft02.png'}
                alt=""
                className="nft-img"
              />
            </div>
            <div className="title">Cool! Let's sell your NFT</div>
          </div>

          <Heading top="68px">Set A Price</Heading>

          <div className="text">How much would you like to sell your NFT?</div>

          <div className="input-div">
            <div className="eth-container">
              <Image width="12px" height="12px" src={token?.image as string} />
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

          <Heading top="27px">Select Payment Token</Heading>

          <div className="text">Which currency would you accept for this asset?</div>

          <DropdownComponentWithIcon
            setDropdown={setTokenDropdownShown}
            dropdown={tokenDropdownShown}
            value={token}
            onChange={(value: any) => {
              setToken(value);
              setData(d => ({ ...d, currency: value.address }));
            }}
            dropDownList={_.map(CONSTANTS.paymentTokensPerNetwork[chainId as number], item => ({
              name: item.name,
              image: item.logo,
              address: item.token
            }))}
            width={''}
            top={'10px'}
          />

          <Heading top="15px">Payment Recipient</Heading>

          <div className="text">Which address would receive the payment from the proceedings?</div>

          <div className="input-div-large">
            <input
              type="text"
              value={data.paymentReceiver}
              name="paymentReceiver"
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
              onClick={sellItem}
              className="btn"
            >
              {allConditionsSatisfied() ? 'Place Item For Sale' : 'Please fill in all necessary details'}{' '}
            </Button>
          </div>
        </MainSellContainer>
      ) : null}
    </>
  );
}
