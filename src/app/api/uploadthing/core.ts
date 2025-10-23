import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema/filesTable";
import { createUploadthing, FileRouter } from "uploadthing/next";
const f = createUploadthing();
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  mediaUploader: f({
    image: { maxFileSize: "4MB" },
    video: { maxFileSize: "1GB" },
  })
    .middleware(async ({ req }) => {
      // This code runs before upload
      // You can use it to authenticate users, for example
      const userId = await auth.api
        .getSession({
          headers: req.headers,
        })
        .then((session) => session?.user?.id);

      if (!userId) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      try {
        const result = await db
          .insert(files)
          .values({
            name: file.name,
            url: file.ufsUrl,
            fileType: file.type,
            fileSize: file.size,
            fileKey: file.key,
            userId: metadata.userId,
          })
          .returning();

        const jsonResult = result.map((r) => ({
          ...r,
          uploadDate: r.uploadDate.toISOString(), // 👈 تبدیل Date به string
        }));

        return {
          success: true,
          code: 201,
          message: "new file add to database",
          data: jsonResult,
          metadata,
        };
      } catch (error) {
        return {
          success: false,
          code: 500,
          message: "server error",
          error: String(error),
          metadata,
        };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
