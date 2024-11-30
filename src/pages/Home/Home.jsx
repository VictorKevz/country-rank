import React, { useContext, useEffect } from "react";
import "../../pages/pagesStyles/home.css";
import SearchBar from "../../componets/Filters/SearchBar";
import { DataContext, ThemeAppContext } from "../../App";
import CountryTable from "../../componets/CountryTable/CountryTable";
import Dropdown from "../../componets/Filters/Dropdown";
import Regions from "../../componets/Filters/Regions";
import Membership from "../../componets/Filters/Membership";
function Home() {
  const { isDark } = useContext(ThemeAppContext);
  const { fetchData, filters, dispatchCountryData,countryData } =
    useContext(DataContext);

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
  const totalCountries = countryData?.countriesData?.length;
  return (
    <section className="home-wrapper">
      <div className={`home-content-container ${!isDark && "light-card-bg"}`}>
        <header className="home-header">
          <h1 className="total-countries">{totalCountries > 0 ? `Found ${totalCountries} Countries`:"No countries Found"}</h1>
          <SearchBar />
        </header>
        <div className="filters-countryTable-wrapper">
          <div className="filters-wrappers">
            <Dropdown
            data={sortByData}
            id={"sortBy"}
            selectedOption={filters.sortBy}
            />
            <Regions/>
            <Membership/>
          </div>
          <CountryTable/>
        </div>
      </div>
    </section>
  );
}

export default Home;
