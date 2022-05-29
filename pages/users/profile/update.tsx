// @ts-ignore
import * as emailValidator from 'react-email-validator';
import styled from 'styled-components';
import Navbar from '../../../components/Navbar';
// import Button from '../../../components/Button/CTA/Filled';
import Image from 'next/image';
import { Button, message, Spin } from 'antd';
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import { pinJson } from '../../../api/ipfs';
import { AccountMetadata } from '../../../api/models/account';
import { updateAccount } from '../../../api/nft';
import { useAPIContext } from '../../../contexts/api';
import { useWeb3Context } from '../../../contexts/web3';

const RootContainer = styled.div`
  min-width: 100%;
  background: #0c0c0c;
`;

const NavContainer = styled.div`
  max-width: 100%;
`;

const Container = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: center;
  div {
    width: 70%;
    @media screen and (max-width: 760px) {
      width: 100%;
      padding: 0 10px;
    }
  }
`;

const BodyContainer = styled.div`
  min-height: 100vh;
  button:disabled {
    background-color: #5c95ff;
    color: #fff;
  }

  @media screen and (max-width: 760px) {
    button {
      margin: 20px 10px;
      width: 95%;
    }
    .ant-btn-lg {
      height: 60px !important;
    }
  }
`;

const Heading = styled.h2`
  color: #fff;
  margin-top: 40px;
  @media screen and (max-width: 760px) {
    width: 100%;
    display: flex;
    margin-top: 40px;
    padding: 0 20px;
  }
`;

const FormContainer = styled.div`
  max-width: 100%;
`;

const Form = styled.form`
  margin-top: 3rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  max-width: auto;
  margin: 1.5rem 0;
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;

const Label = styled.label`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  sup {
    color: #5c95ff;
  }
`;

const InputText = styled.input`
  border: 1.5px solid #5c95ff;
  border-radius: 4px;
  background-color: transparent;
  height: 2.2rem;
  width: 100%;
  color: #fff;
  padding: 5px;
  @media screen and (max-width: 760px) {
    width: 100%;
    height: 2.5rem;
  }
`;

const ExploreNFT = styled.div`
  position: absolute;
  top: 7rem;
  left: 10px;
  img {
    width: 50px !important ;
    height: 500px !important;
  }
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

const UpdateProfile = () => {
  const { active, account } = useWeb3Context();
  const { loadToken, token, authenticatedUser } = useAPIContext();
  const [email, setEmail] = useState<string>('');
  const router = useRouter();

  const [accountMetadata, setAccountMetadata] = useState<AccountMetadata>({
    name: '',
    bannerURI: '',
    imageURI: ''
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetAllFields = useCallback(() => {
    setAccountMetadata({
      name: '',
      bannerURI: '',
      imageURI: ''
    });
    setEmail('');
  }, []);

  const allConditionsSatisfied = (): boolean =>
    accountMetadata.name.length > 0 ||
    accountMetadata.bannerURI.length > 0 ||
    accountMetadata.imageURI.length > 0 ||
    (email.length > 0 && emailValidator.validate(email));

  const setProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountMetadata(metadata => ({ ...metadata, [e.target.name]: e.target.value }));
  };

  const update = async (e: any) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (allConditionsSatisfied()) {
        let composedMetadata: any = {};

        const keys = Object.keys(accountMetadata);

        for (const key of keys)
          if (
            !!accountMetadata[key as keyof AccountMetadata] &&
            accountMetadata[key as keyof AccountMetadata].length > 0
          )
            composedMetadata = { ...composedMetadata, [key]: accountMetadata[key as keyof AccountMetadata] };

        if (email.length > 0) composedMetadata = { ...composedMetadata, email };

        if (!composedMetadata.bannerURI || composedMetadata.bannerURI.length === 0) {
          composedMetadata = { ...composedMetadata, bannerURI: authenticatedUser?.metadata.bannerURI };
        }

        if (!composedMetadata.imageURI || composedMetadata.imageURI.length === 0) {
          composedMetadata = { ...composedMetadata, imageURI: authenticatedUser?.metadata.imageURI };
        }

        if (!composedMetadata.name || composedMetadata.name.length === 0) {
          composedMetadata = { ...composedMetadata, name: authenticatedUser?.metadata.name };
        }

        const jsonResponse = await pinJson({ ...composedMetadata, email: undefined });

        await updateAccount(
          {
            ...composedMetadata,
            bannerURI: undefined,
            imageURI: undefined,
            metadataURI: jsonResponse.response.itemURI
          },
          token
        );
        loadToken(account as string);
        router.replace('/');
      }
      setIsLoading(false);
      resetAllFields();
    } catch (error: any) {
      setIsLoading(false);
      message.error(error.message);
    }
  };

  return (
    <>
      <RootContainer>
        <NavContainer>
          <Navbar />
        </NavContainer>
        <BodyContainer>
          <ExploreNFT>
            <Image width="97px" height="585px" src="/icons/exploreNFT.png" />
          </ExploreNFT>
          <Container>
            {!active ? (
              <NoItemContainer>
                <div style={{ marginTop: '10em' }}>
                  <span style={{ color: '#dc143c', fontSize: 30 }}>Please connect your wallet!</span>
                </div>
              </NoItemContainer>
            ) : (
              <div>
                <Heading>Update Profile</Heading>
                <FormContainer>
                  <Form onSubmit={update} autoComplete="off">
                    <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      <InputText name="name" onChange={setProperty} type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="email">Email Address</Label>
                      <InputText
                        name="email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        type="email"
                        autoComplete="off"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="profile_image">Profile Image URL</Label>
                      <InputText name="imageURI" onChange={setProperty} type="text" />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="banner_image">Banner Image URL</Label>
                      <InputText name="bannerURI" onChange={setProperty} type="text" />
                    </FormGroup>
                    {/* <Button disabled={!allConditionsSatisfied()} type="submit" loading={isLoading}>
                      {allConditionsSatisfied() ? 'Update' : 'Please fill in details properly'}{' '}
                      <Spin spinning={isLoading} />
                    </Button> */}
                    <Button
                      type="primary"
                      size="large"
                      disabled={!allConditionsSatisfied() || isLoading}
                      loading={isLoading}
                    >
                      {allConditionsSatisfied() ? 'Update Profile' : 'Please fill in details properly'}{' '}
                    </Button>
                  </Form>
                </FormContainer>
              </div>
            )}
          </Container>
        </BodyContainer>
      </RootContainer>
    </>
  );
};

export default UpdateProfile;
