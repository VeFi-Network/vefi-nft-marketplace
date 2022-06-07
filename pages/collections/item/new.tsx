import { message, Spin } from 'antd';
// @ts-ignore
import ethAddress from 'ethereum-address';
import Head from 'next/head';
import React, { useState } from 'react';
import styled from 'styled-components';
import type Web3 from 'web3';

import { pinFile, pinJson } from '../../../api/ipfs';
import { CollectionCategory, CollectionMetadata } from '../../../api/models/collection';
import { addresses, CONSTANTS } from '../../../assets';
import marketPlaceAbi from '../../../assets/abis/Marketplace.json';
import Filled_CTA_Button from '../../../components/Button/CTA/Filled';
import DropdownComponent from '../../../components/Collections/Dropdown';
import FileContainer from '../../../components/Collections/FileContainer';
import ConnectWallet from '../../../components/ConnectWallet';
import MainFooter from '../../../components/Footer';
import Navbar from '../../../components/Navbar';
import { useAPIContext } from '../../../contexts/api';
import { useWeb3Context } from '../../../contexts/web3';

type Props = {};

const MainContainer = styled.div`
  background: #0c0c0c;
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

  @media screen and (max-width: 760px) {
  }
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
    font-size: 2.5rem;
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

  .switch-cont {
    display: flex;
    flex-direction: row;
    width: 400px;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 760px) {
      flex-direction: column;
      width: 100%;
      align-items: flex-start;
      row-gap: 10px;
    }
    .switch {
      position: relative;
      display: inline-block;
      width: 32.2px;
      height: 21px;
      @media screen and (max-width: 760px) {
        width: 10%;
      }
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

  .dropdown {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 10px;
    gap: 11px;
    background: #373943;
    border-radius: 11px;
    width: 155.73px;
    height: 37px;
    cursor: pointer;

    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    margin-top: 21px;

    color: #5c95ff;
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

  @media screen and (max-width: 760px) {
    height: 100vh;
  }
`;

