import { message, Spin } from 'antd';
// @ts-ignore
import ethAddress from 'ethereum-address';
import _ from 'lodash';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import type Web3 from 'web3';

import { pinFile, pinJson } from '../../../../api/ipfs';
import { NFTLevels, NFTMetadata } from '../../../../api/models/nft';
import { addresses, CONSTANTS } from '../../../../assets';
import marketPlaceAbi from '../../../../assets/abis/Marketplace.json';
import Filled_CTA_Button from '../../../../components/Button/CTA/Filled';
import FileContainer from '../../../../components/Collections/FileContainer';
import ConnectWallet from '../../../../components/ConnectWallet';
import MainFooter from '../../../../components/Footer';
import Navbar from '../../../../components/Navbar';
import { useWeb3Context } from '../../../../contexts/web3';
import { usePageQuery } from '../../../../hooks/query';

type Props = {};

const MainContainer = styled.div`
  background: #0c0c0c;
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavbarContainer = styled.div`
  width: 100%;
`;

const ColoredBackground = styled.div`
  width: 600px;
  height: 100vh;
  background: url('/objects/marketplaceObjects.svg') no-repeat;
  position: absolute;
  background-size: contain;
  top: -5%;
  right: 0%;
  z-index: 0;
  @media screen and (max-width: 760px) {
    width: 300px;
    height: 100vh;
  }
`;

const ParentExploreAndData = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  z-index: 2;
  width: 100%;
  min-width: 1000px;

  @media screen and (max-width: 760px) {
    width: 90%;
    margin: 0 auto;
    min-width: 90%;
    padding-bottom: 50px;
  }

  .title {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #ebf8ff;
    margin-top: 80px;

    @media screen and (max-width: 760px) {
      text-align: flex-start;
      font-size: 2rem;
      line-height: 3rem;
      margin-top: 40px;
      margin-bottom: -30px;
    }
    @media screen and (max-width: 320px) {
      font-size: 1.5rem;
    }
  }

  .white-text {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #ebf8ff;
    margin-top: 53px;
  }

  .text {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #ebf8ff;
    margin-top: 11px;
  }

  .blue {
    color: #5c95ff;
  }

  .heading {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 800;
    font-size: 16px;
    line-height: 19px;
    color: #ebf8ff;
    margin-top: 58px;
  }

  .input-div {
    margin-top: 27px;
    width: 468px;
    height: 38px;
    border: 1.5px solid #5c95ff;
    border-radius: 4px;

    .inp {
      height: 38px;
      border: none;
      width: 468px;
      outline: none;
      background: transparent;
      padding-left: 16px;
      color: rgba(255, 255, 255, 0.58);
    }
    @media screen and (max-width: 760px) {
      width: 100%;
      .inp {
        width: 100%;
      }
    }
  }

  .input-div-small {
    margin-top: 11px;
    width: 468px;
    height: 38px;
    border: 1.5px solid #5c95ff;
    border-radius: 4px;

    .inp {
      height: 38px;
      border: none;
      width: 468px;
      outline: none;
      background: transparent;
      padding: 16px;
      color: rgba(255, 255, 255, 0.58);
      font-size: 12px;
    }
    @media screen and (max-width: 760px) {
      width: 100%;
      .inp {
        width: 100%;
      }
    }
  }

  .text-area {
    border: 1.5px solid #5c95ff;
    border-radius: 4px;
    width: 468px;
    height: 184px;
    margin-top: 26px;
    @media screen and (max-width: 760px) {
      width: 100%;
    }
    .real-text-area {
      width: 100%;
      height: 100%;
      background: transparent;
      border: none;
      outline: none;
      resize: none;

      font-family: 'Rubik';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: rgba(255, 255, 255, 0.58);
      padding-left: 16px;
      padding-right: 16px;
      padding-top: 12px;
      padding-bottom: 12px;
    }
  }

  .dropdown-cont {
    display: flex;
    flex-direction: row;
    gap: 27px;
  }

  .switch-cont {
    display: flex;
    flex-direction: row;
    width: 400px;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 760px) {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;

      .switch-count-one {
        display: flex;
        flex-direction: row !important;
        gap: 10px;
      }
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 32.2px;
      height: 21px;
      color: #fff;
      padding: 3px;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #373943;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    .slider:before {
      position: absolute;
      content: '';
      height: 15.4px;
      width: 15.4px;
      left: 4px;
      bottom: 2.8px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    input:checked + .slider {
      background-color: #59981a;
    }

    input:focus + .slider {
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(8px);
      -ms-transform: translateX(8px);
      transform: translateX(8px);
    }

    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
  }

  margin-bottom: 50px;
`;

const Heading = styled.div`
  margin-top: ${(props: { top: string }) => (props.top ? props.top : '58px')};
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #ebf8ff;
`;

const StyledExploreNft = styled.img`
  height: 500px;
  width: 97px;
  position: absolute;
  left: 0;
  top: 100px;
  object-fit: contain;
  @media screen and (max-width: 760px) {
    display: none;
  }
`;

const NoItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export default function NewNFT({}: Props) {
  const { account, library, chainId, explorerUrl, active } = useWeb3Context();
  const [avatarImage, setAvatarImage] = useState<any>(null);
  const [traitsIDs, setTraitsIDs] = useState<string[]>([uuid()]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tip, setTip] = useState<string>('');
  const [collection, setCollection] = useState<string>('');
  const [mintFor, setMintFor] = useState<string>('');

  const { id } = usePageQuery();

  const [nftMetadata, setNftMetadata] = useState<Omit<NFTMetadata, 'image'>>({
    name: '',
    owner: account as string,
    description: '',
    traits: [],
    levels: [],
    externalLink: '',
    isExplicit: false
  });

  const setProperty = (e: any) => {
    setNftMetadata(metadata => ({ ...metadata, [e.target.name]: e.target.value }));
  };

  const allConditionsSatisfied = (): boolean => {
    return (
      !!avatarImage &&
      nftMetadata.name.length >= 7 &&
      ((!ethAddress.isAddress(nftMetadata.owner) && nftMetadata.owner.length >= 4) ||
        ethAddress.isAddress(nftMetadata.owner)) &&
      nftMetadata.traits.length > 0 &&
      nftMetadata.levels.length > 0 &&
      ethAddress.isAddress(mintFor)
    );
  };

  const resetAllFields = () => {
    setNftMetadata({
      name: '',
      owner: '',
      description: '',
      traits: [],
      levels: [],
      externalLink: '',
      isExplicit: false
    });
    setAvatarImage(null);
  };

  const mintNFT = async () => {
    try {
      const formData = new FormData();
      formData.append('file', avatarImage.file);

      if (allConditionsSatisfied()) {
        setIsLoading(true);
        setTip('Pinning avatar to IPFS');

        const avatarPinningResponse = await pinFile(formData);

        setTip('Pinning metadata to IPFS');
        const jsonPinningResponse = await pinJson({
          ...nftMetadata,
          image: avatarPinningResponse.response.fileURI
        });

        const contract = new (library as Web3).eth.Contract(marketPlaceAbi as any, addresses[chainId as number]);

        setTip('Now minting asset');
        const nftMintingResponse = await contract.methods
          .mintNFT(collection, jsonPinningResponse.response.itemURI, mintFor)
          .send({
            from: account,
            value: CONSTANTS.feesPerNetwork[chainId as number].nftMintFee.toHexString()
          });

        resetAllFields();
        message.success(
          <>
            <span style={{ fontSize: 15 }}>NFT successfully minted!</span>{' '}
            <a
              style={{ fontSize: 15, textDecoration: 'none', color: '#6d00c1' }}
              href={explorerUrl.concat('tx/' + nftMintingResponse.transactionHash)}
              target="_blank"
              rel="noreferrer"
            >
              View on explorer!
            </a>
          </>,
          3
        );
      }

      setIsLoading(false);
      setTip('');
    } catch (e: any) {
      setIsLoading(false);
      message.error(e.message);
    }
  };

  useEffect(() => {
    if (!!id) setCollection(id as string);
  }, [id]);

  return (
    <>
      <Head>
        <title>Mint an NFT</title>
      </Head>
      <MainContainer>
        <NavbarContainer>
          <Navbar />
        </NavbarContainer>
        <Spin spinning={isLoading} tip={tip} size="large">
          <ParentExploreAndData>
            {!active ? (
              // <NoItemContainer>
              //   <div style={{ marginTop: '10em' }}>
              //     <span style={{ color: '#dc143c', fontSize: 30 }}>Please connect your wallet!</span>
              //   </div>
              // </NoItemContainer>
              <ConnectWallet />
            ) : (
              <>
                <div className="container__wrapper">
                  <div className="title">Mint your NFT.</div>

                  <Heading top={'31px'}>
                    Avatar <span className="blue">*</span>
                  </Heading>

                  <div className="text">
                    Supported File Types: JPG, JPEG, PNG, GIF, WEBP
                    <span className="blue"> Max size 15MB</span>
                  </div>

                  <FileContainer file={avatarImage} setFile={setAvatarImage} type={2} />

                  <Heading className="heading">
                    Name<span className="blue">*</span>
                  </Heading>

                  <div className="text">
                    Must contain at least <span className="blue">7</span> characters.
                  </div>

                  <div className="input-div">
                    <input
                      type="text"
                      value={nftMetadata.name}
                      onChange={setProperty}
                      name="name"
                      className="inp"
                      placeholder="Name of this asset."
                    />
                  </div>

                  <Heading className="heading">
                    Creator<span className="blue">*</span>
                  </Heading>

                  <div className="text">
                    Must contain at least <span className="blue">4</span> characters if it is an ENS name.
                  </div>

                  <div className="input-div">
                    <input
                      type="text"
                      value={nftMetadata.owner}
                      onChange={setProperty}
                      name="owner"
                      className="inp"
                      placeholder="Creator of this asset (can be an Ethereum address or an ENS name)."
                    />
                  </div>

                  <Heading className="heading">
                    For<span className="blue">*</span>
                  </Heading>

                  <div className="text">Address that this NFT is minted for.</div>

                  <div className="input-div">
                    <input
                      type="text"
                      value={mintFor}
                      onChange={e => setMintFor(e.target.value)}
                      name="owner"
                      className="inp"
                      placeholder="Address this asset is being minted for."
                    />
                  </div>

                  <Heading top="27px">External URL</Heading>

                  <div className="input-div">
                    <input
                      value={nftMetadata.externalLink}
                      onChange={setProperty}
                      name="externalLink"
                      type="text"
                      className="inp"
                      placeholder="An external URL containing more information about this asset."
                    />
                  </div>

                  <Heading top="27px">Description</Heading>

                  <div className="text-area">
                    <textarea
                      className="real-text-area"
                      id=""
                      placeholder="Provide a detailed description of your item."
                      rows={7}
                      value={nftMetadata.description}
                      onChange={setProperty}
                      name="description"
                    ></textarea>
                  </div>

                  <Heading top="27px">Levels</Heading>

                  <div className="switch-cont">
                    <div className="text">Set this item's levels</div>

                    {_.map(Object.values(NFTLevels).sort(), val => (
                      <div
                        key={val}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexDirection: 'column',
                          margin: 2
                        }}
                        className="switch-count-one"
                      >
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={nftMetadata.levels.includes(val)}
                            onChange={() => {
                              if (!nftMetadata.levels.includes(val))
                                setNftMetadata({ ...nftMetadata, levels: [...nftMetadata.levels, val] });
                              else
                                setNftMetadata({
                                  ...nftMetadata,
                                  levels: nftMetadata.levels.filter(level => level !== val)
                                });
                            }}
                          />
                          <span className="slider round"></span>
                        </label>
                        <span className="blue" style={{ fontSize: 12 }}>
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Heading top="27px">
                    Traits<span className="blue">*</span>
                  </Heading>
                  <div className="text">Set this item's traits.</div>

                  <div
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 10 }}
                  >
                    <div style={{ flexBasis: '90%', flexGrow: 1 }}>
                      {_.map(traitsIDs, (id, index) => (
                        <div className="input-div" key={id} style={{ width: 200 }}>
                          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div style={{ flexBasis: '90%', flexGrow: 1 }}>
                              <input
                                value={nftMetadata.traits[index]}
                                onChange={event => {
                                  const traits = nftMetadata.traits;
                                  traits[index] = event.target.value;
                                  setNftMetadata({ ...nftMetadata, traits });
                                }}
                                name={`trait-${id}`}
                                type="text"
                                className="inp"
                                style={{ width: 'inherit' }}
                                placeholder="Enter trait."
                              />
                            </div>
                            <div style={{ flexBasis: '5%', flexGrow: 1 }}></div>
                            <div style={{ flexBasis: '5%', flexGrow: 1, marginLeft: 10 }}>
                              <Filled_CTA_Button
                                disabled={traitsIDs.length === 1}
                                style={{
                                  textAlign: 'center',
                                  width: 25,
                                  height: 25,
                                  fontSize: 17,
                                  padding: 4,
                                  background: traitsIDs.length === 1 ? 'grey' : undefined
                                }}
                                onClick={() => {
                                  setTraitsIDs(traitsIDs.filter(val => val !== id));
                                  const traits = nftMetadata.traits;
                                  traits.splice(index, 1);
                                  setNftMetadata({ ...nftMetadata, traits });
                                }}
                              >
                                <FaMinus />
                              </Filled_CTA_Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ flexBasis: '5%', flexGrow: 1 }}></div>
                    <div style={{ flexBasis: '5%', flexGrow: 1, marginTop: 10 }}>
                      <Filled_CTA_Button
                        onClick={() => setTraitsIDs([...traitsIDs, uuid()])}
                        style={{ textAlign: 'center', width: 25, height: 25, fontSize: 17, padding: 4 }}
                      >
                        <FaPlus />
                      </Filled_CTA_Button>
                    </div>
                  </div>

                  <Heading top={'52px'}>Explicit and sensitive content</Heading>

                  <div className="switch-cont">
                    <div className="text">Set this collection as explicit and sensitive content</div>

                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={nftMetadata.isExplicit}
                        onChange={() => setNftMetadata({ ...nftMetadata, isExplicit: !nftMetadata.isExplicit })}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <Filled_CTA_Button disabled={!allConditionsSatisfied()} onClick={mintNFT} style={{ marginTop: 33 }}>
                    {allConditionsSatisfied() ? 'Create' : 'Please fill in all required fields correctly'}
                  </Filled_CTA_Button>
                </div>{' '}
              </>
            )}{' '}
          </ParentExploreAndData>
        </Spin>
        <StyledExploreNft src="/icons/exploreNFT.png" />
        <ColoredBackground></ColoredBackground>
      </MainContainer>
      <MainFooter />
    </>
  );
}
