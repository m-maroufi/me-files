import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema/filesTable";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const userId = await auth.api
    .getSession({
      headers: req.headers,
    })
    .then((session) => session?.user?.id);
  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        status: 401,
        data: "Unauthorized",
      },
      { status: 401 }
    );
  }
  try {
    const uploads = await db
      .select()
      .from(files)
      .where(eq(files.userId, userId))
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
