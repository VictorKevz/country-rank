import React, { createContext, useCallback, useReducer, useState } from "react";
import { motion } from "framer-motion";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./componets/Header/Header";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";

// Context API
export const ThemeAppContext = createContext();
export const DataContext = createContext();

const dataReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_DATA":
      const { key, data } = action.payload;
      return {
        ...state,
        [key]: data,
      };
    case "UPDATE_LOADING":
      return {
        ...state,
        loading: false,
      };
    case "UPDATE_error":
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
const filterReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_DROPDOWN":
      const { id, option } = action.payload;
      return {
        ...state,
        [id]: option,
      };
    case "UPDATE_QUERY":
      const { value } = action.payload;
      return {
        ...state,
        query: value,
      };
    case "UPDATE_REGIONS":
      const isSelected = state.selectedRegions.includes(action.region);
      if (isSelected) {
        return {
          ...state,
          selectedRegions: state.selectedRegions.filter(
            (item) => item !== action.region
          ),
        };
      } else {
        return {
          ...state,
          selectedRegions: [...state.selectedRegions, action.region],
        };
      }
      case "UPDATE_MEMBERSHIP":
        const{key,status} = action.payload
        return{
          ...state,
          membership:{
            ...state.membership,
            [key]:!status
          }
        }
    default:
      return state;
  }
};
function App() {
  const [isDark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "false" ? false : true;
  });
  // const [font, setFont] = useState(() => {
  //   return localStorage.getItem("font") || "'Be Vietnam Pro',serif";
  // });
  const initialData = {
    countriesData: [],
    singleCountryData: [],
    loading: true,
    error: "",
  };
  const [countryData, dispatchCountryData] = useReducer(
    dataReducer,
    initialData
  );

  const fetchData = useCallback(async (url, key) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch data for ${key}`);
      }
      const data = await res.json();
      dispatchCountryData({ type: "UPDATE_DATA", payload: { key, data } });
      dispatchCountryData({ type: "UPDATE_LOADING" });

      // Store in local storage
      if (key === "countriesData") {
        localStorage.setItem("data", JSON.stringify(data));
      }
    } catch (error) {
      dispatchCountryData({ type: "UPDATE_LOADING" });
      dispatchCountryData({
        type: "UPDATE_ERROR",
        payload: { error: error.message },
      });
    }
  }, []);

  const savedFont = JSON.parse(localStorage.getItem("font"));
  const initialFilters = {
    font: savedFont ? savedFont : "'Be Vietnam Pro',serif",
    sortBy: "Population",
    query: "",
    selectedRegions: ["Americas","Africa","Asia","Europe"],
    membership:{ 
      independent:true,
      unMember:false

    },
  };
  const [filters, dispatchFilters] = useReducer(filterReducer, initialFilters);

  return (
    <ThemeAppContext.Provider value={{ isDark, setDark }}>
      <DataContext.Provider
        value={{
          countryData,
          dispatchCountryData,
          fetchData,
          filters,
          dispatchFilters,
        }}
      >
        <motion.main
          className={`outer-container ${!isDark && "light-body-bg"} `}
          style={{
            fontFamily: `${filters.font}`,
          }}
          initial={{ fontFamily: "'Be Vietnam Pro',serif" }} 
          animate={{
            fontFamily: `${filters.font}`,
          }}
          transition={{
            fontFamily: {type:"spring", duration: 0.3, mass:1, damping:20 }, 
          }}
        >
          <Header />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:cca3" element={<Details />} />
          </Routes>
        </motion.main>
      </DataContext.Provider>
    </ThemeAppContext.Provider>
  );
}
export default App;
