"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { evaluateFormula } from "../utils/formulaParser";

interface CellStyles {
  [key: string]: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    textAlign?: "left" | "center" | "right";
    fontSize?: string;
  };
}

interface SpreadsheetContextType {
  cells: { [key: string]: string };
  cellStyles: CellStyles;
  selectedCell: string | null;
  numRows: number;
  numCols: number;
  updateCell: (id: string, value: string) => void;
  updateCells: (ids: string[], value: string) => void;
  updateCellStyle: (id: string, style: Partial<CellStyles[string]>) => void;
  setSelectedCell: (id: string | null) => void;
  saveToLocal: () => void;
  loadFromLocal: () => void;
  saveToDatabase: () => Promise<void>;
  loadFromDatabase: () => Promise<void>;
  removeDuplicates: () => void;
  findAndReplace: (findText: string, replaceText: string) => void;
  addRow: () => void;
  addColumn: () => void;
  deleteRow: (rowIndex: number) => void;
  deleteColumn: (colLetter: string) => void;
  openFindReplace: () => void;
}

const SpreadsheetContext = createContext<SpreadsheetContextType | null>(null);

export const useSpreadsheet = () => {
  const context = useContext(SpreadsheetContext);
  if (!context) {
    throw new Error("useSpreadsheet must be used within a SpreadsheetProvider");
  }
  return context;
};

export const SpreadsheetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cells, setCells] = useState<{ [key: string]: string }>({});
  const [cellStyles, setCellStyles] = useState<CellStyles>({});
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [numRows, setNumRows] = useState(10);
  const [numCols, setNumCols] = useState(13);

  //  Update cell value (handles formulas)
  const updateCell = (id: string, value: string) => {
    let newValue = value;
    if (value.startsWith("=")) {
      try {
        newValue = evaluateFormula(value, cells);
      } catch (error) {
        console.error("Formula error:", error);
        newValue = "ERROR";
      }
    }
    setCells((prev) => ({ ...prev, [id]: newValue }));
  };

  //  Update multiple cells
  const updateCells = (ids: string[], value: string) => {
    setCells((prev) => {
      const updatedCells = { ...prev };
      ids.forEach((id) => {
        updatedCells[id] = value;
      });
      return updatedCells;
    });
  };

  // Update cell styles
  const updateCellStyle = (id: string, style: Partial<CellStyles[string]>) => {
    setCellStyles((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...style },
    }));
  };

  // Save to Local Storage
  const saveToLocal = () => {
    try {
      localStorage.setItem(
        "spreadsheet",
        JSON.stringify({ cells, cellStyles, numRows, numCols })
      );
    } catch (error) {
      console.error("Failed to save locally:", error);
    }
  };

  // Load from Local Storage
  const loadFromLocal = () => {
    try {
      const data = localStorage.getItem("spreadsheet");
      if (data) {
        const { cells, cellStyles, numRows, numCols } = JSON.parse(data);
        setCells(cells);
        setCellStyles(cellStyles);
        setNumRows(numRows);
        setNumCols(numCols);
      }
    } catch (error) {
      console.error("Failed to load from local storage:", error);
    }
  };

  // Save to Database
  const saveToDatabase = async () => {
    try {
      await axios.post("/api/sheets", {
        name: "Sheet1",
        data: { cells, cellStyles, numRows, numCols },
      });
    } catch (error) {
      console.error("Failed to save to database:", error);
    }
  };

  // Load from Database
  const loadFromDatabase = async () => {
    try {
      const response = await axios.get("/api/sheets");
      if (response.data.length > 0) {
        setCells(response.data[0].data.cells || {});
        setCellStyles(response.data[0].data.cellStyles || {});
        setNumRows(response.data[0].data.numRows || 10);
        setNumCols(response.data[0].data.numCols || 13);
      }
    } catch (error) {
      console.error("Failed to load from database:", error);
    }
  };

  // Add a new row
  const addRow = () => {
    setNumRows((prev) => prev + 1);
  };

  // Add a new column
  const addColumn = () => {
    setNumCols((prev) => prev + 1);
  };

  // Delete a row
  const deleteRow = (rowIndex: number) => {
    setCells((prev) => {
      const updatedCells = Object.fromEntries(
        Object.entries(prev).filter(
          ([key]) => parseInt(key.slice(1), 10) !== rowIndex
        )
      );
      return updatedCells;
    });
    setNumRows((prev) => Math.max(1, prev - 1));
  };

  // Delete a column
  const deleteColumn = (colLetter: string) => {
    setCells((prev) => {
      const updatedCells = Object.fromEntries(
        Object.entries(prev).filter(([key]) => key[0] !== colLetter)
      );
      return updatedCells;
    });
    setNumCols((prev) => Math.max(1, prev - 1));
  };

  // Remove Duplicates
  const removeDuplicates = () => {
    const uniqueValues = new Set(Object.values(cells));
    const newCells: { [key: string]: string } = {};
    let index = 1;
    uniqueValues.forEach((value) => {
      newCells[`A${index}`] = value;
      index++;
    });
    setCells(newCells);
  };

  // Find and Replace
  const findAndReplace = (findText: string, replaceText: string) => {
    setCells((prev) => {
      const updatedCells = Object.fromEntries(
        Object.entries(prev).map(([key, value]) => [
          key,
          value.replace(findText, replaceText),
        ])
      );
      return updatedCells;
    });
  };

  // Open Find & Replace (Placeholder)
  const openFindReplace = () => {
    console.log("Find & Replace opened.");
  };

  return (
    <SpreadsheetContext.Provider
      value={{
        cells,
        cellStyles,
        selectedCell,
        numRows,
        numCols,
        updateCell,
        updateCells,
        updateCellStyle,
        setSelectedCell,
        saveToLocal,
        loadFromLocal,
        saveToDatabase,
        loadFromDatabase,
        removeDuplicates,
        findAndReplace,
        addRow,
        addColumn,
        deleteRow,
        deleteColumn,
        openFindReplace,
      }}
    >
      {children}
    </SpreadsheetContext.Provider>
  );
};
