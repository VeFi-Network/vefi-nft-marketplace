import styled from 'styled-components';
import Image from 'next/image';
import Button from '../Button/Ghost';
import Link from 'next/link';

type Props = {
  name: string;
  owner: string;
  price: string;
  imageURI: string;
  linkTo: string;
};

const CardContainer = styled.div`
  position: relative;
  top: 0;
  width: 358px;
  z-index: 3;

  cursor: pointer;
  height: 380px;
  margin-right: 5px;
  border-radius: 21px 21px 0 0;
`;

const CardHeader = styled.div`
  z-index: 1;
  img {
    border-radius: 21px 21px 0 0;
    width: 100% !important;
    height: 380px !important;
    object-fit: cover !important;
  }
`;

const CardFooterContainer = styled.div`
  background-color: transparent;
  background: rgba(255, 255, 255, 0.3);
  border-top: 0.841717px solid #ffffff;
  z-index: 5;
  backdrop-filter: blur(16.83px);
  cursor: pointer;
  height: 112.26px;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const CardFooter = styled.div`
  width: 100%;
  height: 85px;
  display: flex;
  align-items: center;
  color: #0c0c0c;
`;

// const Avatars = styled.div`
//   z-index: 99;
//   display: flex;
//   flex-direction: row;
//   margin-left: -30px !important;
//   position: absolute;
//   top: 65%;
//   left: 20%;
//   gap: 10px;
//   img {
//     z-index: 999;
//     border: 2px solid #fff !important;
//     object-fit: cover;
//     border-radius: 50%;
//     width: 100%;
//     height: 100%;
//   }
//   .avatar {
//     margin-left: -25px;
//     overflow: hidden;
//   }
// `;

const CardFooterItem = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 328.27px;
  justify-content: space-between;
  height: 121px;
  margin-top: 15px;
  padding: 10px 0;
  cursor: pointer;
  .nft-meta-data {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    gap: 8px;
    margin-top: 20px;
  }
  .nft-price-info {
    font-weight: bold;
    display: flex;
    flex-direction: column;
    padding: 10px;
    row-gap: 0.3rem;
    align-items: center;
    gap: 15px;

    .price {
      display: flex;
      align-items: center;

      img {
        display: flex;
        align-items: center;
        object-fit: contain;
        margin-top: 2px !important;
      }
    }
  }
  .nft-price-info span {
    padding-bottom: -5px;
    font-size: 20px;
  }
  .nft_name {
    font-size: 14px;
    padding: 3px 0;
    text-decoration: underline;
    cursor: pointer;
    font-weight: bold;
  }
  .nft_name span {
    margin: 10px 0;
    text-align: center;
  }
  .nft_collection_name {
    font-size: 20px;
    font-weight: bolder;
    cursor: pointer;
  }
`;

const Card = (props: Props) => {
  return (
    <CardContainer>
      <Link href={props.linkTo}>
        <a>
          <CardHeader>
            <img src={props.imageURI} width={329} height={378} />
          </CardHeader>
          <CardFooterContainer>
            <CardFooter>
              <CardFooterItem>
                <div className="nft-meta-data">
                  <span className="nft_collection_name">{props.name}</span>
                  <span className="nft_name">{props.owner}</span>
                </div>
                <div className="nft-price-info">
                  <div className="price">
                    <Image src="/icons/eth_classic.svg" width={20} height={20} />

                    <div>{props.price}eth</div>
                  </div>

                  <Button borderThickness="1px" borderRadius="4px">
                    View
                  </Button>
                </div>
              </CardFooterItem>
            </CardFooter>
          </CardFooterContainer>
        </a>
      </Link>
    </CardContainer>
  );
};

export default Card;
