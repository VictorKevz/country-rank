import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";
import logoLight from "../../assets/images/logo-light.svg";
import { DataContext, ThemeAppContext } from "../../App";
import { DarkMode, LightMode } from "@mui/icons-material";
import "./header.css";
import Dropdown from "../Filters/Dropdown";

function Header() {
  const { isDark, setDark } = useContext(ThemeAppContext);
  const { dispatchFilters, filters } = useContext(DataContext);
  useEffect(() => {
    localStorage.setItem("theme", isDark);
  }, [isDark]);
  const dropDownData = [
    { id: 0, label: "Be Vietnam Pro", value: "'Be Vietnam Pro',serif" },
    { id: 1, label: "Poppins", value: "'Poppins', serif" },
    { id: 2, label: "Merriweather", value: "'Merriweather', serif" },
  ];
  useEffect(() => {
    localStorage.setItem("font", JSON.stringify(filters?.font));
  }, [filters.font]);

  return (
    <header className={`header-wrapper ${!isDark && "light-header-bg"}`}>
      <div className="header-content">
        <figure>
          <img
            src={isDark ? logo : logoLight}
            alt="Country Rank's logo"
            className="logo"
          />
        </figure>
        <div className={`theme-fonts-wrapper ${!isDark && "light-text"}`}>
          <Dropdown
            data={dropDownData}
            id={"font"}
            selectedOption={filters.font}
          />
          <button
            type="button"
            className={`theme-btn `}
            onClick={() => setDark(!isDark)}
          >
            {isDark ? (
              <span className="theme-text">
                <LightMode /> Light Mode
              </span>
            ) : (
              <span className="theme-text">
                <DarkMode /> Dark Mode
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
