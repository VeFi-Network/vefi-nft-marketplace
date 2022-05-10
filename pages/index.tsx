import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Marketplace from './marketplace'

const Home: NextPage = () => {
  return (
    <Marketplace></Marketplace>
  )
}

export default Home
