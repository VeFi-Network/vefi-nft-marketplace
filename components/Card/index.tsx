import styled from 'styled-components';
import Image from 'next/image';
import Button from '../Button/Ghost';

type Props = {
    collectionName: string,
    NFTName: string,
    NFTPrice: string,
    NFTImageURI: string,
    nftHolderAvatar:string
}

const CardContainer  = styled.div`
    position:relative;
    top:0;
    width: 240px;
    height:auto;
    border-radius:21px 21px 0 0;
    ::before{
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 58.79%, #000000 92.21%);
    }
    img{
        border-radius:21px 21px 0 0;
    }
`

const CardHeader = styled.div`
    z-index:1;
`

const CardFooterContainer = styled.div`
    background-color:transparent;
    background: linear-gradient(137.43deg, rgba(255, 255, 255, 0.5) 3.89%, rgba(255, 255, 255, 0.2) 100%);
    border-top: 0.841717px solid #FFFFFF;
    z-index:5;
    backdrop-filter: blur(20px) opacity(0.9);
    width: 100%;
    height: auto;
    position:absolute;
    top:85%;
`

const CardFooter = styled.div`
    width:100%;
    height:100px;
    display:flex;
    align-items:center;
    color:#fff;
`

const AvatarCards = styled.div`
    position:absolute;
    z-index:99;
    top:80%;
    margin:0 5px;
    img{
        border-radius:50%;
        border:1px solid #fff !important;
    }
`

const CardFooterItem = styled.div`
    display:flex;
    flex-direction:row;
    width:100%;
    justify-content:space-between;
    padding:10px 0;
    .nft-meta-data{
        display:flex;
        flex-direction:column;
        padding:0 10px;
    }
    .nft-price-info{
        font-weight:bold;
        display:flex;
        flex-direction:column;
        padding:0 10px;
    }
    .nft_name{
        font-size:12px;
        padding:5px 0;
        text-decoration:underline;
        cursor:pointer;
        font-weight:bold;
    }
    .nft_name span{
        margin:10px 0;
        text-align:center;
    }
    .nft_collection_name{
        font-weight:bold;
        cursor:pointer;
    }
`


const Card = (props:Props) => {
    return(
        <CardContainer>
            <CardHeader>
                <Image src={props.NFTImageURI} width={329} height={378} />
            </CardHeader>
            <AvatarCards>
                <Image src={props.nftHolderAvatar} width={30} height={30} />
                <Image src={props.nftHolderAvatar} width={30} height={30} />
                <Image src={props.nftHolderAvatar} width={30} height={30} />
            </AvatarCards>
            <CardFooterContainer>
                <CardFooter>
                    <CardFooterItem>
                        <div className="nft-meta-data">
                            <span className="nft_collection_name">{props.collectionName}</span>
                            <span className="nft_name">{props.NFTName}</span>
                        </div>
                        <div className="nft-price-info">
                            <span>
                                <Image src="/icons/eth.svg" width={15} height={15} />  {props.NFTPrice}eth
                                </span>
                            <Button borderThickness={3}>Purchase</Button>
                        </div>
                    </CardFooterItem>
                </CardFooter>
            </CardFooterContainer>
        </CardContainer>
    )
}

export default Card;