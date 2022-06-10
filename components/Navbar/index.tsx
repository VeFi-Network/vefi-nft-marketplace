import { Alert, Button, Drawer, Dropdown, Tooltip } from 'antd';
import * as ethAddress from 'eth-address';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaEnvelope, FaWallet } from 'react-icons/fa';
import { FiChevronDown, FiMoreHorizontal, FiPlus, FiUser } from 'react-icons/fi';
import styled from 'styled-components';

import { useAPIContext } from '../../contexts/api';
import { useWeb3Context } from '../../contexts/web3';
import Menu from '../Profile/Menu';

const chainIcons = {
  97: '/icons/binance.svg',
  80001: '/icons/matic.svg',
  4: '/icons/eth.svg'
};

const NavContainer = styled.nav`
  margin: 0 auto;
  width: calc(100% - 150px);
  display: flex;
  .navbar__container {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    height: 60px;
  }
  .connectBtn {
    background: #0c0c0c !important;
    display: flex;
    border-radius: 8px;
    padding-left: 20px;
    padding-right: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.1);
      color: #fff;
    }
  }
  @media screen and (max-width: 760px) {
    margin: 0;
    width: 100%;
    padding: 0 10px;
  }
`;

const NavBrand = styled.div`
  z-index: 2;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
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
  @media screen and (max-width: 760px) {
    .x-mobile {
      display: none;
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
  const {
    active,
    connectMetamask,
    connectWalletConnect,
    account,
    error: web3Error,
    chainId,
    balance,
    networkSymbol
  } = useWeb3Context();
  const { authenticatedUser } = useAPIContext();

  return (
    <>
      {!!web3Error && <Alert type="error" message={web3Error.message} />}
      <NavContainer>
        <div className="navbar__container">
          <NavBrand>
            <Link href="/">
              <a>
                <Image src="/logo/logo.svg" width={100} height={45} />
              </a>
            </Link>
          </NavBrand>
          <NavLinks>
            {active && (
              <>
                <div className="icon x-mobile">
                  <FaEnvelope fontSize={15} />
                </div>

                <div className="icon x-mobile" onClick={() => setVisible(!visible)}>
                  <FaWallet fontSize={15} />
                </div>
                <Dropdown overlay={<Menu />} trigger={['click']} placement="bottom" arrow>
                  <div className="icon">
                    <FiMoreHorizontal />
                  </div>
                </Dropdown>
              </>
            )}

            {!active ? (
              <>
                <Button className="connectBtn" onClick={() => setVisible(!visible)}>
                  Connect Wallet
                </Button>
              </>
            ) : (
              <>
                <UserWallet onClick={() => setVisible(!visible)}>
                  <div className="wallet_container">
                    <div className="wallet_icon">
                      <Image
                        src={chainIcons[chainId as keyof typeof chainIcons] || '/icons/eth.svg'}
                        width={15}
                        height={15}
                      />
                    </div>
                    <div>
                      {!!authenticatedUser
                        ? authenticatedUser.name || ethAddress.formatEthAddress(account as string)
                        : !!account
                        ? ethAddress.formatEthAddress(account)
                        : ''}
                    </div>
                  </div>
                </UserWallet>
              </>
            )}
          </NavLinks>
        </div>
      </NavContainer>
      <Drawer title="" placement="right" onClose={() => setVisible(!visible)} visible={visible} width="300px">
        <div className="wallet__body">
          {active ? (
            <>
              <div className="wallet__header">
                <div className="wallet__setting">
                  <div className="wallet__icon">
                    <Image
                      src={chainIcons[chainId as keyof typeof chainIcons] || '/icons/eth.svg'}
                      width={20}
                      height={20}
                      alt="wallet"
                    />
                  </div>
                  <div className="wallet__setting__title">
                    <Dropdown overlay={<Menu />} trigger={['click']}>
                      <a onClick={e => e.preventDefault()}>
                        <div style={{ color: 'var(--text-light)' }}>Menu</div>
                      </a>
                    </Dropdown>
                  </div>
                  <FiChevronDown />
                </div>
                <div className="wallet__connected__account">
                  <div className="chain__logo">
                    <Image
                      src={chainIcons[chainId as keyof typeof chainIcons] || '/icons/eth.svg'}
                      width={20}
                      height={20}
                      alt="wallet"
                    />
                  </div>
                  <div className="chain__id">
                    <span>
                      {!!authenticatedUser
                        ? authenticatedUser.name || ethAddress.formatEthAddress(account as string)
                        : !!account
                        ? ethAddress.formatEthAddress(account)
                        : ''}
                    </span>
                  </div>
                </div>
              </div>
              <div className="wallet__content">
                <div className="wallet__balance">
                  <span className="wallet__balance__heading">Total balance</span>
                  <div className="wallet__balance__amt">
                    {parseFloat(balance).toFixed(4)} {networkSymbol}{' '}
                  </div>
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
                        <Image
                          src={chainIcons[chainId as keyof typeof chainIcons] || '/icons/eth.svg'}
                          width={20}
                          height={20}
                          alt="wallet"
                        />
                      </div>
                      <div className="wallet__account__info">
                        <div className="chain__name">{networkSymbol}</div>
                        <div className="source__account">USD</div>
                      </div>
                    </div>
                    <div className="account__balance__info__right">
                      <div className="chain__name__amount">{parseFloat(balance).toFixed(2)}</div>
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
                        <div className="source__account">USD</div>
                      </div>
                    </div>
                    <div className="account__balance__info__right">
                      <div className="chain__name__amount">2.454</div>
                      <div className="source__account__amount">$3,000 USD</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="connect__wallet">
                <div className="connect__wallet__heading">
                  <span>
                    <FiUser />
                  </span>
                  <span>My wallet</span>
                </div>
                <div className="connect__wallet__body">
                  <div className="connect__wallet__text">
                    <p>
                      Connect with one of our available{' '}
                      <Tooltip
                        title="A crypto wallet is an application or hardware device that allows inidividuals to store and retreive digital items."
                        placement="bottomLeft"
                        className="tooltip"
                      >
                        wallet
                      </Tooltip>{' '}
                      providers or create a new one.
                    </p>
                  </div>
                  <div className="connect__wallet__provider">
                    <div className="wallet__provider">
                      <div className="provider__logo">
                        <Image src="/logo/metamask.svg" width={20} height={20} alt="metamask" />
                      </div>
                      <div className="provider__name" onClick={connectMetamask}>
                        MetaMask <span>Popular</span>
                      </div>
                    </div>
                    <div className="wallet__provider">
                      <div className="provider__logo">
                        <Image src="/logo/wallet.svg" width={20} height={20} alt="walletConnect" />
                      </div>
                      <div className="provider__name" onClick={connectWalletConnect}>
                        WalletConnect
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
