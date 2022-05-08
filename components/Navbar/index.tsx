import Image from 'next/image';
import styled from 'styled-components';

const NavContainer = styled.nav`
    max-width: 100%;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    padding: 0 50px;
`

const NavBrand = styled.div`
    padding:0 10px;
`

const NavLinks = styled.div`
    display:flex;
    flex-direction: row;
    column-gap:0.5rem;
    padding:0 10px;
    .icon{
        background-color: #373943;
        border-radius: 50%;
        width:30px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        cursor:pointer;
    }
`
const UserWallet = styled.div`
    border-radius:50%;
    .wallet_container{
        background-color: #373943;
        border-radius:30px;
        color:#fff;
        display:flex;
        flex-direction:row;
        align-items:center;
        column-gap:0.5rem;
        width:180px;
    }
    .wallet_icon{
        background-color: #FFF;
        border-radius: 50%;
        width:30px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        cursor:pointer;
    }
`


const Navbar = () => {
    return (
        <NavContainer>
            <NavBrand>
                <Image src="/logo/vefi_nft_logo.svg" width={100} height={45} />
            </NavBrand>
            <NavLinks>
                <div className='icon'>
                    <Image src="/icons/envelope.svg" width={15} height={15} />
                </div>
                <div className='icon'>
                    <Image src="/icons/notification.svg" width={15} height={15} />
                </div>
                <div className='icon'>
                    <Image src="/icons/wallet.svg" width={15} height={15} />
                </div>
                <UserWallet>
                    <div className="wallet_container">
                        <div className="wallet_icon">
                            <Image src="/icons/eth.svg" width={15} height={15} />
                        </div>
                        <div>0xF2255c5F4dd0a...</div>
                    </div>
                </UserWallet>
            </NavLinks>
        </NavContainer>
    )
}

export default Navbar;