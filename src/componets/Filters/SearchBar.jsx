import React, { useContext } from "react";
import "../Filters/filterCSS/searchBar.css";
import { Search } from "@mui/icons-material";
import { DataContext, ThemeAppContext } from "../../App";

function SearchBar() {
  const { isDark } = useContext(ThemeAppContext);
  const { filters,dispatchFilters } = useContext(DataContext);

  return (
    <fieldset className={`search-field ${!isDark && "light-fields"}`}>
      <Search />
      <label htmlFor="searchBar" className="sr-only">
        Search for countries
      </label>
      <input
        type="text"
        id="searchBar"
        placeholder="Search by Name, Region, Subregion"
        className={`search-input `}
        value={filters?.query}
        onChange={(e)=>dispatchFilters({type:"UPDATE_QUERY",payload:{value:e.target.value}})}
      />
    </fieldset>
  );
}

export default SearchBar;
