import styled from 'styled-components';
import Image from 'next/image';
import Button from '../Button/Ghost';

type Props = {
    collectionName: string,
    NFTName: string,
    NFTPrice: string,
    NFTImageURI: string,
}

const CardContainer  = styled.div`
    position:relative;
    top:0;
    min-width: 328.27px;
    z-index: 3;

    transition-duration: 250ms;

    cursor: pointer;

    &:hover{
        transform: scale(1.05);
    }
    
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
    height: 110.26px;
    position:absolute;
    top:70%;
`

const CardFooter = styled.div`
    width:100%;
    height:85px;
    display:flex;
    align-items:center;
    color:#fff;
`

const Avatars = styled.div`
    z-index:99;
    display:flex;
    flex-direction:row;
    margin-left:-20px !important;
    position:absolute;
    top:65%;
    left:20%;
    img{
        z-index:999;
        border:2px solid #fff !important;
        object-fit:cover;
        border-radius:50%;
        width:100%;
        height:100%;
    }
    .avatar{
        margin-left: -20px;
        overflow:hidden;
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
        margin-top:20px;
    }
    .nft-price-info{
        font-weight:bold;
        display:flex;
        flex-direction:column;
        padding:10px;
        row-gap:0.3rem;
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
            <Avatars>
                <div className="avatar">
                    <Image src="/avatar/user01.png" width={30} height={30} />
                </div>
                <div className="avatar">
                <Image src="/avatar/user01.png" width={30} height={30} />
                </div>
                <div className="avatar">
                    <Image src="/avatar/user01.png" width={30} height={30} />
                </div>
            </Avatars>
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