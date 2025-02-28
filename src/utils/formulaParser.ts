import { evaluate } from "mathjs";

export const evaluateFormula = (formula: string, cellData: { [key: string]: string }): string => {
  if (!formula.startsWith("=")) return formula;

  const expression = formula.slice(1).toUpperCase(); 

  const replacedExpression = expression.replace(/[A-Z]\d+/g, (match) => cellData[match] || "0");

  try {
    let result;
    if (expression.startsWith("SUM(")) {
      result = sumFunction(expression, cellData);
    } else if (expression.startsWith("AVERAGE(")) {
      result = averageFunction(expression, cellData);
    } else if (expression.startsWith("MAX(")) {
      result = maxFunction(expression, cellData);
    } else if (expression.startsWith("MIN(")) {
      result = minFunction(expression, cellData);
    } else if (expression.startsWith("COUNT(")) {
      result = countFunction(expression, cellData);
    } else if (expression.startsWith("TRIM(")) {
      result = trimFunction(expression, cellData);
    } else if (expression.startsWith("UPPER(")) {
      result = upperFunction(expression, cellData);
    } else if (expression.startsWith("LOWER(")) {
      result = lowerFunction(expression, cellData);
    } else {
      result = evaluate(replacedExpression).toString();
    }


    if (result === "ERROR") {
      return formula;
    }

    return result;
  } catch {
    return formula; 
  }
};


const parseRange = (range: string, cellData: { [key: string]: string }): number[] => {
  const match = range.match(/^([A-Z]+)(\d+):([A-Z]+)(\d+)$/);
  if (!match) return [];

  const [_, startCol, startRow, endCol, endRow] = match;
  const values: number[] = [];

  for (let row = Number(startRow); row <= Number(endRow); row++) {
    for (let col = startCol.charCodeAt(0); col <= endCol.charCodeAt(0); col++) {
      const cell = `${String.fromCharCode(col)}${row}`;
      const value = parseFloat(cellData[cell]) || 0;
      values.push(value);
    }
  }
  return values;
};

const extractSingleArgument = (expression: string, cellData: { [key: string]: string }): string => {
  const match = expression.match(/\(([^)]+)\)/);
  if (!match) return "ERROR";
  const cellValue = cellData[match[1]] || "";
  return cellValue.toString();
};

const sumFunction = (expression: string, cellData: { [key: string]: string }): string => {
  const rangeMatch = expression.match(/\(([^)]+)\)/);
  if (!rangeMatch) return "ERROR";

  const values = parseRange(rangeMatch[1], cellData);
  return values.reduce((acc, curr) => acc + curr, 0).toString();
};

const averageFunction = (expression: string, cellData: { [key: string]: string }): string => {
  const rangeMatch = expression.match(/\(([^)]+)\)/);
  if (!rangeMatch) return "ERROR";

  const values = parseRange(rangeMatch[1], cellData);
  return values.length ? (values.reduce((acc, curr) => acc + curr, 0) / values.length).toString() : "0";
};

const maxFunction = (expression: string, cellData: { [key: string]: string }): string => {
  const rangeMatch = expression.match(/\(([^)]+)\)/);
  if (!rangeMatch) return "ERROR";

  const values = parseRange(rangeMatch[1], cellData);
  return values.length ? Math.max(...values).toString() : "ERROR";
};

const minFunction = (expression: string, cellData: { [key: string]: string }): string => {
  const rangeMatch = expression.match(/\(([^)]+)\)/);
  if (!rangeMatch) return "ERROR";

  const values = parseRange(rangeMatch[1], cellData);
  return values.length ? Math.min(...values).toString() : "ERROR";
};

const countFunction = (expression: string, cellData: { [key: string]: string }): string => {
  const rangeMatch = expression.match(/\(([^)]+)\)/);
  if (!rangeMatch) return "ERROR";

  const values = parseRange(rangeMatch[1], cellData);
  return values.filter((val) => !isNaN(val)).length.toString();
};

const trimFunction = (expression: string, cellData: { [key: string]: string }): string => {
  return extractSingleArgument(expression, cellData).trim();
};

const upperFunction = (expression: string, cellData: { [key: string]: string }): string => {
  return extractSingleArgument(expression, cellData).toUpperCase();
};

const lowerFunction = (expression: string, cellData: { [key: string]: string }): string => {
  return extractSingleArgument(expression, cellData).toLowerCase();
};
