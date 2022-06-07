import { Menu } from 'antd';
import { FaChessBoard, FaUserCircle } from 'react-icons/fa';
import { FiBell, FiEye, FiLogOut, FiSettings, FiUser } from 'react-icons/fi';

const notification = (
  <Menu
    items={[
      {
        label: (
          <a href="https://www.antgroup.com">
            <div className="listItem">
              <div className="icon notification__icon">
                <FiBell />
              </div>
              <div className="text notification__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima ullam, id.
              </div>
            </div>
          </a>
        ),
        key: '0'
      },
      {
        label: (
          <a href="https://www.antgroup.com">
            <div className="listItem">
              <div className="icon notification__icon">
                <FiBell />
              </div>
              <div className="text notification__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima ullam, id.
              </div>
            </div>
          </a>
        ),
        key: '1'
      },
      {
        label: (
          <a href="https://www.antgroup.com">
            <div className="listItem notification__bar">
              <div className="icon notification__icon">
                <FiBell />
              </div>
              <div className="text notification__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima ullam, id.
              </div>
            </div>
          </a>
        ),
        key: '2'
      }
    ]}
  />
);

export default notification;
