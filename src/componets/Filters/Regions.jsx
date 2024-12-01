import React, { useContext } from "react";
import { DataContext, ThemeAppContext } from "../../App";
import "../Filters/filterCSS/regions.css";
function Regions() {
  const { countryData, dispatchFilters, filters } = useContext(DataContext);
  const { isDark } = useContext(ThemeAppContext);

  const regions = new Set(
    countryData?.countriesData?.map((country) => country?.region)
  );
  const regionsArray = [...regions];
  return (
    <div className="regions-wrapper">
      <h3 className="label">Region</h3>
      <ul className="regions-list">
        {regionsArray?.map((region, i) => {
          const isSelected = filters.selectedRegions.includes(region);
          return (
            <li
              key={i}
              className={`region-item ${isSelected && "selectedRegion"} ${!isDark && isSelected && "light-selectedRegion"}`}
              onClick={() =>
                dispatchFilters({ type: "UPDATE_REGIONS", region })
              }
            >
              {region}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Regions;
