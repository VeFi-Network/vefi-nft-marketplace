import { Menu } from 'antd';
import Link from 'next/link';
import { FaChessBoard, FaUserCircle } from 'react-icons/fa';
import { FiEye, FiHeart, FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import { useWeb3Context } from '../../contexts/web3/index';

const MenuItem = () => {
  const { disconnectWeb3 } = useWeb3Context()
  return (
    <Menu
      items={[
        {
          label: (
            <Link href="/users/i">
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
        },
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
                  <FiSettings />
                </div>
                <div className="text">Settings</div>
              </div>
            </a>
          ),
          key: '3'
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
                  <FiUser />
                </div>
                <div className="text">Vefi Bridge</div>
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
            <a href="#" onClick={disconnectWeb3}>
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
}

export default MenuItem;
