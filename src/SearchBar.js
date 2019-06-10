import React from "react";
import "./SearchBar.css";

const SearchBar = ({ query, onChange }) => {
  return (
    <div className="search-bar">
      <input
        placeholder="Search Your Destiny"
        value={query}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
