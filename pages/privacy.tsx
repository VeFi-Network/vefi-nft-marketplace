import Head from 'next/head';
import React, { useEffect } from 'react';

import MainFooter from '../components/Footer';
import Navbar from '../components/Navbar';
import Privacy from '../components/PrivacyPolicy';
import { Container } from '../styles/privacy.styled';

function Privacypolicy() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);
  return (
    <>
      <Head>
        <title>Vefi NFT marketplace | Privacy Policy</title>
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
