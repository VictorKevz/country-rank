import React, { useContext } from "react";
import { DataContext } from "../../App";
import checkMark from "../../assets/images/check.svg";
import "../Filters/filterCSS/membership.css"

function Membership() {
  const { filters, dispatchFilters } = useContext(DataContext);
  const membershipData = [
    { id: "unMember", text: "Member of the United Nations" },
    { id: "independent", text: "Independent" },
  ];
  return (
    <div className="membership-wrapper">
      <h3 className="label">Status</h3>
      <ul className="membership-list">
        {membershipData.map((item) => {
          const isChecked = filters.membership[item.id];
          return (
            <li key={item.id} className="membership-item">
              <button
                className={`box ${isChecked && "box-checked"}`}
                onClick={() =>
                  dispatchFilters({
                    type: "UPDATE_MEMBERSHIP",
                    payload: { key: item.id, status: isChecked },
                  })
                }
              >
                {isChecked && (
                  <img
                    src={checkMark}
                    alt=""
                    className="check-img"
                    aria-hidden="true"
                  />
                )}
              </button>
              {item.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Membership;
