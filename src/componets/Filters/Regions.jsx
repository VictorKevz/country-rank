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
      <h3 className="label" id="regions-label">
        Region
      </h3>
      <ul className="regions-list" role="list" aria-labelledby="regions-label">
        {regionsArray?.map((region, i) => {
          const isSelected = filters.selectedRegions.includes(region);
          return (
            <li
              key={i}
              className={`region-item ${isSelected && "selectedRegion"} ${
                !isDark && isSelected && "light-selectedRegion"
              }`}
              onClick={() =>
                dispatchFilters({ type: "UPDATE_REGIONS", region })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  dispatchFilters({ type: "UPDATE_REGIONS", region });
                }
              }}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={`${region} region ${
                isSelected ? "selected" : "not selected"
              }`}
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
