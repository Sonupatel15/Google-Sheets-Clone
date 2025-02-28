"use client";

import { useCallback } from "react";
import { useSpreadsheet } from "../context/SpreadsheetContext";

const SaveLoadButtons = () => {
  const { saveToLocal, loadFromLocal, saveToDatabase, loadFromDatabase } =
    useSpreadsheet();

  const handleSaveToLocal = useCallback(() => {
    try {
      saveToLocal();
      setTimeout(() => alert("Spreadsheet saved locally."), 100);
    } catch (error) {
      console.warn("Error saving locally:", error);
      alert("Failed to save locally.");
    }
  }, [saveToLocal]);

  const handleLoadFromLocal = useCallback(() => {
    try {
      loadFromLocal();
      setTimeout(() => alert("Spreadsheet loaded from local storage."), 100);
    } catch (error) {
      console.warn("Error loading locally:", error);
      alert("Failed to load from local storage.");
    }
  }, [loadFromLocal]);

  const handleSaveToDatabase = useCallback(async () => {
    if (!confirm("Are you sure you want to save to the database?")) return;

    try {
      await saveToDatabase();
      setTimeout(() => alert("Spreadsheet saved to database."), 100);
    } catch (error) {
      console.error("Error saving to database:", error);
      alert("Failed to save to the database.");
    }
  }, [saveToDatabase]);

  const handleLoadFromDatabase = useCallback(async () => {
    if (!confirm("Are you sure you want to load from the database?")) return;

    try {
      await loadFromDatabase();
      setTimeout(() => alert("Spreadsheet loaded from database."), 100);
    } catch (error) {
      console.error("Error loading from database:", error);
      alert("Failed to load from the database.");
    }
  }, [loadFromDatabase]);

  return (
    <div className="save-load-buttons">
      <button className="btn" onClick={handleSaveToLocal}>
        Save (Local)
      </button>
      <button className="btn" onClick={handleLoadFromLocal}>
        Load (Local)
      </button>
      <button className="btn btn-db" onClick={handleSaveToDatabase}>
        Save (DB)
      </button>
      <button className="btn btn-db" onClick={handleLoadFromDatabase}>
        Load (DB)
      </button>
    </div>
  );
};

export default SaveLoadButtons;
