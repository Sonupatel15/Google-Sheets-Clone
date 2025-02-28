import { SpreadsheetProvider } from "../../context/SpreadsheetContext";
import Spreadsheet from "../../components/Spreadsheet";
import "../../styles/spreadsheet.css";

export default function Dashboard() {
  return (
    <SpreadsheetProvider>
      {/* Centering the content using flexbox */}
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-center my-4">Google Sheets</h1>

        <div className="w-full flex justify-center">
          <Spreadsheet />
        </div>
      </div>
    </SpreadsheetProvider>
  );
}
