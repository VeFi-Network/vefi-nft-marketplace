import React from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';

const FIlterBy = ({ children }: any) => {
  return (
    <>
      <div className="filter__collection">
        <div className="heading">
          <span>
            <FaFilter />
          </span>
          <span>Filter By</span>
        </div>
        <div className="collection">
          {children}
          <div className="search">
            <div className="search__box">
              <FaSearch />
              <input type="text" placeholder="Search for artwork" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FIlterBy;
