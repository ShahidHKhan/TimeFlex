CREATE TABLE "favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"stretch_id" integer NOT NULL,
	"name" text NOT NULL,
	"image" text,
	"reps" integer,
	"muscle_group" text,
	"created_at" timestamp DEFAULT now()
);
