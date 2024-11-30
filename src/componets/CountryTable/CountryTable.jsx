import React, { useContext } from "react";
import { DataContext } from "../../App";
import "../CountryTable/countryTable.css";
import { Link } from "react-router-dom";
import { ArrowForward, Launch } from "@mui/icons-material";

function CountryTable({ data }) {
  const { countryData, filters } = useContext(DataContext);

  const thData = [
    "Flag",
    "Name",
    "Population",
    "Area (km²)",
    "Region",
    "Details",
  ];
  return (
    <table className="countries-table-wrapper">
      <thead>
        <tr className="tr-head desktop">
          {thData.map((item, i) => (
            <th key={i} className={`th label ${item === "Flag" && "flag"}`}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((country) => (
          <tr key={country?.cca3} className="tr">
            <tr className="tr-head mobile">
          {thData.map((item, i) => (
            <th key={i} className={`th label ${item === "Flag" && "flag"}`}>
              {item}
            </th>
          ))}
        </tr>
            <td className="td flag">
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
             
              <Link to={`/details/${country?.cca3}`} className="link table">
                <Launch className="launch-icon"/>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CountryTable;