export default function NewCollection({}: Props) {
  const { active, library, chainId, explorerUrl, account } = useWeb3Context();
  const { authenticatedUser } = useAPIContext();

  const [bannerImage, setBannerImage] = useState<any>(null);
  const [avatarImage, setAvatarImage] = useState<any>(null);
  const [dropdownShown, setDropdownShown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tip, setTip] = useState<string>('');
  const [paymentReceiver, setPaymentReceiver] = useState<string>('');

  const [collectionMetadata, setCollectionMetadata] = useState<Omit<Omit<CollectionMetadata, 'imageURI'>, 'bannerURI'>>(
    {
      name: '',
      owner: !!authenticatedUser ? authenticatedUser.name : (account as string),
      category: CollectionCategory.ART,
      description: '',
      symbol: '',
      hasExplicitContent: false
    }
  );

  const setProperty = (e: any) => {
    setCollectionMetadata({ ...collectionMetadata, [e.target.name]: e.target.value });
  };

  const allConditionsSatisfied = (): boolean => {
    return (
      !!bannerImage &&
      !!avatarImage &&
      !!collectionMetadata.name &&
      !!collectionMetadata.owner &&
      !!collectionMetadata.category &&
      !!collectionMetadata.symbol &&
      collectionMetadata.name.length >= 7 &&
      ((!ethAddress.isAddress(collectionMetadata.owner) && collectionMetadata.owner.length >= 4) ||
        ethAddress.isAddress(collectionMetadata.owner)) &&
      collectionMetadata.symbol.length >= 3 &&
      ethAddress.isAddress(paymentReceiver)
    );
  };

  const resetAllFields = () => {
    setCollectionMetadata({
      name: '',
      owner: '',
      description: '',
      category: CollectionCategory.ART,
      symbol: '',
      hasExplicitContent: false
    });
    setBannerImage(null);
    setAvatarImage(null);
  };

  const createCollection = async () => {
    try {
      setIsLoading(true);
      const bannerFormData = new FormData();

      // Append the banner file to the form data.
      bannerFormData.append('file', bannerImage.file);

      // Pin file to IPFS
      setTip('Pinning banner to IPFS');
      const bannerPinningResponse = await pinFile(bannerFormData);

      const avatarFormData = new FormData();

      // Append the avatar file to the form data.
      avatarFormData.append('file', avatarImage.file);

      // Pin file to IPFS
      setTip('Pinning avatar to IPFS');
      const avatarPinningResponse = await pinFile(avatarFormData);

      if (allConditionsSatisfied()) {
        setTip('Pinning metadata to IPFS');
        const jsonPinningResponse = await pinJson({
          ...collectionMetadata,
          imageURI: avatarPinningResponse.response.fileURI,
          bannerURI: bannerPinningResponse.response.fileURI
        });

        const contract = new (library as Web3).eth.Contract(marketPlaceAbi as any, addresses[chainId as number]);

        setTip('Deploying collection contract.');

        const deploymentResponse = await contract.methods
          .deployCollection(
            collectionMetadata.name,
            collectionMetadata.symbol,
            collectionMetadata.category,
            paymentReceiver,
            jsonPinningResponse.response.itemURI
          )
          .send({
            value: CONSTANTS.feesPerNetwork[chainId as number].collectionDeployFee.toHexString(),
            from: account
          });

        resetAllFields();
        message.success(
          <>
            <span style={{ fontSize: 15 }}>Collection successfully deployed!</span>{' '}
            <a
              style={{ fontSize: 15, textDecoration: 'none', color: '#6d00c1' }}
              href={explorerUrl.concat('tx/' + deploymentResponse.transactionHash)}
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
    } catch (error: any) {
      setIsLoading(false);
      message.error(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Create new collection</title>
      </Head>
      <MainContainer>
        <NavbarContainer>
          <Navbar />
        </NavbarContainer>
        <Spin spinning={isLoading} size="large" tip={tip}>
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
                  <div className="title">Create New Collection</div>
                  <Heading className="heading">
                    Collection Banner <span className="blue">*</span>
                  </Heading>
                  <div className="text">
                    Supported File Types: JPG, JPEG, PNG, GIF, WEBP
                    <span className="blue"> Max size 15MB</span>
                  </div>
                  <FileContainer file={bannerImage} setFile={setBannerImage} type={1} />
                  <Heading className="heading">
                    Collection Avatar <span className="blue">*</span>
                  </Heading>
                  <div className="text">
                    Supported File Types: JPG, JPEG, PNG, GIF, WEBP
                    <span className="blue"> Max size 15MB</span>
                  </div>
                  <FileContainer file={avatarImage} setFile={setAvatarImage} type={1} />
                  <Heading className="heading">
                    Name<span className="blue">*</span>
                  </Heading>
                  <div className="text">
                    Name of this collection. Must contain at least <span className="blue">7</span> characters.
                  </div>
                  <div className="input-div">
                    <input
                      value={collectionMetadata.name}
                      name="name"
                      onChange={setProperty}
                      type="text"
                      className="inp"
                      placeholder="Name of your collection"
                    />
                  </div>
                  <Heading className="heading">
                    Owner<span className="blue">*</span>
                  </Heading>
                  <div className="text">
                    Owner of this collection. Must contain at least <span className="blue">4</span> characters if it is
                    an ENS name.
                  </div>
                  <div className="input-div">
                    <input
                      type="text"
                      value={collectionMetadata.owner}
                      onChange={setProperty}
                      name="owner"
                      className="inp"
                      placeholder="Owner of this collection (Could be an Ethereum address or an ENS name)."
                    />
                  </div>
                  <Heading className="heading">
                    Symbol (<span style={{ fontSize: '0.6rem' }}>Min of 3 Characters</span>)
                    <span className="blue">*</span>
                  </Heading>

                  <div className="input-div">
                    <input
                      type="text"
                      value={collectionMetadata.symbol}
                      onChange={setProperty}
                      name="symbol"
                      className="inp"
                      placeholder="Collection symbol."
                    />
                  </div>
                  <Heading className="heading">
                    Payment Receiver<span className="blue">*</span>
                  </Heading>

                  <div className="input-div">
                    <input
                      type="text"
                      value={paymentReceiver}
                      onChange={e => setPaymentReceiver(e.target.value)}
                      name="symbol"
                      className="inp"
                      placeholder="Address that receives minting fees."
                    />
                  </div>
                  <Heading top={'48px'} className="heading">
                    Description<span className="blue">*</span>
                  </Heading>

                  <div className="text">Describe your collection.</div>
                  <div className="text-area">
                    <textarea
                      className="real-text-area"
                      id=""
                      placeholder="Provide a detailed description of your collection."
                      rows={7}
                      value={collectionMetadata.description}
                      onChange={setProperty}
                      name="description"
                    ></textarea>
                  </div>
                  <Heading top={'38px'} className="heading">
                    Collection Category
                  </Heading>

                  <div className="text">This is the category your collection belongs to.</div>
                  <DropdownComponent
                    dropdown={dropdownShown}
                    setDropdown={setDropdownShown}
                    value={collectionMetadata.category}
                    onChange={value => setCollectionMetadata({ ...collectionMetadata, category: value })}
                    dropDownList={Object.values(CollectionCategory).sort()}
                    defaultValue={collectionMetadata.category}
                    width={'155.78px'}
                    top={'36px'}
                  />
                  <Heading top={'36px'} className="heading">
                    Explicit and sensitive content.
                  </Heading>
                  <div className="switch-cont">
                    <div className="text">Set this collection as having explicit and sensitive content.</div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={collectionMetadata.hasExplicitContent}
                        onChange={() =>
                          setCollectionMetadata({
                            ...collectionMetadata,
                            hasExplicitContent: !collectionMetadata.hasExplicitContent
                          })
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <Filled_CTA_Button
                    disabled={!allConditionsSatisfied()}
                    onClick={createCollection}
                    style={{ marginTop: 33 }}
                  >
                    {allConditionsSatisfied() ? 'Create' : 'Please fill in the required fields'}
                  </Filled_CTA_Button>
                </div>
              </>
            )}
          </ParentExploreAndData>
        </Spin>
        <StyledExploreNft src="/icons/exploreNFT.png" />
        <ColoredBackground></ColoredBackground>
      </MainContainer>
      <MainFooter />
    </>
  );
}
