import React, { useContext, useState, useEffect } from "react";
import { DataContext, ThemeAppContext } from "../../App";
import "../Filters/filterCSS/dropdown.css"
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

function Dropdown({ data, id, selectedOption }) {
  const { isDark } = useContext(ThemeAppContext);
  const { dispatchFilters } = useContext(DataContext);

  const [dropDownOpen, setDropDown] = useState(false);

const isSortBy = id === "sortBy";
  return (
    <div className={`dropdown-wrapper ${!isSortBy && "font-wrapper"}`}>
  {isSortBy && (
    <h2 className="label sortBy" id="sortBy-label">
      Sort by
    </h2>
  )}
  <button
    type="button"
    className={`dropdown-btn ${!isDark && "light-dropdown-bg"}`}
    onClick={() => setDropDown(!dropDownOpen)}
    aria-haspopup="listbox" // Indicates the button controls a listbox
    aria-expanded={dropDownOpen ? "true" : "false"} // Toggles the expanded state
    aria-labelledby="sortBy-label" // Associates the button with the "Sort by" label
  >
    {selectedOption}
    {dropDownOpen ? (
      <ArrowDropUp className="arrow-icon" aria-hidden="true" />
    ) : (
      <ArrowDropDown className="arrow-icon" aria-hidden="true" />
    )}
  </button>
  {dropDownOpen && (
    <ul
      className={`dropdown-list ${!isDark && "light-body-bg"}`}
      role="listbox" // Indicates this is a listbox
      aria-labelledby="sortBy-label" // Associates the listbox with the label
    >
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
            role="option" 
            aria-selected={isActive ? "true" : "false"} 
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
