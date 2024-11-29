// import React, { useContext, useState } from 'react'
// import { DataContext, ThemeAppContext } from '../../App';
// import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

// function SortFilter() {
//     const{filters,dispatchFilters} = useContext(DataContext)
//     const{isDark} = useContext(ThemeAppContext)
//     const[dropDownOpen,setDropDown] = useState(false)
//   return (
//     <div className={`sortFilter-wrapper `}>
//       <span className="sortFilter-label">Sort By</span>
//       <button
//         type="button"
//         className={`sortFilter-btn ${!isDark && "light-dropDown-bg"}`}
        
//       >
//         {filters?.sortBy}
//         {dropDownOpen ? (
//           <ArrowDropUp className="arrow-icon" />
//         ) : (
//           <ArrowDropDown className="arrow-icon" />
//         )}
//       </button>
//       {dropDownOpen && (
//         <ul className={`fontDropdown-list ${!isDark && "light-body-bg"}`}>
//           {dropDownData.map((field) => {
//             const isActive = font === field.value;
//             return (
//               <li
//                 key={field.id}
//                 className={`font-item ${isActive && "active"}`}
//                 onClick={() => {
//                   setFont(field.value);
//                   setDropDown(false);
                  
//                 }}
//                 tabIndex={0}
//               >
//                 {field.label}
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   )
// }

// export default SortFilter