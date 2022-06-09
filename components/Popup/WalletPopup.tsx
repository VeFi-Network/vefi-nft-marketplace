import { Modal } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import { FiChevronDown, FiPlus } from 'react-icons/fi';

const WalletPopup = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className="wallet__body">
          <div className="wallet__header">
            <div className="wallet__setting">
              <div className="wallet__icon">
                <Image src="/icons/eth.svg" width={20} height={20} alt="wallet" />
              </div>
              <div className="wallet__setting__title">
                <span>My wallet </span>
              </div>
              <FiChevronDown />
            </div>
            <div className="wallet__connected__account">
              <div className="chain__logo">
                <Image src="/icons/eth.svg" width={20} height={20} alt="wallet" />
              </div>
              <div className="chain__id">
                <span>0x6234...</span>
              </div>
            </div>
          </div>
          <div className="wallet__content">
            <div className="wallet__balance">
              <span className="wallet__balance__heading">Total balance</span>
              <div className="wallet__balance__amt">$2,300.34 USD</div>
            </div>
            <div className="wallet__balance__btn">
              <span className="icon">
                <FiPlus />
              </span>
              <span className="btn__text">Add to Balance</span>
            </div>
          </div>
          <div className="wallet__accounts">
            <div className="wallet__account__container">
              <div className="wallet__account__balance">
                <div className="account__balance__info">
                  <div className="wallet__account__logo">
                    <Image src="/icons/eth.svg" width={20} height={20} alt="wallet" />
                  </div>
                  <div className="wallet__account__info">
                    <div className="chain__name">Eth</div>
                    <div className="source__account">Vefi wallet</div>
                  </div>
                </div>
                <div className="account__balance__info__right">
                  <div className="chain__name__amount">2.54</div>
                  <div className="source__account__amount">$3000 USD</div>
                </div>
              </div>
            </div>
            <div className="wallet__account__container">
              <div className="wallet__account__balance">
                <div className="account__balance__info">
                  <div className="wallet__account__logo">
                    <Image src="/icons/eth.svg" width={20} height={20} alt="wallet" />
                  </div>
                  <div className="wallet__account__info">
                    <div className="chain__name">VEF</div>
                    <div className="source__account">Vefi wallet</div>
                  </div>
                </div>
                <div className="account__balance__info__right">
                  <div className="chain__name__amount">2.454</div>
                  <div className="source__account__amount">$3,000 USD</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WalletPopup;
