import React, { useContext, useEffect, useMemo, useState } from "react";
import ".//home.css";
import SearchBar from "../../componets/Filters/SearchBar";
import { DataContext, ThemeAppContext } from "../../App";
import CountryTable from "../../componets/CountryTable/CountryTable";
import Dropdown from "../../componets/Filters/Dropdown";
import Regions from "../../componets/Filters/Regions";
import Membership from "../../componets/Filters/Membership";
import Pagination from "../../componets/Pagination/Pagination";

function Home() {
  const { isDark } = useContext(ThemeAppContext);
  const { fetchData, filters, dispatchCountryData, countryData } =
    useContext(DataContext);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  {
    /*
      Fetch data of all countries 
      .
      .
   */
  }
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("data"));
    if (savedData) {
      dispatchCountryData({
        type: "UPDATE_DATA",
        payload: { data: savedData },
      });
    } else {
      const url = "https://restcountries.com/v3.1/all";
      fetchData(url);
    }
  }, []);
  const sortByData = [
    { id: 0, label: "Population", value: "Population" },
    { id: 1, label: "Ascending (A-Z)", value: "A-Z" },
    { id: 2, label: "Descending (Z-A)", value: "Z-A" },
    { id: 3, label: "Area", value: "Area" },
  ];

  const data = countryData?.countriesData;

  // First, Filter countries based on selected regions
  const filteredByRegions = data.filter((country) =>
    filters.selectedRegions.includes(country?.region)
  );
  {
    /* 
    .
    .
 */
  }
  // Second, filter by checking membership
  // Is country independent? Is the country a member of the UN?
  const { independent, unMember } = filters.membership;
  const filteredByMembership = filteredByRegions.filter(
    (country) =>
      (independent && country?.independent) || (unMember && country?.unMember)
  );
  {
    /* 
    .
    .
 */
  }
  //Third, Use the filteredData by regions to search
  // Filter countries by search : name, region, subRegion
  const filteredData = filteredByMembership.filter(
    (country) =>
      country?.name?.common
        ?.toLowerCase()
        ?.includes(filters?.query?.toLowerCase()) ||
      country?.region?.toLowerCase()?.includes(filters?.query?.toLowerCase()) ||
      country?.subregion?.toLowerCase()?.includes(filters?.query?.toLowerCase())
  );

  {
    /* 
    .
    .
 */
  }

  // Fourth, sort the filtered data by population, Alphabet, and Area
  const sortedData = useMemo(() => {
    const dataCopy = [...filteredData];
    switch (filters.sortBy) {
      case "Population":
        return dataCopy.sort((a, b) => b?.population - a?.population);
      case "A-Z":
        return dataCopy.sort((a, b) =>
          a?.name?.common?.localeCompare(b?.name?.common)
        );
      case "Z-A":
        return dataCopy.sort((a, b) =>
          b?.name?.common?.localeCompare(a?.name?.common)
        );
      case "Area":
        return dataCopy.sort((a, b) => b?.area - a?.area);
      default:
        return dataCopy;
    }
  }, [filters?.sortBy, filteredData]); // this hook runs based on these dependencies

  const totalCountries = sortedData?.length;

  {
    /* 
    .
    Pagination Logic.....
    .
 */
  }
  const itemsPerPage = 6; // Number of items to display per page
  const totalItems = sortedData?.length; // Total number of items in the sorted data
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Total number of pages based on items per page

  const indexOfFirstItem = currentPageIndex * itemsPerPage; // Index of the first item on the current page
  const indexOfLastItem = indexOfFirstItem + itemsPerPage; // Index of the item just after the last item on the current page

  const pageItems = sortedData?.slice(indexOfFirstItem, indexOfLastItem); // Extract items for the current page

  return (
    <section className="home-wrapper" aria-labelledby="home-header">
      <div
        className={`home-content-container ${!isDark && "light-card-bg"}`}
        role="main"
      >
        <header className="home-header">
          <h1 id="home-header" className="total-countries" aria-live="polite">
            {totalCountries > 0
              ? `Found ${totalCountries} Countries`
              : "No countries Found"}
          </h1>
          <SearchBar aria-label="Search countries" />
        </header>
        <div
          className="filters-countryTable-wrapper"
          aria-describedby="filter-info"
        >
          <div className="filters-wrappers">
            <Dropdown
              data={sortByData}
              id={"sortBy"}
              selectedOption={filters.sortBy}
              aria-label="Sort countries by"
            />
            <Regions aria-label="Filter by regions" />
            <Membership aria-label="Filter by membership status" />
          </div>
          <CountryTable data={pageItems} aria-live="polite" />
        </div>
      </div>
      <Pagination
        data={totalPages}
        setCurrentPageIndex={setCurrentPageIndex}
        currentPageIndex={currentPageIndex}
        aria-label="Pagination for country list"
      />
    </section>
  );
}

export default Home;
