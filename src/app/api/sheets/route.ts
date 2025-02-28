import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import syncDatabase from "@/lib/sync";

// Ensure database schema is synchronized on startup
syncDatabase().catch((error) => {
  console.error("Database synchronization failed:", error);
});


export async function GET() {
  try {
    // Retrieve all spreadsheet records from the database
    const spreadsheets = await prisma.spreadsheet.findMany();

    // Return the retrieved spreadsheets as a JSON response
    return NextResponse.json(spreadsheets, { status: 200 });
  } catch (error) {
    console.error("Error loading spreadsheets:", error);

    // Return an error response if fetching fails
    return NextResponse.json(
      { error: "Failed to load spreadsheets" },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    // Read request body as text
    const body = await req.text();

    // Parse request body JSON
    const { name, data } = JSON.parse(body);

    // Validate required fields
    if (!name || !data) {
      return NextResponse.json(
        { error: "Missing required fields: name or data" },
        { status: 400 }
      );
    }

    // Store the new spreadsheet in the database
    const spreadsheet = await prisma.spreadsheet.create({
      data: { name, data },
    });

    // Return success response with the new spreadsheet ID
    return NextResponse.json(
      { message: "Spreadsheet saved successfully", id: spreadsheet.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving spreadsheet:", error);

    // Return an error response if JSON parsing fails or database insertion fails
    return NextResponse.json(
      { error: "Invalid request format or failed to save spreadsheet" },
      { status: 500 }
    );
  }
}
