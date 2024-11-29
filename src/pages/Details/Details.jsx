import { ArrowBack } from "@mui/icons-material";
import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DataContext } from "../../App";
import "./details.css"
function Details() {
  const { fetchData, countryData } = useContext(DataContext);
  const { cca3 } = useParams();
  useEffect(() => {
    const url = `https://restcountries.com/v3.1/alpha/${cca3}`;
    fetchData(url, "singleCountryData");
  }, [cca3]);

  const dataObj = countryData?.singleCountryData?.[0];

  const { loading, error } = countryData;
  if (loading) {
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
      <div className="detailsPage-content">
        <Link to="/" className="link back">
          <ArrowBack /> Back
        </Link>
        <header className="detailsPage-header">
          <img
            src={dataObj?.flags?.png}
            alt={dataObj?.flags?.alt}
            className="details-flag-img"
          />
           {/* Names content */}
          <div className="details-names">
            <h1 className="common-name">{dataObj?.name?.common}</h1>
            <h2 className="official-name">{dataObj?.name?.official}</h2>
          </div>

          {/* Population content */}
          <div className="population-area">
            <div className="population-wrapper">
              <p className="population">Population</p>
              <span className="divider"></span>
              <p className="value">{dataObj?.population.toLocaleString()}</p>
            </div>
            {/* Area content */}
            <div className="area-wrapper">
              <p className="area">Area(km²)</p>
              <span className="divider"></span>
              <p className="value">{dataObj?.area.toLocaleString()}</p>
            </div>
          </div>
        </header>
      </div>
    </section>
  );
}

export default Details;
