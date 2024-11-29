import React, { useContext, useMemo } from "react";
import { DataContext } from "../../App";
import "../CountryTable/countryTable.css";
import { Link } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";
function CountryTable() {
  const { countryData, filters } = useContext(DataContext);
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

  const thData = ["Flag", "Name", "Population", "Area (km²)", "Region", "Details"];
  return (
    <table className="countries-table-wrapper">
      <thead>
        <tr>
          {thData.map((item, i) => (
            <th key={i} className="th label">
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
      {sortedData?.slice(0, 8)?.map((country) => (
        <tr key={country?.cca3} className="tr">
          <td className="td">
            <img
              src={country?.flags?.png}
              alt={`${country?.name?.common} Flag`}
              className="flag-img"
            />
          </td>
          <td className="td">{country?.name?.common}</td>
          <td className="td">{country?.population.toLocaleString()}</td>
          <td className="td">{country?.area.toLocaleString()}</td>
          <td className="td">{country?.region}</td>
          <td className="td">
            <Link to={`/details/${country?.cca3}`} className="link">Details <ArrowForward/></Link>
          </td>

        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default CountryTable;
