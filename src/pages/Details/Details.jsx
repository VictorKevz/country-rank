import { ArrowBack } from "@mui/icons-material";
import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext, ThemeAppContext } from "../../App";
import "./details.css";
function Details() {
  const { countryData } = useContext(DataContext);
  const { isDark } = useContext(ThemeAppContext);
  const { cca3 } = useParams();

 // Dynamically Extract the object with the matching cca3
 const dataObj = countryData?.countriesData?.find(
  (country) => country?.cca3 === cca3
);

const languageArray = dataObj?.languages ? Object.values(dataObj.languages) : [];
const currencyArray = dataObj?.currencies ? Object.keys(dataObj.currencies) : [];

const bordersArray = dataObj?.borders;
// Keeps all objects whose cca3 matches the ones in the bordersArray
const neighborsArray = countryData?.countriesData.filter((country) =>
  bordersArray.includes(country?.cca3)
);
const { loading, error } = countryData;



if (loading && !dataObj) {
  return (
    <div className="loading-wrapper">
      <h2 className="loading">Fetching Data...</h2>
    </div>
  );
}
if (error) {
  return (
    <div className="error-wrapper">
      <h2 className="loading">An error occured : {error}</h2>
    </div>
  );
}
  return (
    <section className="detailsPage-wrapper">
      
      <div className={`detailsPage-content ${!isDark && "light-card-bg"}`}>
      <Link to="/" className={`link back ${!isDark && "light-body-bg"}`}>
        <ArrowBack /> Back
      </Link>
        <header className="detailsPage-header">
          <img
            src={dataObj?.flags?.png}
            alt={`The flag of ${dataObj?.name?.common}`}
            className="details-flag-img"
          />

          {/* Names content */}
          <div className={`details-names ${!isDark && "light-text"}`}>
            <h1 className="common-name">{dataObj?.name?.common}</h1>
            <h2 className="official-name">{dataObj?.name?.official}</h2>
          </div>

          {/* Population content */}
          <div className={`population-area ${!isDark && "light-text"}`}>
            <div className={`population-wrapper ${!isDark && "light-body-bg"}`}>
              <p className="population">Population</p>
              <span className={`divider ${!isDark && "light-card-bg"}`}></span>
              <p className={`value ${!isDark && "light-text"}`}>{dataObj?.population.toLocaleString()}</p>
            </div>

            {/* Area content */}
            <div className={`area-wrapper ${!isDark && "light-body-bg"}`}>
              <p className="area">Area(km²)</p>
              <span className={`divider ${!isDark && "light-card-bg"}`}></span>
              <p className={`value ${!isDark && "light-text"}`}>{dataObj?.area.toLocaleString()}</p>
            </div>
          </div>
        </header>

        {/* Main Details content */}
        <ul className="main-details-wrapper">
          <li className="item">
            Capital <span className={`value ${!isDark && "light-text"}`}>{dataObj?.capital?.[0]}</span>
          </li>
          <li className="item">
            Subregion <span className={`value ${!isDark && "light-text"}`}>{dataObj?.subregion}</span>
          </li>
          <li className="item">
            Languages
            <span
              className={`value lang ${
                languageArray.length > 1 && "small-text"
              } ${!isDark && "light-text"}`}
            >
              {languageArray.join(", ")}
            </span>
          </li>

          {/* Currency content */}
          <li className="item">
            Currencies
            {currencyArray.map((currency, i) => (
              <ul key={i} className="curr-value-wrapper">
                <li className={`value ${!isDark && "light-text"}`}>
                  {dataObj?.currencies?.[currency]?.name}
                </li>
              </ul>
            ))}
          </li>
          <li className="item last">
            Continents <span className={`value ${!isDark && "light-text"}`}>{dataObj?.continents?.[0]}</span>
          </li>
        </ul>
        {/* Neighboring Countries content */}
        <div className="borders-wrapper">
          <h3 className="border-heading">Neighboring Countries</h3>
        <ul className="borders-list">
          {neighborsArray.map((border)=>(
            <li key={border?.cca3} className="border-item">
              <Link to={`/details/${border?.cca3}`} className="border-link">
              <img src={border?.flags?.png} alt={`Flag of ${border?.name?.common}`} className="border-img" />
              {border?.name?.common}
              </Link>
            </li>
          ))}
        </ul>
        </div>
        
      </div>
    </section>
  );
}

export default Details;
