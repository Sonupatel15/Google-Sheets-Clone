"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";

interface FormulaBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  cellRef: string;
}

const FormulaBar: React.FC<FormulaBarProps> = ({
  value,
  onChange,
  onSubmit,
  cellRef,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [cellRef]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (value.trim() !== "") {
          onSubmit(value);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onChange("");
      }
    },
    [value, onSubmit, onChange]
  );

  return (
    <div className="formula-bar" role="region" aria-label="Formula Bar">
      {}
      <div className="formula-cell-ref" title={`Cell: ${cellRef}`}>
        {cellRef}
      </div>

      {}
      <div className="formula-equals">=</div>

      {}
      <input
        ref={inputRef}
        type="text"
        className="formula-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter formula or value"
        aria-label="Formula Input"
      />
    </div>
  );
};

export default FormulaBar;
