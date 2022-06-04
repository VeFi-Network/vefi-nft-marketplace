import { CategoryScale, Chart as ChartJs, LinearScale, LineElement, PointElement } from 'chart.js';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FiTag } from 'react-icons/fi';
import styled from 'styled-components';

import { Periods } from './period';

ChartJs.register(CategoryScale, LinearScale, LineElement, PointElement);

type Props = {
  timestamps: Array<number>;
  prices: Array<number>;
  onChange?: (period: Periods) => void;
};

const ChartContainer = styled.div`
  margin-top: 3rem;
  width: 612px;
  height: 419px;
  background: rgba(255, 255, 255, 0.1);
  overflow-x: scroll;
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
  margin-bottom: 10px;
  .filterBtn {
    display: flex;
    gap: 10px;
  }
  @media screen and (max-width: 760px) {
    flex-direction: column;
  }
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
  background: ${(props: any) => (props.isActive ? '#5C95FF' : '#373943 ')};
  border-radius: 11px;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  border: none;

  color: #ccc;
  padding: 3px 5px;

  cursor: pointer;
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 10px;
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
  @media screen and (max-width: 760px) {
    height: max-content;
    margin-top: 40px;
  }
`;

const PriceChart = ({ timestamps, prices, onChange }: Props) => {
  const months: { [key: number]: string } = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
  };

  const [period, setPeriod] = useState<Periods>(Periods.ONE_HOUR);
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
          <div className="filterBtn">
            <FilterBtn
              onClick={() => {
                setPeriod(Periods.ONE_HOUR);

                if (!!onChange) {
                  onChange(Periods.ONE_HOUR);
                }
              }}
              isActive={period === Periods.ONE_HOUR}
            >
              1 Hour
            </FilterBtn>
            <FilterBtn
              onClick={() => {
                setPeriod(Periods.TWO_DAYS);

                if (!!onChange) {
                  onChange(Periods.TWO_DAYS);
                }
              }}
              isActive={period === Periods.TWO_DAYS}
            >
              2 Days
            </FilterBtn>
            <FilterBtn
              onClick={() => {
                setPeriod(Periods.SEVEN_DAYS);

                if (!!onChange) {
                  onChange(Periods.SEVEN_DAYS);
                }
              }}
              isActive={period === Periods.SEVEN_DAYS}
            >
              7 Days
            </FilterBtn>
            <FilterBtn
              onClick={() => {
                setPeriod(Periods.THIRTY_DAYS);

                if (!!onChange) {
                  onChange(Periods.THIRTY_DAYS);
                }
              }}
              isActive={period === Periods.THIRTY_DAYS}
            >
              30 Days
            </FilterBtn>
          </div>
        </ChartFilter>

        <Chart>
          <Line
            options={{ responsive: true }}
            data={{
              labels: timestamps.map(t => {
                const date = new Date(t);
                return `${date.getDate()} ${months[date.getMonth() + 1]}`;
              }),
              datasets: [
                {
                  data: prices,
                  borderColor: '#5c95ff'
                }
              ]
            }}
          />
        </Chart>
      </ChartContainer>
    </>
  );
};

export default PriceChart;
