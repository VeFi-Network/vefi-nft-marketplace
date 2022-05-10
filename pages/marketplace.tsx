import Link from 'next/link';
import Image from 'next/image';
import logo from './images/logo.png';
import im4 from "./images/im4.png";
import im5 from "./images/im5.png";
import topSeller from './images/topseller1.png';
import topSeller2 from './images/topseller2.png';
import topSeller3 from './images/topseller3.png'
import topSeller4 from './images/topseller4.png'
import topSeller5 from './images/topseller5.png'
import topSeller6 from './images/topseller6.png'
import topSeller7 from './images/topseller7.png'
import topSeller8 from './images/topseller8.png'
import topSeller9 from './images/topseller9.png'
import topSeller10 from './images/topseller10.png'
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

                {/* first scrollable container */}

                <div className="scrollable-container">

                    {/* cards */}

                    <div className='card'>
                        <Image className='card-img' src={im4} alt="img"/>
                        <div className='lowerSection'>
                            <div className='innerImgs'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            </div>

                            <div className='innerFlex'>
                                <div></div>
                                <div>
                                <div className='eth7'>
                                    
                                </div>
                                <div></div>
                                </div>
                            </div>
                           
                        </div>



                    </div>

                    <div className='card'>
                        <Image className='card-img' src={im5} alt="img"/>
                        <div className='lowerSection'>
                            <div className='innerImgs'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            </div>

                            <div className='innerFlex'>
                                <div></div>
                                <div>
                                <div className='eth7'>
                                    
                                </div>
                                <div></div>
                                </div>
                            </div>
                           
                        </div>



                    </div>
                    
                    <div className='card'>
                        <Image className='card-img' src={im4} alt="img"/>
                        <div className='lowerSection'>
                            <div className='innerImgs'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            </div>

                            <div className='innerFlex'>
                                <div></div>
                                <div>
                                <div className='eth7'>
                                    
                                </div>
                                <div></div>
                                </div>
                            </div>
                           
                        </div>



                    </div>
                    
                    <div className='card'>
                        <Image className='card-img' src={im5} alt="img"/>
                        <div className='lowerSection'>
                            <div className='innerImgs'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            </div>

                            <div className='innerFlex'>
                                <div></div>
                                <div>
                                <div className='eth7'>
                                    
                                </div>
                                <div></div>
                                </div>
                            </div>
                           
                        </div>



                    </div>
                    
                    
                </div>

                <div className="top-sellers-container">
                    <div className='top-title'>Top sellers</div>
                    <div  className="top-sellers">
                    <div className="top-seller-item">
                        <Image className='top-seller-img' src={topSeller} alt="top seller"/>
                        <p className='top-seller-name'>Beastyzakustler</p>
                    </div>
                    <div className="top-seller-item">
                        <Image src={topSeller2} alt="top seller"/>
                        <p>Cassy Mcconnell</p>
                    </div>

                    <div className="top-seller-item">
                        <Image src={topSeller3} alt="top seller"/>
                        <p>Coben Day</p>
                    </div>

                    <div className="top-seller-item">
                        <Image src={topSeller4} alt="top seller"/>
                        <p>Bradly Giles</p>
                    </div>

                    <div className="top-seller-item">
                        <Image src={topSeller5} alt="top seller"/>
                        <p>Saim Roth</p>
                    </div>
                    <div className="top-seller-item">
                        <Image src={topSeller6} alt="top seller"/>
                        <p>Dylan Bowen</p>
                    </div>
                    <div className="top-seller-item">
                        <Image src={topSeller7} alt="top seller"/>
                        <p>Heini Fitzpatrick</p>
                    </div>

                    <div className="top-seller-item">
                        <Image src={topSeller8} alt="top seller"/>
                        <p>Neshawn Glover</p>
                    </div>

                    <div className="top-seller-item">
                        <Image src={topSeller9} alt="top seller"/>
                        <p>Nelson Daugherty</p>
                    </div>

                    <div className="top-seller-item">
                        <Image src={topSeller10} alt="top seller"/>
                        <p>Shiloh York</p>
                    </div>


                  </div>

                </div>
                {/* top sellers end */}

                {/* second scrollable container */}

                <div className="scrollable-container">

                    {/* cards */}

                    <div className='card'>
                        <Image className='card-img' src={im4} alt="img"/>
                        <div className='lowerSection'>
                            <div className='innerImgs'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            </div>

                            <div className='innerFlex'>
                                <div></div>
                                <div>
                                <div className='eth7'>
                                    
                                </div>
                                <div></div>
                                </div>
                            </div>
                           
                        </div>



                    </div>

                    <div className='card'>
                        <Image className='card-img' src={im5} alt="img"/>
                        <div className='lowerSection'>
                            <div className='innerImgs'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            </div>

                            <div className='innerFlex'>
                                <div></div>
                                <div>
                                <div className='eth7'>
                                    
                                </div>
                                <div></div>
                                </div>
                            </div>
                           
                        </div>



                    </div>
                    
                    <div className='card'>
                        <Image className='card-img' src={im4} alt="img"/>
                        <div className='lowerSection'>
                            <div className='innerImgs'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            </div>

                            <div className='innerFlex'>
                                <div></div>
                                <div>
                                <div className='eth7'>
                                    
                                </div>
                                <div></div>
                                </div>
                            </div>
                           
                        </div>



                    </div>
                    
                    <div className='card'>
                        <Image className='card-img' src={im5} alt="img"/>
                        <div className='lowerSection'>
                            <div className='innerImgs'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            </div>

                            <div className='innerFlex'>
                                <div></div>
                                <div>
                                <div className='eth7'>
                                    
                                </div>
                                <div></div>
                                </div>
                            </div>
                           
                        </div>



                    </div>
                    
                    
                </div>
            </div>

        </div>
      </MarketContainer>
    );
  }
  
