import Image from 'next/image';
import styled from 'styled-components';
import { useState } from 'react';
import Link from 'next/link';
import { Drawer, Dropdown } from 'antd';
import { FiChevronDown, FiPlus } from 'react-icons/fi';
import menu from '../Profile/Menu';
import notification from '../Profile/Notification';

const NavContainer = styled.nav`
  max-width: 100%;
  display: flex;
  .navbar__container {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin: 0 50px;
    height: 60px;
  }
`;

const NavBrand = styled.div`
  padding: 0 10px;
  z-index: 2;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
  padding: 0 10px;
  .icon {
    background-color: #373943;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    transition-duration: 250ms;

    &:hover {
      transform: scale(1.1);
    }
  }
  z-index: 2;
`;
const UserWallet = styled.div`
  border-radius: 50%;
  .wallet_container {
    background-color: #373943;
    border-radius: 30px;
    cursor: pointer;
    color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 0.5rem;
    padding-right: 10px;

    transition-duration: 250ms;

    &:hover {
      transform: scale(1.05);
    }
  }
  .wallet_icon {
    background-color: #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  z-index: 2;
`;

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <NavContainer>
        <div className="navbar__container">
          <NavBrand>
            <Link href="/">
              <a>
                <Image src="/logo/vefi_nft_logo.svg" width={100} height={45} />
              </a>
            </Link>
          </NavBrand>
          <NavLinks>
            <div className="icon">
              <Image src="/icons/envelope.svg" width={15} height={15} />
            </div>

            <Dropdown overlay={menu} trigger={['click']} placement="bottom" arrow>
              <div className="icon">
                <Image src="/icons/notification.svg" width={15} height={15} />
              </div>
            </Dropdown>

            <div className="icon" onClick={() => setVisible(!visible)}>
              <Image src="/icons/wallet.svg" width={15} height={15} />
            </div>
            <UserWallet onClick={() => setVisible(!visible)}>
              <div className="wallet_container">
                <div className="wallet_icon">
                  <Image src="/icons/eth.svg" width={15} height={15} />
                </div>
                <div>0xF2255c5F4dd0a...</div>
              </div>
            </UserWallet>
          </NavLinks>
        </div>
      </NavContainer>
      <Drawer title="Basic Drawer" placement="right" onClose={() => setVisible(!visible)} visible={visible}>
        <div className="wallet__body">
          <div className="wallet__header">
            <div className="wallet__setting">
              <div className="wallet__icon">
                <Image src="/icons/eth.svg" width={20} height={20} alt="wallet" />
              </div>
              <div className="wallet__setting__title">
                <Dropdown overlay={menu} trigger={['click']}>
                  <a onClick={e => e.preventDefault()}>
                    <div style={{ color: 'var(--text-light)' }}>My Profile</div>
                  </a>
                </Dropdown>
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
      </Drawer>
    </>
  );
};

export default Navbar;
