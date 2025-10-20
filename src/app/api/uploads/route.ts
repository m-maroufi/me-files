import { db } from "@/lib/db";
import { files } from "@/lib/db/schema/filesTable";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const uploads = await db
      .select()
      .from(files)
      .orderBy(desc(files.uploadDate));
    const response = {
      success: true,
      status: 200,
      data: uploads,
    };
    return NextResponse.json(response);
  } catch (error) {
    const response = {
      success: false,
      status: 500,
      data: error,
    };
    return response;
  }
}
