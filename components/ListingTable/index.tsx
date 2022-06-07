import { Table } from 'antd';
import { formatEthAddress } from 'eth-address';
import Link from 'next/link';
import { FiList } from 'react-icons/fi';
import styled from 'styled-components';

import { OrderModel, OrderStatus } from '../../api/models/order';
import Filled_CTA_Button from '../Button/CTA/Filled';

type Props = {
  datasource: Array<OrderModel>;
  acceptanceButtonEnabled: boolean;
  rejectionButtonEnabled: boolean;
  onAcceptClick: (orderId: string) => void;
  onRejectClick: (orderId: string) => void;
};

const ListingTable = styled.div`
  margin-top: 3rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  @media screen and (max-width: 760px) {
    width: 100%;
    overflow-x: scroll;
  }
`;

const ListingTableHeading = styled.div`
  display: flex;
  column-gap: 10px;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 5px 0;
  position: sticky;
`;

function Listing({ datasource, acceptanceButtonEnabled, rejectionButtonEnabled, onAcceptClick, onRejectClick }: Props) {
  return (
    <>
      <ListingTable>
        <ListingTableHeading>
          <FiList color="#5c95ff" />
          Offer Listing
        </ListingTableHeading>
        {/* <table style={{ border: '1px solid #ccc', width: '100%' }}>
          <thead>
            <tr style={{ border: '1px solid #ccc', width: '100%' }}>
              <th>Unit Price</th>
              <th>USD Unit Price</th>
              <th>Quantity</th>
              <th>Expiration</th>
              <th>From</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="price">
                <span>
                  <Image width={15} height={15} src="/icons/eth_classic.svg" />
                </span>
                2eth
              </td>
              <td className="unit_price">3,000 USD</td>
              <td className="quantity">1</td>
              <td className="expiry_date">1 Month</td>
              <td className="user">
                Weyreywanle
                <span>
                  <Image src="/icons/verification.svg" alt="" width="20px" height="20px" className="tick" />
                </span>
              </td>
            </tr>
          </tbody>
        </table> */}
        <Table
          dataSource={datasource
            .map(data => ({
              ...data,
              key: `${data.id}`
            }))
            .sort((a, b) => b.amount - a.amount)}
          columns={[
            {
              title: 'Order ID',
              dataIndex: 'orderId',
              key: 'orderId',
              render: (orderId: string) => <span>{orderId.substring(0, 7) + '...'}</span>
            },
            {
              title: 'Price',
              dataIndex: 'amount',
              key: 'amount'
            },
            {
              title: 'Creator',
              dataIndex: 'creator',
              key: 'creator',
              render: (c: string) => <Link href={`/users/${c}?tab=2`}>{formatEthAddress(c, 4)}</Link>
            },
            {
              title: 'Date',
              dataIndex: 'timeStamp',
              key: 'timeStamp',
              render: (val: number) => <span>{new Date(val * 1000).toUTCString()}</span>
            },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
              render: (val: OrderStatus) => (
                <span
                  style={{
                    color:
                      val === OrderStatus.STARTED
                        ? 'yellow'
                        : val === OrderStatus.ACCEPTED
                        ? 'green'
                        : val === OrderStatus.REJECTED
                        ? 'orangered'
                        : val === OrderStatus.CANCELLED
                        ? 'red'
                        : 'blue'
                  }}
                >
                  {val}
                </span>
              )
            },
            {
              title: 'Actions',
              dataIndex: 'orderId',
              key: 'orderId',
              render: (orderId: string, record) => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 8
                  }}
                >
                  <div style={{ marginRight: 3 }}>
                    <Filled_CTA_Button
                      disabled={!acceptanceButtonEnabled || record.status !== OrderStatus.STARTED}
                      onClick={() => onAcceptClick(orderId)}
                      style={{
                        background:
                          acceptanceButtonEnabled && record.status === OrderStatus.STARTED ? undefined : 'grey'
                      }}
                    >
                      Accept
                    </Filled_CTA_Button>
                  </div>
                  <div style={{ marginLeft: 3 }}>
                    <Filled_CTA_Button
                      disabled={!rejectionButtonEnabled || record.status !== OrderStatus.STARTED}
                      onClick={() => onRejectClick(orderId)}
                      style={{
                        background: rejectionButtonEnabled && record.status === OrderStatus.STARTED ? 'red' : 'grey'
                      }}
                    >
                      Reject
                    </Filled_CTA_Button>
                  </div>
                </div>
              )
            }
          ]}
        />
      </ListingTable>
    </>
  );
}

export default Listing;
