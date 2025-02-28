export const calculateRange = (startCell: string, endCell: string): string[] => {
    const startCol = startCell.charCodeAt(0);
    const startRow = parseInt(startCell.slice(1), 10);
    const endCol = endCell.charCodeAt(0);
    const endRow = parseInt(endCell.slice(1), 10);
  
    const range: string[] = [];
    for (let col = Math.min(startCol, endCol); col <= Math.max(startCol, endCol); col++) {
      for (let row = Math.min(startRow, endRow); row <= Math.max(startRow, endRow); row++) {
        range.push(String.fromCharCode(col) + row);
      }
    }
    return range;
  };
  