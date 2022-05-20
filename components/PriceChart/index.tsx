import styled from 'styled-components';
import Image from 'next/image';
import { FiChevronsDown, FiTag } from 'react-icons/fi';

const ChartContainer = styled.div`
  margin-top: 3rem;
  width: 612px;
  height: 419px;
  background: rgba(255, 255, 255, 0.1);

  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;

const ChartFilter = styled.div`
  display: flex;
  column-gap: 15px;
  align-items: center;
`;

const ChartHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  gap: 10px;
  img {
    margin-top: 3px !important;
  }
  span:first-child {
    color: #5c95ff;
    transform: rotate(75deg);
  }
`;

const FilterBtn = styled.button`
  background: #373943;
  border-radius: 11px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  border: none;

  color: #5c95ff;
  padding: 10px;

  cursor: pointer;

  display: flex;
  flex-direction: row;
  gap: 11px;
`;

const Chart = styled.div`
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    row-gap: 1.2rem;
    margin-top: -11rem;
  }
  hr {
    width: 100%;
    height: 1px !important;
    color: #4f4d4d !important;
  }
`;
const ChartLine = styled.img`
  position: relative !important;
  z-index: 9;
  top: 3rem;
  left: 5rem;
  filter: drop-shadow(0 0 30px #5c95ff) !important;
`;

const PriceChart = () => {
  return (
    <>
      <ChartContainer>
        <ChartFilter>
          <ChartHeader>
            <span>
              <FiTag />
            </span>
            <span>Price History</span>
          </ChartHeader>
          <FilterBtn>
            Weekly <FiChevronsDown />
          </FilterBtn>
        </ChartFilter>

        <Chart />
      </ChartContainer>
    </>
  );
};

export default PriceChart;
