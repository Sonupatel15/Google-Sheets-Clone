# Google Sheets Clone

## Objective  
This project aims to develop a web application that closely mimics the user interface and core functionalities of Google Sheets, focusing on:  
- Mathematical and data quality functions  
- Seamless data entry  
- Key UI interactions  

---

## Features  

### 1. Spreadsheet Interface  
- **User Interface:**  
  - Implements a layout similar to Google Sheets, including a toolbar, formula bar, and structured cell grid.  
- **Drag Functions:**  
  - Supports drag functionality for cell content, formulas, and selections.  
- **Cell Dependencies:**  
  - Ensures accurate formula updates when referenced cells change.  
  - Supports operations such as `=A1 + A5`.  
- **Cell Formatting:**  
  - Supports basic formatting options, including bold, italics, font size, and color.  
  - Allows adding, deleting, and resizing rows and columns.  

![Spreadsheet Interface](https://github.com/user-attachments/assets/0d4961cf-1c95-458c-a83f-33222f894d49)  

---

### 2. Mathematical Functions  
This application supports common mathematical functions, including:  

1. **SUM** – Calculates the sum of a range of cells.  
2. **AVERAGE** – Computes the average of a range of cells.  
3. **MAX** – Returns the maximum value from a range of cells.  
4. **MIN** – Returns the minimum value from a range of cells.  
5. **COUNT** – Counts the number of numeric values in a selected range.  

#### Examples  

**SUM Function**  
![SUM Function](https://github.com/user-attachments/assets/426b9060-b8d8-4944-91d1-32aa233aa9c2)  

**AVERAGE Function**  
![AVERAGE Function](https://github.com/user-attachments/assets/b24f3ce1-610f-4401-9f05-c2d5116f9144)  

**MAX Function**  
![MAX Function](https://github.com/user-attachments/assets/aa41f00a-536a-4a70-8fa2-ec500e8574a8)  

**MIN Function**  
![MIN Function](https://github.com/user-attachments/assets/d5d27ba6-d9b3-4c3d-acc3-d86498c3f61c)  

**COUNT Function**  
![COUNT Function](https://github.com/user-attachments/assets/dea858a7-24a9-49f1-a595-f669b3ab0a52)  

---

### 3. Data Quality Functions  
Includes essential functions for improving data quality:  

1. **TRIM** – Removes leading and trailing whitespace from cell content.  
2. **UPPER** – Converts text in a cell to uppercase.  
3. **LOWER** – Converts text in a cell to lowercase.  
4. **REMOVE_DUPLICATES** – Eliminates duplicate rows from a selected range.  
5. **FIND_AND_REPLACE** – Searches for and replaces specific text within a range of cells.  

#### Examples  

**TRIM Function**  
![TRIM Function](https://github.com/user-attachments/assets/b56270d0-9363-4b08-944a-78749afff953)  

**UPPER Function**  
![UPPER Function](https://github.com/user-attachments/assets/e50d1e6b-b8eb-478e-9791-5b2a6fa14596)  

**LOWER Function**  
![LOWER Function](https://github.com/user-attachments/assets/f6e45722-a734-447f-9f68-75ad9557dec5)  

---

## Data Persistence  

The application supports saving and retrieving spreadsheet data.  

**Saving a Spreadsheet**  
![Saving Spreadsheet](https://github.com/user-attachments/assets/afe27119-6bf6-4ea1-b49e-85d2c98e5611)  

**Accessing Saved Spreadsheets**  
![Database View](https://github.com/user-attachments/assets/3d912e7e-e1c3-482a-8091-363d1894444f)  

---

## Tech Stack  

- **Frontend:** React, Next.js, Tailwind CSS  
- **Backend:** Node.js, Express.js, Prisma  
- **Database:** PostgreSQL  

---







