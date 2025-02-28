"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSpreadsheet } from "../context/SpreadsheetContext";

interface CellProps {
  id: string;
  value: string;
  isSelected: boolean;
  onSelect: (cellId: string) => void;
  onMouseDown: () => void;
  onMouseEnter: () => void;
}

const Cell: React.FC<CellProps> = ({
  id,
  value,
  isSelected,
  onSelect,
  onMouseDown,
  onMouseEnter,
}) => {
  const { updateCell, cellStyles } = useSpreadsheet();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSelected && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      ); // Move cursor to the end
    }
  }, [isSelected]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateCell(id, e.target.value);
    },
    [id, updateCell]
  );

  const handleMouseDownInternal = useCallback(() => {
    onSelect(id); // Select cell
    onMouseDown();
  }, [id, onSelect, onMouseDown]);

  const handleMouseEnterInternal = useCallback(
    (e: React.MouseEvent) => {
      if (e.buttons === 1) {
        onSelect(id);
        onMouseEnter();
      }
    },
    [id, onSelect, onMouseEnter]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const matches = id.match(/[A-Z]+|\d+/g);
      if (!matches || matches.length !== 2) {
        console.error(`Invalid cell ID: ${id}`);
        return;
      }

      const [col, row] = matches;
      const colChar = col.charCodeAt(0);
      const rowNum = parseInt(row);

      let nextCell = id;
      const maxCols = 10;
      const maxRows = 10;

      switch (e.key) {
        case "ArrowRight":
        case "Tab":
          if (colChar - 65 < maxCols - 1) {
            nextCell = `${String.fromCharCode(colChar + 1)}${rowNum}`;
          } else if (e.key === "Tab") {
            nextCell = `A${rowNum + 1}`;
          }
          e.preventDefault();
          break;
        case "ArrowLeft":
          if (colChar > 65) {
            nextCell = `${String.fromCharCode(colChar - 1)}${rowNum}`;
          }
          break;
        case "ArrowDown":
        case "Enter":
          if (rowNum < maxRows) {
            nextCell = `${col}${rowNum + 1}`;
          }
          break;
        case "ArrowUp":
          if (rowNum > 1) {
            nextCell = `${col}${rowNum - 1}`;
          }
          break;
      }

      if (nextCell !== id) {
        onSelect(nextCell);
      }
    },
    [id, onSelect]
  );

  const style = {
    fontWeight: cellStyles[id]?.bold ? "bold" : "normal",
    fontStyle: cellStyles[id]?.italic ? "italic" : "normal",
    textDecoration: cellStyles[id]?.underline ? "underline" : "none",
    textAlign: cellStyles[id]?.textAlign || "left",
    fontSize: cellStyles[id]?.fontSize || "16px",
    width: "100%",
    height: "100%",
    border: "none",
    background: "transparent",
    outline: "none",
  };

  return (
    <div
      className={`cell ${isSelected ? "selected" : ""}`}
      onMouseDown={handleMouseDownInternal}
      onMouseEnter={handleMouseEnterInternal}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: isSelected ? "2px solid #007bff" : "1px solid #ccc",
        padding: "5px",
        width: "120px",
        height: "40px",
        fontSize: "16px",
        overflow: "hidden",
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={style}
      />
    </div>
  );
};

export default Cell;
