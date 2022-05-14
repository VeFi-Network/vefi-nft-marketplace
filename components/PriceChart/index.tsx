import styled from 'styled-components';
import Image from 'next/image';
const ChartContainer = styled.div`
    margin-top:3rem;
    width: 612px;
    height: 419px;
    background: linear-gradient(254.33deg, rgba(255, 255, 255, 0.1) 1.71%, rgba(255, 255, 255, 0.05) 99.35%);
    backdrop-filter: blur(16.86px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 20px;
    padding:30px;
    border: 1px solid #383838;
`

const ChartFilter = styled.div`
    display:flex;
    column-gap:15px;
`

const ChartHeader = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    font-size:18px;
    font-weight:bold;
    img{
        margin-top:3px !important;
    }
`

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
    div{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-between;
        row-gap:1.2rem;
        margin-top:-11rem;
    }
    hr{
        width:100%;
        height:1px !important;
        color:#4F4D4D !important;
    }
`
const ChartLine = styled.img`
        position:relative !important;
        z-index:9;
        top:3rem;
        left:5rem;
        filter:drop-shadow(0 0 30px #5C95FF) !important;
`

const PriceChart = () => {
    return (
        <>
            <ChartContainer>
                <ChartFilter>
                    <ChartHeader>
                        <span>
                            <Image src="/icons/price-tag.svg" width={20} height={20} />
                        </span>
                        Price History
                    </ChartHeader>
                    <FilterBtn>
                        Weekly{' '}
                        <div style={{ marginTop: -1 }}>
                            <Image width="12px" height="9px" src="/icons/downIcon.svg" />
                        </div>
                    </FilterBtn>
                </ChartFilter>
                <ChartLine src="/icons/chart-line.svg" />
                <Chart>
                    <div>
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                        <hr />
                    </div>
                </Chart>
            </ChartContainer>
        </>
    )
}

export default PriceChart;