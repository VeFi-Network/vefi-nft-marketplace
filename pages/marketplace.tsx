import Link from 'next/link';
import Image from 'next/image';
import logo from './images/logo.png';
import filter from './images/filter.png';
import messageLogo from './images/message.png';
import secondListLogo from './images/Vector2.png';
import {FiPlus} from 'react-icons/fi';
import {BiSearch} from 'react-icons/bi';
import {FaEthereum} from 'react-icons/fa';
import {BiWallet} from 'react-icons/bi';

import MarketContainer from './marketplace.styles';


export default function Marketplace() {
    return (
      <MarketContainer>
        <div className='market-container'>
            {/* Header Section */}
            <header className='header'>
                
                    <div className='market-header'>


                    <Image src={logo} alt="logo" />
                <ul>
                    <li>
                        <div className="header-list-item">
                            <Image src={messageLogo} alt="messageLogo"/>

                        </div>
                    </li>
                    <li>
                    <div className="header-list-item">
                    <Image src={secondListLogo} alt="second logo"/>

                      </div>
                    </li>
                    <li>
                    <div className="header-list-item header-list-item-wallet">
                    <BiWallet/>

                   </div>
                    </li>
                    <li>
                    <div className="header-list-itemz address">
                        <div className="eth-logo"><FaEthereum className='faeth'/></div>
                        <div className='eth-address'>0x71C7656EC7a...</div>
                       
                        

                      </div>
                    </li>


                </ul>
                    </div>
                <div className='header-filter'>
                    <div className='header-filter-container'>
                        <Image className='filter-logo' src={filter} alt="filter" />
                        <span className='filter-by'>Filter by</span>
                    </div>
                        <div className='filter-items'>
                            <div className='filter-left'>
                                <div className="filter-left-item all">
                                    All
                                </div>
                                <div className="filter-left-itemz top-selling">
                              

                                        <select name="pets" id="pet-select">
                                            <option value="">Top selling</option>
                                            <option value="dog">Dog</option>
                                            <option value="cat">Cat</option>
                                            <option value="hamster">Hamster</option>
                                            <option value="parrot">Parrot</option>
                                            <option value="spider">Spider</option>
                                            <option value="goldfish">Goldfish</option>
                                        </select>
                                </div>
                                <div className="filter-left-itemz price">
                                

                                        <select name="pets" id="pet-select">
                                            <option value="">Price</option>
                                            <option value="dog">Dog</option>
                                            <option value="cat">Cat</option>
                                            <option value="hamster">Hamster</option>
                                            <option value="parrot">Parrot</option>
                                            <option value="spider">Spider</option>
                                            <option value="goldfish">Goldfish</option>
                                        </select>
                                </div>
                                <div className="filter-left-item search-artwork">
                                    <BiSearch className='bisearch' />
                                    <span className='search-artwork'>Search artwork</span>
                                </div>
                            </div>
                            <div className='filter-right'>
                                <div className="create-new-item">
                                    <FiPlus className='fiplus'/> <span>Create new</span>
                                   
                                </div>

                            </div>

                        </div>

                </div>
                
            </header>
            {/* cards-container */}
            <div className='cards-container'>

                <div className="scrollable-container">
                    
                </div>
                <div className="scrollable-container">
                    
                    </div>
    

                
                </div>

        </div>
      </MarketContainer>
    );
  }
  
