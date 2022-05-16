import { Button, Modal } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { BridgeBackground, BridgeContainer } from '../styles/bridge.styled';
import { SectionWrapper } from '../styles/createCollections.styled';

const Bridge = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <SectionWrapper>
        <Navbar />
        <BridgeBackground>
          <div className="exploreNft"></div>
          <div className="bg__left"></div>
          <BridgeContainer>
            <div className="container">
              <div className="heading">
                <h2>
                  Transfer Nfts <br />
                  between Blockchains
                </h2>
              </div>
              <div className="container__wrapper" onClick={() => setIsModalVisible(!isModalVisible)}>
                <div className="list__wrapper">
                  <div className="list__logo">
                    <Image src="/logo/eth.jpg" width={30} height={30} alt="image" />
                  </div>
                  <div className="list__text">Departure chain</div>
                  <div className="list__icon">
                    <FaChevronDown />
                  </div>
                </div>

                <div className="list__switch">
                  <Image src="/icons/toggle.png" width={10} height={20} alt="toggle" />
                </div>
                <div className="list__wrapper" onClick={() => setIsModalVisible(!isModalVisible)}>
                  <div className="list__logo">
                    <Image src="/logo/eth.jpg" width={30} height={30} alt="image" />
                  </div>
                  <div className="list__text">Destination chain</div>
                  <div className="list__icon">
                    <FaChevronDown />
                  </div>
                </div>
              </div>
              <div className="button__wrapper">
                <Button type="primary">
                  Continue Bridging <FaArrowRight className="btn__icon" />
                </Button>
              </div>
            </div>
          </BridgeContainer>
        </BridgeBackground>
      </SectionWrapper>
      <Modal
        visible={isModalVisible}
        onOk={() => setIsModalVisible(!isModalVisible)}
        width={350}
        wrapClassName="select__chain__wrap"
        onCancel={() => setIsModalVisible(!isModalVisible)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default Bridge;
