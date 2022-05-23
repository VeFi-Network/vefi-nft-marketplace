import { Menu } from 'antd';
import Link from 'next/link';
import { FaChessBoard, FaUserCircle, FaLink } from 'react-icons/fa';
import { FiEye, FiHeart, FiLogOut, FiSettings } from 'react-icons/fi';
import { useWeb3Context } from '../../contexts/web3';
import { useAPIContext } from '../../contexts/api/index';

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
            <Link href="/collections/i">
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
          key: '1'
        },
        {
          label: (
            <a href="https://www.antgroup.com">
              <div className="listItem">
                <div className="icon">
                  <FiEye />
                </div>
                <div className="text">Watch list</div>
              </div>
            </a>
          ),
          key: '2'
        },
        {
          label: (
            <a href="https://www.antgroup.com">
              <div className="listItem">
                <div className="icon">
                  <FiHeart />
                </div>
                <div className="text">Favorites</div>
              </div>
            </a>
          ),
          key: '4'
        },
        {
          label: (
            <a href="https://www.antgroup.com">
              <div className="listItem">
                <div className="icon">
                  <FaLink />
                </div>
                <div className="text">Bridge</div>
              </div>
            </a>
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
