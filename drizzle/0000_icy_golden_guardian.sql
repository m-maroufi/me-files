CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"upload_date" timestamp DEFAULT now() NOT NULL,
	"url" varchar(2048) NOT NULL,
	"user_id" uuid
);
