import styled from 'styled-components';
import Image from 'next/image';
import { Table } from 'antd';
import Link from 'next/link';

const ListingTable = styled.div`
  margin-top: 3rem;
  width: 612px;
  height: 419px;
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

function Listing() {
  const dataSource = [
    {
      key: '1',
      unit_price: 'Mike',
      usd_unit_price: 32,
      quantity: '10 Downing Street',
      expiration: '20th Oct, 2022',
      from: 'Wereywanle'
    }
  ];

  const columns = [
    {
      title: 'Unit Price',
      dataIndex: 'unit_price',
      key: 'unit_price'
    },
    {
      title: 'USD Unit Price',
      dataIndex: 'usd_unit_price',
      key: 'usd_unit_price'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Expiration',
      dataIndex: 'expiration',
      key: 'expiration'
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      render: (text: any) => (
        <Link href="/">
          <a>{text}</a>
        </Link>
      )
    }
  ];
  return (
    <>
      <ListingTable>
        <ListingTableHeading>
          <Image src="/icons/list.svg" width={20} height={20} />
          Listings
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
        <Table dataSource={dataSource} columns={columns} />
      </ListingTable>
    </>
  );
}

export default Listing;
