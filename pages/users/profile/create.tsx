// @ts-ignore
import * as emailValidator from 'react-email-validator';
import { message, Spin } from 'antd';
import styled from 'styled-components';
import Navbar from '../../../components/Navbar';
import Button from '../../../components/Button/CTA/Filled';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { AccountMetadata } from '../../../api/models/account';
import { useWeb3Context } from '../../../contexts/web3';
import { pinJson } from '../../../api/ipfs';
import { createAccount } from '../../../api/nft';
import { useAPIContext } from '../../../contexts/api';
import { useRouter } from 'next/router';

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
  }
`;

const BodyContainer = styled.div`
  min-height: 100vh;
`;

const Heading = styled.h2`
  color: #fff;
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
`;

const ExploreNFT = styled.div`
  position: absolute;
  top: 7rem;
  margin-left: 1rem;
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

const CreateProfile = () => {
  const { active, account } = useWeb3Context();
  const { loadToken } = useAPIContext();
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
    accountMetadata.name.length > 0 &&
    accountMetadata.bannerURI.length > 0 &&
    accountMetadata.imageURI.length > 0 &&
    email.length > 0 &&
    emailValidator.validate(email);

  const setProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountMetadata(metadata => ({ ...metadata, [e.target.name]: e.target.value }));
  };

  const create = async (e: any) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (allConditionsSatisfied()) {
        const jsonResponse = await pinJson(accountMetadata);
        await createAccount({
          name: accountMetadata.name,
          email,
          metadataURI: jsonResponse.response.itemURI,
          accountId: account
        });
        loadToken(account as string);
        resetAllFields();
        router.replace('/');
      }
      setIsLoading(false);
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
                <Heading>Create Profile</Heading>
                <FormContainer>
                  <Form onSubmit={create}>
                    <FormGroup>
                      <Label htmlFor="name">
                        Name<sup>*</sup>
                      </Label>
                      <InputText name="name" onChange={setProperty} type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="email">
                        Email Address<sup>*</sup>
                      </Label>
                      <InputText
                        name="email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        type="email"
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="profile_image">
                        Profile Image URL<sup>*</sup>
                      </Label>
                      <InputText name="imageURI" onChange={setProperty} type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="banner_image">
                        Banner Image URL<sup>*</sup>
                      </Label>
                      <InputText name="bannerURI" onChange={setProperty} type="text" required />
                    </FormGroup>
                    <Button disabled={!allConditionsSatisfied()} type="submit">
                      {allConditionsSatisfied() ? 'Create' : 'Please fill in all details properly'}{' '}
                      <Spin spinning={isLoading} />
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

export default CreateProfile;
