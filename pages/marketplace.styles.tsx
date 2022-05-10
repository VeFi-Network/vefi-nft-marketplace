import styled from 'styled-components';
 import img from "../public/im4.png";

const MarketContainer = styled.div`
  --header-bg-color:#373943;
  margin: 1rem 3rem;
  color: white;

    & .header {
        margin-bottom: 2rem;

        & .market-header {
            margin-bottom: 3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: white;

            & h1 {}
            & ul {
                display: flex;
                justify-content: space-around;
                align-items: center;
                list-style: none;

                & li {
                    padding: 0 1rem;
                }

                & .header-list-item {
                    border-radius: 50%;
                    border: 0px solid white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    /* margin: 1rem; */
                    padding: 7px;
                    background: var(--header-bg-color);
                    opacity: 0.7;
                }
                & .header-list-item-wallet {
                    /* color: black; */
                }

                & .address {
                    display: flex;

                    & .eth-logo {
            
                        /* padding: 5px;
                        border-radius: 50%;
                        border: 1px solid white; */
                    }

                         & .faeth {
                          
                            font-size: 20px;
                        border-radius: 50%;
                        border: 1px solid white;
                        background: white;
                        color:black;
                        opacity: 0.7;
                        }

                        

                        & .eth-address {
                            padding: 0.2rem 0.5rem 0.2rem 0.5rem;
                           border: 0px solid white;
                            border-radius: 1rem;
                            background: var(--header-bg-color);
                            opacity: 0.7;
                        }
                    
                }

            }
        }

        & .header-filter {
            & .header-filter-container{
                margin-bottom: 2rem;
                & .filter-logo {
                    padding: 0.5rem;
                    opacity: 0.8;
                }
                & .filter-by {
                    padding: 0 0.5rem ;
                    opacity: 0.7;
                   
                }
            }

            & .filter-items{
                  display: flex;
                    justify-content: space-between;

                & .filter-left {
                    color: white;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    & select{
                        color: #5555bb;
                        margin:0 1rem;
                        padding: 0.5rem 1rem;
                        border: 0;
                        border-radius: 0.5rem;
                        background:#373943;
                    }

                    & .filter-left-item{
                        margin-right:1rem;
                        padding: 0.5rem 1rem;
                        cursor: pointer;
                        border:0 solid ;
                        background:#373943;
                        border-radius: 0.5rem;
                        color: #5555bb;

                        & .bisearch{
                            margin-right: 0.3rem;
                        }

                        & .bisearch, & .search-artwork{
                            background:#373943;
                        }
                    }
                }
                & .filter-right {
                    & .create-new-item {
                        margin: 0 1rem;
                        padding: 0.5rem 1rem;
                        background:transparent;
                        border: 0.5px solid white;
                        border-radius: 0.5rem; 
                        opacity: 0.7;

                        & .fiplus, & span{
                            background:transparent;
                        }

                        & .fiplus{
                            
                        }
                   
                        
                       
                        

                    }
                }
            }

            

        }
      
    }

    
/* cards-container-styling */
    & .cards-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        color: white;
        width: 100%;
        min-height: 70vh;
        max-height: fit-content;
        border: 0px solid brown;
        border-radius:1.5rem ;
        background: #ffffff13;
        backdrop-filter: blur(5px);
        
        padding: 2rem;

        & .scrollable-container{
            display: flex;
            justify-content: space-around;
            margin: 2rem;
            padding: 2rem 2rem;
            width: 90%;
            min-height: 40vh;
            border: 0px solid red;
            border-radius: 2rem;
            background: transparent;
            /* border: 1px solid white; */

            & .card{
                z-index: 1;
                position: relative;
                width: 320px;
                height: 365px;
                border: 1px solid white;
                border-radius: 2rem 2rem 0 0;
                /* background-image: url(img);
                background-repeat: no-repeat; */
    

                & .card-img{
                    border-radius: 2rem 2rem 0 0;
                }

                & .lowerSection{
                    z-index: 2;
                    position: absolute;
                    top: 259px;
                    left: 0px;
                    width: 100%;
                    height: 29%;
                    background: #e6dbdb83;
                    backdrop-filter: blur(5px);

                    & .innerFlex{
                        background:inherit;
                           
                        & .eth7{
                            background-color:inherit;
                        }
                            
                           
                            

                    }

                }
                   

            }
     

        }

        & .top-sellers-container{
            /*make background transparent */
            background: transparent;
            backdrop-filter: blur(5px);


            width: 87%;

            & .top-title{
                margin-left: 2rem;
                background: transparent;
            backdrop-filter: blur(5px);
            }

            
            & .top-sellers{
                background: transparent;
            backdrop-filter: blur(5px);
                display: grid;
                grid-template-columns: auto auto auto auto auto;
                border: 0px solid white;
                
                
                
                & .top-seller-item{
                    display: flex;
                    
                    
                    background: transparent;
                    border-radius: 50%;
                    margin: 1rem 2rem;
                    
                    & p{
                        margin-left: 1rem;
                        padding-top: 1rem;
                        background: transparent;
                        backdrop-filter: blur(5px);
                    }

                    & .top-seller-img {
                        background: transparent;
                        backdrop-filter: blur(5px);


                    }
                }
                
            }
        }

     

    }
`;

export default MarketContainer;
