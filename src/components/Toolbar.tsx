// "use client";
// import { useState } from "react";
// import { useSpreadsheet } from "../context/SpreadsheetContext";

// interface ToolbarProps {
//   onAddRow: () => void;
//   onAddColumn: () => void;
//   onDeleteRow: (rowIndex: number) => void;
//   onDeleteColumn: (colLetter: string) => void;
//   onFindReplace: () => void;
// }

// const Toolbar: React.FC<ToolbarProps> = ({
//   onAddRow,
//   onAddColumn,
//   onDeleteRow,
//   onDeleteColumn,
//   onFindReplace,
// }) => {
//   const {
//     selectedCell,
//     updateCellStyle,
//     cellStyles,
//     removeDuplicates,
//     findAndReplace,
//   } = useSpreadsheet();

//   const [showDropdown, setShowDropdown] = useState<string | null>(null);

//   if (!selectedCell) return null;

//   const currentStyle = cellStyles[selectedCell] || {};

//   const columnLetter = selectedCell[0];
//   const rowIndex = parseInt(selectedCell.slice(1), 10);

//   const toggleDropdown = (name: string) => {
//     setShowDropdown(showDropdown === name ? null : name);
//   };

//   return (
//     <div className="toolbar">
//       {}
//       <div className="toolbar-dropdown">
//         <button
//           onClick={() => toggleDropdown("format")}
//           className="toolbar-dropdown-btn"
//         >
//           Format
//         </button>
//         {showDropdown === "format" && (
//           <div className="toolbar-dropdown-content">
//             {}
//             <button
//               className={currentStyle.bold ? "active" : ""}
//               onClick={() =>
//                 updateCellStyle(selectedCell, { bold: !currentStyle.bold })
//               }
//             >
//               <b>Bold</b>
//             </button>

//             {}
//             <button
//               className={currentStyle.italic ? "active" : ""}
//               onClick={() =>
//                 updateCellStyle(selectedCell, { italic: !currentStyle.italic })
//               }
//             >
//               <i>Italic</i>
//             </button>

//             {}
//             <button
//               className={currentStyle.underline ? "active" : ""}
//               onClick={() =>
//                 updateCellStyle(selectedCell, {
//                   underline: !currentStyle.underline,
//                 })
//               }
//             >
//               <u>Underline</u>
//             </button>

//             {}
//             <div className="toolbar-section">
//               <span>Text Align</span>
//               <div className="toolbar-button-group">
//                 <button
//                   className={currentStyle.textAlign === "left" ? "active" : ""}
//                   onClick={() =>
//                     updateCellStyle(selectedCell, { textAlign: "left" })
//                   }
//                 >
//                   Left
//                 </button>
//                 <button
//                   className={
//                     currentStyle.textAlign === "center" ? "active" : ""
//                   }
//                   onClick={() =>
//                     updateCellStyle(selectedCell, { textAlign: "center" })
//                   }
//                 >
//                   Center
//                 </button>
//                 <button
//                   className={currentStyle.textAlign === "right" ? "active" : ""}
//                   onClick={() =>
//                     updateCellStyle(selectedCell, { textAlign: "right" })
//                   }
//                 >
//                   Right
//                 </button>
//               </div>
//             </div>

//             {}
//             <div className="toolbar-section">
//               <span>Font Size</span>
//               <select
//                 value={currentStyle.fontSize || "16px"}
//                 onChange={(e) =>
//                   updateCellStyle(selectedCell, { fontSize: e.target.value })
//                 }
//               >
//                 <option value="12px">12px</option>
//                 <option value="14px">14px</option>
//                 <option value="16px">16px</option>
//                 <option value="18px">18px</option>
//                 <option value="20px">20px</option>
//               </select>
//             </div>
//           </div>
//         )}
//       </div>

