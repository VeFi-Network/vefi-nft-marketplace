import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { FaFacebook, FaGithub, FaTelegram } from 'react-icons/fa';

import { CollectionCategory } from '../../api/models/collection';
import { useWeb3Context } from '../../contexts/web3';
import { Container, FootLink, SubDiv1, SubDiv2 } from '../../styles/footer.styled';

function MainFooter() {
  const { active, account } = useWeb3Context();
  return (
    <Container>
      <SubDiv1>
        <div className="stay_loop">
          <h4 className="loop_text">Stay in the loop</h4>
          <p className="loop_desc">
            Join our mailing list to stay in the loop with our newest feature release, <br />
            NFT dopes, and tips and tricks for navigating vefi NFT.
          </p>
        </div>
        <div>
          <form action="" className="signup">
            <div>
              <input type="email" name="" id="" placeholder="Your email address" />
            </div>
            <div>
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
        {/* <div className="logo_container">
          <Image src="/logo/vefi_nft_logo.svg" height={40} width={100} />
        </div> */}
        <div className="community">
          <h5 className="join">Join Our Community</h5>
          <div className="socials">
            <a href="https://github.com/Vefi-Ecosystem/vefi-nft-marketplace" rel="noreferrer" target="_blank">
              <FaGithub className="icon" />
            </a>
            <a href="https://t.me/vefi_official" target="_blank" rel="noreferrer">
              <FaTelegram className="icon" />
            </a>
            <a href="https://twitter.com/vefi_official" target="_blank" rel="noreferrer">
              <AiFillTwitterCircle className="icon" />
            </a>
            <a href="https://facebook.com/vefi.official" target="_blank" rel="noreferrer">
              <FaFacebook className="icon" />
            </a>
          </div>
        </div>
      </SubDiv1>
      <SubDiv2>
        <div className="marketplace">
          <h2 className="nav_section">Marketplace</h2>
          {Object.values(CollectionCategory)
            .sort()
            .map(category => (
              <FootLink key={category}>
                <Link href={`/collections?category=${category}`}>
                  <a>
                    {category
                      .split('')
                      .map((character, index) => (index === 0 ? character : character.toLowerCase()))
                      .join('')
                      .split(' ')
                      .map(character => character.replace(character.charAt(0), character.charAt(0).toUpperCase()))
                      .join(' ')}
                  </a>
                </Link>
              </FootLink>
            ))}
        </div>
        {active && (
          <div className="my_account">
            <div>
              <h2 className="nav_section">My Account</h2>
              {[
                {
                  label: 'Profile',
                  path: `/users/${account}`
                },
                {
                  label: 'My Favourites',
                  path: `/users/${account}?tab=4`
                },
                {
                  label: 'Watchlist',
                  path: `/users/${account}?tab=3`
                },
                {
                  label: 'My Collection',
                  path: `/users/${account}?tab=1`
                }
              ].map(({ label, path }: any) => (
                <FootLink key={label}>
                  <Link href={path}>
                    <a>{label}</a>
                  </Link>
                </FootLink>
              ))}
            </div>
          </div>
        )}
        <div className="company">
          <h2 className="nav_section">Company</h2>
          {marketplaceArray.slice(14, 18).map(({ label, path }: any) => (
            <FootLink key={label}>
              <Link href={path}>
                <a>{label}</a>
              </Link>
            </FootLink>
          ))}
        </div>
      </SubDiv2>
    </Container>
  );
}

export default MainFooter;

const marketplaceArray = [
  {
    label: 'All Nfts',
    path: '#'
  },
  {
    label: 'Arts',
    path: '#'
  },
  {
    label: 'Sports Memorabilla',
    path: '#'
  },
  {
    label: 'Collectibles',
    path: '#'
  },
  {
    label: 'Video-Games Sticker',
    path: '#'
  },
  {
    label: 'Virtual Land',
    path: '#'
  },
  {
    label: 'Memes ',
    path: '#'
  },
  {
    label: 'Music',
    path: '#'
  },
  {
    label: 'Ticketing',
    path: '#'
  },
  {
    label: 'Domain Names',
    path: '#'
  },
  ,
  {
    label: 'Ranking',
    path: '#'
  },
  {
    label: 'Activity',
    path: '#'
  },
  {
    label: 'About',
    path: '#'
  },
  {
    label: 'Careers',
    path: '#'
  },
  {
    label: 'Ventures',
    path: '#'
  },
  {
    label: 'Grants',
    path: '#'
  }
];
