"use client";
import { useState, useCallback } from "react";
import { useSpreadsheet } from "../context/SpreadsheetContext";

const FindReplaceModal = ({ onClose }: { onClose: () => void }) => {
  const { cells, updateCell } = useSpreadsheet();
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);

  const handleFindReplace = useCallback(() => {
    if (!findText.trim()) return;

    const regex = new RegExp(findText, caseSensitive ? "g" : "gi");
    let isUpdated = false;

    Object.keys(cells).forEach((cellId) => {
      const cellValue = cells[cellId];
      if (typeof cellValue === "string" && regex.test(cellValue)) {
        updateCell(cellId, cellValue.replace(regex, replaceText));
        isUpdated = true;
      }
    });

    if (!isUpdated) alert("No matches found.");
    onClose();
  }, [cells, findText, replaceText, caseSensitive, updateCell, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFindReplace();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 className="modal-title">Find & Replace</h3>

        <input
          type="text"
          placeholder="Find..."
          value={findText}
          onChange={(e) => setFindText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="modal-input"
        />

        <input
          type="text"
          placeholder="Replace with..."
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="modal-input"
        />

        <label className="modal-checkbox">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={() => setCaseSensitive(!caseSensitive)}
          />
          Case Sensitive
        </label>

        <div className="modal-buttons">
          <button onClick={handleFindReplace} className="btn-primary">
            Replace
          </button>
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindReplaceModal;
