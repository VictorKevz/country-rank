import React, { useContext, useState, useEffect } from "react";
import { DataContext, ThemeAppContext } from "../../App";
import "../Filters/filterCSS/dropdown.css"
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

function Dropdown({ data, id, selectedOption }) {
  const { isDark } = useContext(ThemeAppContext);
  const { dispatchFilters } = useContext(DataContext);

  const [dropDownOpen, setDropDown] = useState(false);


  return (
    <div className={`dropdown-wrapper `}>
      {id === "sortBy" && <h2 className="label">Sort by</h2>}
      <button
        type="button"
        className={`dropdown-btn ${!isDark && "light-dropdown-bg"}`}
        onClick={() => setDropDown(!dropDownOpen)}
      >
        {selectedOption}
        {dropDownOpen ? (
          <ArrowDropUp className="arrow-icon" />
        ) : (
          <ArrowDropDown className="arrow-icon" />
        )}
      </button>
      {dropDownOpen && (
        <ul className={`dropdown-list ${!isDark && "light-body-bg"}`}>
          {data.map((field) => {
            const isActive = selectedOption === field.value;
            return (
              <li
                key={field.id}
                className={`font-item ${isActive && "active"}`}
                onClick={() => {
                  dispatchFilters({
                    type: "UPDATE_DROPDOWN",
                    payload: { id, option: field.value },
                  });
                  setDropDown(false);
                }}
                tabIndex={0}
              >
                {field.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
