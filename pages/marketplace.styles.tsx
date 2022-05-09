import styled from 'styled-components';

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
            margin: 2rem;
            padding: 2rem 2rem;
            width: 90%;
            min-height: 40vh;
            border: 0px solid red;
            border-radius: 2rem;
            background: inherit;
        backdrop-filter: inherit;

        }

     

    }
`;

export default MarketContainer;
