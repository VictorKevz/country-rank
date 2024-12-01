import React, { useContext } from "react";
import {  ThemeAppContext } from "../../App";
import "../CountryTable/countryTable.css";
import { Link } from "react-router-dom";
import {  Launch } from "@mui/icons-material";

function CountryTable({ data }) {
  const { isDark } = useContext(ThemeAppContext);

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
      <thead className="desktop">
        <tr className="tr-head">
          {thData.map((item, i) => (
            <th key={i} className={`th label `}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="desktop">
        {data?.map((country) => (
          <tr key={country?.cca3} className={`tr ${!isDark && "light-text"}`}>
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
                <Launch className="launch-icon" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>

      {/* 
        Mobile Content
        *
        *
        * 
        * 
        * 
        * 
        * 
        */}
      <tbody className="mobile">
        {data?.map((country) => (
          <tr key={country?.cca3} className={`tr ${!isDark && "light-body-bg"}`}>
            

            <td className="td">
              <div className="flag-item">
                <img
                  src={country?.flags?.png}
                  alt={`${country?.name?.common} Flag`}
                  className="flag-img"
                />
              </div>
              <div>
                <strong>Name:</strong> {country?.name?.common}
              </div>
              <div>
                <strong>Population:</strong>{" "}
                {country?.population.toLocaleString()}
              </div>
              <div>
                <strong>Area:</strong> {country?.area.toLocaleString()}
              </div>
              <div>
                <strong>Region:</strong> {country?.region}
              </div>
            </td>
            <td className="td">
              <Link to={`/details/${country?.cca3}`} className="link table">
                <Launch className="launch-icon" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CountryTable;
