ALTER TABLE "files" ADD COLUMN "fileType" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "fileSize" integer DEFAULT 0 NOT NULL;