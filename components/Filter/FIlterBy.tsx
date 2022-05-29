import React from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';

const FIlterBy = ({ children, onSearchEnter, placeholder }: any) => {
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
              <input
                type="text"
                onChange={e => onSearchEnter(e.target.value)}
                placeholder={placeholder || 'Search for artwork'}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FIlterBy;
