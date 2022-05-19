import styled from 'styled-components';
import Image from 'next/image';

const ListingTable = styled.div`
  margin-top: 3rem;
  width: 612px;
  height: 419px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ListingTableHeading = styled.div`
  display: flex;
  column-gap: 10px;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 5px 0;
  position: sticky;
`;

const ListingTableBody = styled.table`
  width: 100%;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-spacing: 10px;
  .price {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 19px;
  }
  thead {
    text-align: left;
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  .user {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 19px;
    gap: 0.35rem;
    padding-left: 1.2rem !important;
  }
  .user img {
    margin-top: 10px;
  }
  thead tr {
    display: flex;
    background: red;
    width: 100%;
    justify-content: space-evenly;

    th {
      border: 1px solid #ccc;
      justify-content: left;
    }
  }
  tbody {
    overflow-y: auto;
    height: 250px;

    width: 100%;
    background: green;
    justify-content: left;

    tr {
      display: flex;
      justify-content: space-evenly;

      td {
        border: 1px solid #ccc;
      }
    }
  }
`;

function Listing() {
  return (
    <>
      <ListingTable>
        <ListingTableHeading>
          <Image src="/icons/list.svg" width={20} height={20} />
          Listings
        </ListingTableHeading>
        <ListingTableBody>
          <thead>
            <tr>
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
        </ListingTableBody>
      </ListingTable>
    </>
  );
}

export default Listing;
