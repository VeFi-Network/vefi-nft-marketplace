import Head from 'next/head';
import React from 'react';

import MainFooter from '../components/Footer';
import Navbar from '../components/Navbar';
import Privacy from '../components/PrivacyPolicy';
import { Container } from '../styles/privacy.styled';

function Privacypolicy() {
  return (
    <>
      <Head>
        <title>Vefi NFT marketplace | Create and trade various non-fungible assets</title>
      </Head>
      <Container>
        <Navbar />
        <Privacy />
        <MainFooter />
      </Container>
    </>
  );
}

export default Privacypolicy;
