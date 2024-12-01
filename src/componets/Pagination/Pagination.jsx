import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import React, { useContext, useEffect } from "react";
import { ThemeAppContext } from "../../App";

function Pagination({ data, setCurrentPageIndex, currentPageIndex }) {
  const { isDark } = useContext(ThemeAppContext);

  // Make sure current page index never goes out of range
  // Set it to the last page when sorted data changes
  useEffect(() => {
    if (currentPageIndex > data) {
      setCurrentPageIndex(data - 1);
    }
  }, [data, currentPageIndex]);
  const prevDisabled = currentPageIndex === 0;
  const nextDisabled = currentPageIndex === data - 1;
  return (
    <div className="pagination-wrapper">
      <ul className="pagination-btn-list">
        {Array.from({ length: data }, (_, i) => {
          const isCurrent = currentPageIndex === i;
          return (
            <li key={i} className="pagination-item">
              <button
                type="button"
                className={`page-num-btn ${isCurrent && "current"} ${
                  !isDark && "light-card-bg"
                }`}
                onClick={() => setCurrentPageIndex(i)}
              >
                {i + 1}
              </button>
            </li>
          );
        })}
      </ul>
      {/* 
    .
    Controls Logic.....
    .
 */}
      <div className="controls-wrapper">
        <button
          type="button"
          className={`control-btn 
            ${prevDisabled && "disabled"}
            ${!isDark && prevDisabled && "disabled-light"}
            ${!isDark && "control-btn-light"}
            `}
          onClick={() => setCurrentPageIndex((prevIndex) => prevIndex - 1)}
          disabled={prevDisabled}
        >
          <ArrowCircleLeft
            className={`control-icon ${!isDark && "control-icon-light"}`}
          />
        </button>
        <button
          type="button"
          className={`control-btn 
          ${nextDisabled && "disabled"} 
          ${!isDark && nextDisabled && "disabled-light"} 
          ${!isDark && "control-btn-light"}

          `}
          onClick={() => setCurrentPageIndex((prevIndex) => prevIndex + 1)}
          disabled={nextDisabled}
        >
          <ArrowCircleRight
            className={`control-icon ${!isDark && "control-icon-light"}`}
          />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
