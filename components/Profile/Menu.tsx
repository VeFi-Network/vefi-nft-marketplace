import { Menu, Tag } from 'antd';
import Link from 'next/link';
import { FaChessBoard, FaLink, FaUserCircle } from 'react-icons/fa';
import { FiEye, FiHeart, FiLogOut, FiShoppingBag } from 'react-icons/fi';

import { useAPIContext } from '../../contexts/api/index';
import { useWeb3Context } from '../../contexts/web3';

const MenuItem = () => {
  const { disconnectWallet, account, active } = useWeb3Context();
  const { logout } = useAPIContext();

  return (
    <Menu
      style={{ background: '#373943' }}
      items={[
        active
          ? {
              label: (
                <Link href={`/users/${account}`}>
                  <a>
                    <div className="listItem">
                      <div className="icon">
                        <FaUserCircle />
                      </div>
                      <div className="text">Profile</div>
                    </div>
                  </a>
                </Link>
              ),
              key: '0'
            }
          : null,
        {
          label: (
            <Link href="/marketplace">
              <a>
                <div className="listItem">
                  <div className="icon">
                    <FiShoppingBag />
                  </div>
                  <div className="text">Marketplace</div>
                </div>
              </a>
            </Link>
          ),
          key: '1'
        },
        {
          label: (
            <Link href={`/users/${account}?tab=1`}>
              <a>
                <div className="listItem">
                  <div className="icon">
                    <FaChessBoard />
                  </div>
                  <div className="text">My Collections</div>
                </div>
              </a>
            </Link>
          ),
          key: '2'
        },
        {
          label: (
            <Link href={`/users/${account}?tab=3`}>
              <a>
                <div className="listItem">
                  <div className="icon">
                    <FiEye />
                  </div>
                  <div className="text">Watchlist</div>
                </div>
              </a>
            </Link>
          ),
          key: '3'
        },
        {
          label: (
            <Link href={`/users/${account}?tab=4`}>
              <a>
                <div className="listItem">
                  <div className="icon">
                    <FiHeart />
                  </div>
                  <div className="text">Favorites</div>
                </div>
              </a>
            </Link>
          ),
          key: '4'
        },
        {
          label: (
            <Link href="/bridge">
              <a>
                <div className="listItem">
                  <div className="icon">
                    <FaLink />
                  </div>
                  <div className="text">
                    Bridge <Tag color="yellow">Beta!</Tag>
                  </div>
                </div>
              </a>
            </Link>
          ),
          key: '5'
        },
        {
          type: 'divider'
        },
        {
          label: (
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                disconnectWallet();
                logout();
              }}
            >
              <div className="listItem">
                <div className="icon">
                  <FiLogOut />
                </div>
                <div className="text">Log out</div>
              </div>
            </a>
          ),
          key: '6'
        }
      ]}
    />
  );
};

export default MenuItem;
