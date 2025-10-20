import { db } from "@/lib/db";
import { files } from "@/lib/db/schema/filesTable";
import { eq } from "drizzle-orm"; // اضافه کردن eq برای شرط where
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
const utapi = new UTApi();
export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;

  // اعتبارسنجی اولیه: ID نمی‌تونه خالی باشه
  if (!id) {
    return NextResponse.json(
      { error: "شناسه فایل الزامی است." },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    // مرحله 1: دریافت فایل از دیتابیس
    const existingFile = await db
      .select()
      .from(files)
      .where(eq(files.id, id))
      .limit(1);

    if (!existingFile || existingFile.length === 0) {
      return NextResponse.json(
        { error: "فایل مورد نظر یافت نشد." },
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const file = existingFile[0];

    // مرحله 2: حذف فایل از UploadThing (اگر URL موجود باشه)
    if (file.fileKey) {
      try {
        await utapi.deleteFiles(file.fileKey);
      } catch (uploadthingError) {
        // لاگ ارور برای دیباگ
        console.error("خطا در حذف فایل از UploadThing:", uploadthingError);
        // ادامه به حذف از DB، چون ارور UploadThing نباید مانع حذف محلی بشه
      }
    } else {
      console.warn("URL فایل موجود نیست، حذف از UploadThing رد شد.");
    }

    // مرحله 3: حذف از دیتابیس
    await db.delete(files).where(eq(files.id, id));

    // پاسخ موفقیت‌آمیز
    return NextResponse.json(
      { message: "فایل با موفقیت حذف شد." },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    // مدیریت ارورهای کلی (مثل مشکلات اتصال به DB)
    console.error("خطای سرور در حذف فایل:", error);

    return NextResponse.json(
      { error: "خطای داخلی سرور رخ داد. لطفاً دوباره تلاش کنید." },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
