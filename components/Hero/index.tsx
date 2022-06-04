import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Image from 'next/image';
import React from 'react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Bridge from '../../public/icons/bridge.png';
import HeroImg from '../../public/icons/hero_image.png';
import Wallet from '../../public/icons/hero_wallet.png';
import Mint from '../../public/icons/mint.png';
import PriceTag from '../../public/icons/price-tag.svg';
import { Container } from '../../styles/hero.styled';

function Hero() {
  return (
    <Container>
      <h3>Create and sell your NFTs.</h3>
      <div className="slider_con">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          breakpoints={{
            1024: {
              width: 1024,
              slidesPerView: 3
            },
            900: {
              width: 900,
              slidesPerView: 3
            },
            768: {
              width: 768,
              slidesPerView: 1
            }
          }}
          //  navigation
          pagination={{ clickable: true }}
          //  onSlideChange={() => console.log('slide change')}
          onSwiper={swiper => console.log(swiper)}
        >
          <SwiperSlide>
            <div className="slider_item_container">
              <div className="image">
                <Image src={Wallet} height={40} width={40} />
              </div>
              <div className="title">Setup Wallet</div>
              <div className="content">
                Connect to the Vefi NFT marketplace using a wallet of choice. Sign transactions and messages and get
                authenticated.
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slider_item_container">
              <div className="image">
                <Image src={HeroImg} height={50} width={60} />
              </div>
              <div className="title">Make money from collections</div>
              <div className="content">
                Create and customize collections. Get a percentage of fees for every time an NFT is minted in your
                collection.
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slider_item_container">
              <div className="image">
                <Image src={PriceTag} height={50} width={50} />
              </div>
              <div className="title">Mint & sell NFTs</div>
              <div className="content">
                Create NFTs in any collection of your choice. Sell your NFTs in the marketplace for a token and price of
                choice. Make money from as much NFTs as possible.
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slider_item_container">
              <div className="image">
                <Image src={Bridge} height={40} width={45} />
              </div>
              <div className="title">Bridge your NFTs</div>
              <div className="content">Transfer your NFTs across chains using an underlying bridging technology.</div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slider_item_container">
              <div className="image">
                <Image src={Mint} height={50} width={70} />
              </div>
              <div className="title">Get minting discounts for holding VEFs</div>
              <div className="content">
                You get some discount to mint NFTs or collections if you hold a certain amount of the VEF token.
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </Container>
  );
}

const carouselArray = [
  {
    image: Wallet,
    title: 'Setup Wallet',
    content:
      'Connect to the Vefi NFT marketplace using a wallet of choice. Sign transactions and messages and get authenticated.'
  },
  {
    image: PriceTag,
    title: 'Setup Wallet',
    content:
      'Connect to the Vefi NFT marketplace using a wallet of choice. Sign transactions and messages and get authenticated.'
  },
  {
    image: PriceTag,
    title: 'Setup Wallet',
    content:
      'Connect to the Vefi NFT marketplace using a wallet of choice. Sign transactions and messages and get authenticated.'
  },
  {
    image: PriceTag,
    title: 'Setup Wallet',
    content:
      'Connect to the Vefi NFT marketplace using a wallet of choice. Sign transactions and messages and get authenticated.'
  }
];

export default Hero;

// responsive: [
//   {
//     breakpoint: 1024,
//     settings: {
//       slidesToShow: 3,
//       slidesToScroll: 3,
//       infinite: true,
//       dots: true
//     }
//   },
//   {
//     breakpoint: 600,
//     settings: {
//       slidesToShow: 2,
//       slidesToScroll: 2,
//       initialSlide: 2
//     }
//   },
//   {
//     breakpoint: 480,
//     settings: {
//       slidesToShow: 1,
//       slidesToScroll: 1
//     }
//   }
// ]
