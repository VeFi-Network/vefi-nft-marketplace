import Head from 'next/head'
import React from 'react'
import MainFooter from '../components/Footer'
import Navbar from '../components/Navbar'
import Terms from '../components/Terms'
import { Container } from '../styles/privacy.styled'

function TermsOfUse() {
  return (
    <>
    <Head>
      <title>Vefi NFT marketplace | Create and trade various non-fungible assets</title>
    </Head>
    <Container>
      <Navbar />
      <Terms/>
      <MainFooter/>
    </Container>
    </>
  )
}

export default TermsOfUse