//       {}
//       <div className="toolbar-dropdown">
//         <button
//           onClick={() => toggleDropdown("data")}
//           className="toolbar-dropdown-btn"
//         >
//           Data
//         </button>
//         {showDropdown === "data" && (
//           <div className="toolbar-dropdown-content">
//             <button onClick={removeDuplicates}>Remove Duplicates</button>
//             <button onClick={onFindReplace}>Find & Replace</button>
//           </div>
//         )}
//       </div>

//       {}
//       <div className="toolbar-dropdown">
//         <button
//           onClick={() => toggleDropdown("sheet")}
//           className="toolbar-dropdown-btn"
//         >
//           Sheet
//         </button>
//         {showDropdown === "sheet" && (
//           <div className="toolbar-dropdown-content">
//             <button onClick={onAddRow}>Add Row</button>
//             <button onClick={onAddColumn}>Add Column</button>
//             <button onClick={() => onDeleteRow(rowIndex)}>Delete Row</button>
//             <button onClick={() => onDeleteColumn(columnLetter)}>
//               Delete Column
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Toolbar;

"use client";
import { useSpreadsheet } from "../context/SpreadsheetContext";

interface ToolbarProps {
  onAddRow: () => void;
  onAddColumn: () => void;
  onDeleteRow: (rowIndex: number) => void;
  onDeleteColumn: (colLetter: string) => void;
  onFindReplace: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onAddRow,
  onAddColumn,
  onDeleteRow,
  onDeleteColumn,
  onFindReplace,
}) => {
  const { selectedCell, updateCellStyle, cellStyles, removeDuplicates } =
    useSpreadsheet();

  if (!selectedCell) return null;

  const currentStyle = cellStyles[selectedCell] || {};
  const columnLetter = selectedCell[0];
  const rowIndex = parseInt(selectedCell.slice(1), 10);

  return (
    <div className="toolbar">
      {/* Format Section */}
      <div className="toolbar-section">
        <h3>Format</h3>
        <div className="toolbar-buttons">
          <button
            className={currentStyle.bold ? "active" : ""}
            onClick={() =>
              updateCellStyle(selectedCell, { bold: !currentStyle.bold })
            }
          >
            <b>B</b>
          </button>
          <button
            className={currentStyle.italic ? "active" : ""}
            onClick={() =>
              updateCellStyle(selectedCell, { italic: !currentStyle.italic })
            }
          >
            <i>I</i>
          </button>
          <button
            className={currentStyle.underline ? "active" : ""}
            onClick={() =>
              updateCellStyle(selectedCell, {
                underline: !currentStyle.underline,
              })
            }
          >
            <u>U</u>
          </button>
          <div className="text-align-group">
            <button
              className={currentStyle.textAlign === "left" ? "active" : ""}
              onClick={() =>
                updateCellStyle(selectedCell, { textAlign: "left" })
              }
            >
              Left
            </button>
            <button
              className={currentStyle.textAlign === "center" ? "active" : ""}
              onClick={() =>
                updateCellStyle(selectedCell, { textAlign: "center" })
              }
            >
              Center
            </button>
            <button
              className={currentStyle.textAlign === "right" ? "active" : ""}
              onClick={() =>
                updateCellStyle(selectedCell, { textAlign: "right" })
              }
            >
              Right
            </button>
          </div>
          <select
            value={currentStyle.fontSize || "16px"}
            onChange={(e) =>
              updateCellStyle(selectedCell, { fontSize: e.target.value })
            }
          >
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
          </select>
        </div>
      </div>

      {/* Data Section */}
      <div className="toolbar-section">
        <h3>Data</h3>
        <div className="toolbar-buttons">
          <button onClick={removeDuplicates}>Remove Duplicates</button>
          <button onClick={onFindReplace}>Find & Replace</button>
        </div>
      </div>

      {/* Sheet Section */}
      <div className="toolbar-section">
        <h3>Sheet</h3>
        <div className="toolbar-buttons">
          <button onClick={onAddRow}>Add Row</button>
          <button onClick={onAddColumn}>Add Column</button>
          <button onClick={() => onDeleteRow(rowIndex)}>Delete Row</button>
          <button onClick={() => onDeleteColumn(columnLetter)}>
            Delete Column
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
