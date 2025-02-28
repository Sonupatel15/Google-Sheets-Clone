"use client";

import React, { useState, useCallback } from "react";
import { useSpreadsheet } from "../context/SpreadsheetContext";
import Cell from "./Cell";
import Toolbar from "./Toolbar";
import SaveLoadButtons from "./SaveLoadButtons";

const ROWS = 10;
const COLS = 13;

const calculateRange = (startCell: string, endCell: string): string[] => {
  const startCol = startCell.charCodeAt(0);
  const startRow = parseInt(startCell.slice(1), 10);
  const endCol = endCell.charCodeAt(0);
  const endRow = parseInt(endCell.slice(1), 10);

  const range: string[] = [];
  for (
    let row = Math.min(startRow, endRow);
    row <= Math.max(startRow, endRow);
    row++
  ) {
    for (
      let col = Math.min(startCol, endCol);
      col <= Math.max(startCol, endCol);
      col++
    ) {
      range.push(String.fromCharCode(col) + row);
    }
  }
  return range;
};

const Spreadsheet = () => {
  const {
    cells,
    selectedCell,
    setSelectedCell,
    updateCell,
    addRow,
    addColumn,
    deleteRow,
    deleteColumn,
    openFindReplace,
  } = useSpreadsheet();

  const [isDragging, setIsDragging] = useState(false);
  const [startCell, setStartCell] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<string[]>([]);

  const handleMouseDown = useCallback(
    (cellId: string) => {
      setIsDragging(true);
      setStartCell(cellId);
      setSelectedRange([cellId]);
      setSelectedCell(cellId);
    },
    [setSelectedCell]
  );

  const handleMouseEnter = useCallback(
    (cellId: string) => {
      if (isDragging && startCell) {
        setSelectedRange(calculateRange(startCell, cellId));
      }
    },
    [isDragging, startCell]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (selectedRange.length > 1) {
      applyDraggedValues(selectedRange);
    }
    setStartCell(null);
  }, [selectedRange]);

  const applyDraggedValues = (range: string[]) => {
    if (range.length > 1) {
      const firstValue = cells[range[0]] || "";
      range.forEach((cellId) => updateCell(cellId, firstValue));
    }
  };

  return (
    <div
      className="spreadsheet-wrapper"
      onMouseUp={handleMouseUp}
      style={{ userSelect: "none" }}
    >
      {}
      {selectedCell && (
        <Toolbar
          onAddRow={addRow}
          onAddColumn={addColumn}
          onDeleteRow={() =>
            deleteRow(parseInt(selectedCell?.slice(1) || "0", 10))
          }
          onDeleteColumn={() => deleteColumn(selectedCell)}
          onFindReplace={openFindReplace}
        />
      )}

      {}
      <SaveLoadButtons />

      {}
      <div className="spreadsheet-container">
        <div className="spreadsheet">
          {}
          <div className="header-row">
            <div className="corner-cell"></div> {}
            {[...Array(COLS)].map((_, col) => (
              <div key={col} className="header-cell">
                {String.fromCharCode(65 + col)} {}
              </div>
            ))}
          </div>

          {}
          {[...Array(ROWS)].map((_, row) => (
            <div key={row} className="row">
              {}
              <div className="header-cell">{row + 1}</div>

              {}
              {[...Array(COLS)].map((_, col) => {
                const cellId = `${String.fromCharCode(65 + col)}${row + 1}`;
                return (
                  <Cell
                    key={cellId}
                    id={cellId}
                    value={cells[cellId] || ""}
                    isSelected={selectedCell === cellId}
                    onSelect={setSelectedCell}
                    onMouseDown={() => handleMouseDown(cellId)}
                    onMouseEnter={() => handleMouseEnter(cellId)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Spreadsheet;
