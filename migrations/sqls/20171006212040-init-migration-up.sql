CREATE TABLE "users" (
	"id" serial NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"middle_name" VARCHAR(255) NOT NULL,
	"group_id" integer NULL,
	"role" varchar NOT NULL,
	"password" varchar NOT NULL,
	"is_admin" BOOLEAN NOT NULL,
	"science_degree" VARCHAR(255) NOT NULL,
	"email" VARCHAR(255) NOT NULL UNIQUE,
	"phone" VARCHAR(255) NOT NULL,
	"registered_at" TIMESTAMP NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "subjects" (
	"id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	CONSTRAINT subjects_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tests" (
	"id" serial NOT NULL,
	"subject_id" integer NOT NULL,
	"title" varchar NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT tests_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "learning_semesters" (
	"id" serial NOT NULL,
	"from_date" timestamp NOT NULL,
	"to_date" timestamp NOT NULL,
	CONSTRAINT learning_semesters_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "groups" (
	"id" serial NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	CONSTRAINT groups_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "teacher_subject" (
	"teacher_id" integer NOT NULL,
	"subject_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "subject_group" (
	"id" serial NOT NULL,
	"subject_id" integer NOT NULL,
	"group_id" integer NOT NULL,
	"teacher_id" integer NOT NULL,
	"learning_semester_id" integer NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT subject_group_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "subject_group_task" (
	"id" serial NOT NULL,
	"task_id" integer NOT NULL,
	"student_id" integer NOT NULL,
	"subject_group_id" integer NOT NULL,
	"status" VARCHAR(255) NOT NULL,
	"rating" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"updated_at" TIMESTAMP NOT NULL,
	"deadline_date" TIMESTAMP NOT NULL,
	CONSTRAINT subject_group_task_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "themes" (
	"id" serial NOT NULL,
	"subject_id" integer NOT NULL,
	"title" VARCHAR(255) NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"updated_at" TIMESTAMP NOT NULL,
	CONSTRAINT themes_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "files" (
	"id" serial NOT NULL,
	"path" VARCHAR(255) NOT NULL,
	"mime_type" VARCHAR(255) NOT NULL,
	"uploaded_at" TIMESTAMP NOT NULL,
	CONSTRAINT files_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tasks" (
	"id" serial NOT NULL UNIQUE,
	"theme_id" integer NOT NULL,
	"test_id" integer NOT NULL,
	"title" VARCHAR(255) NOT NULL,
	"content" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"updated_at" TIMESTAMP NOT NULL,
	CONSTRAINT tasks_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "questions" (
	"id" serial NOT NULL,
	"type" VARCHAR(255) NOT NULL,
	"test_id" integer NOT NULL,
	"title" varchar NOT NULL,
	"content" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	"updated_at" TIMESTAMP NOT NULL,
	CONSTRAINT questions_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "task_file" (
	"task_id" integer NOT NULL,
	"file_id" integer NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "answers" (
	"id" serial NOT NULL,
	"question_id" integer NOT NULL,
	"content" TEXT NOT NULL,
	"is_correct" BOOLEAN NOT NULL,
	CONSTRAINT answers_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tests_results" (
	"id" serial NOT NULL,
	"subject_group_id" integer NOT NULL,
	"test_id" integer NOT NULL,
	"student_id" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	CONSTRAINT tests_results_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "questions_results" (
	"id" serial NOT NULL,
	"test_result_id" integer NOT NULL,
	"question_id" integer NOT NULL,
	"is_correct" BOOLEAN NOT NULL,
	CONSTRAINT questions_results_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "invited_users" (
	"id" serial NOT NULL,
	"email" VARCHAR(255) NOT NULL,
	"token" VARCHAR(255) NOT NULL,
	"invited_at" TIMESTAMP NOT NULL,
	"role" VARCHAR(255) NOT NULL,
	CONSTRAINT invited_users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("group_id") REFERENCES "groups"("id");


ALTER TABLE "tests" ADD CONSTRAINT "tests_fk0" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id");



ALTER TABLE "teacher_subject" ADD CONSTRAINT "teacher_subject_fk0" FOREIGN KEY ("teacher_id") REFERENCES "users"("id");
ALTER TABLE "teacher_subject" ADD CONSTRAINT "teacher_subject_fk1" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id");

ALTER TABLE "subject_group" ADD CONSTRAINT "subject_group_fk0" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id");
ALTER TABLE "subject_group" ADD CONSTRAINT "subject_group_fk1" FOREIGN KEY ("group_id") REFERENCES "groups"("id");
ALTER TABLE "subject_group" ADD CONSTRAINT "subject_group_fk2" FOREIGN KEY ("teacher_id") REFERENCES "users"("id");
ALTER TABLE "subject_group" ADD CONSTRAINT "subject_group_fk3" FOREIGN KEY ("learning_semester_id") REFERENCES "learning_semesters"("id");

ALTER TABLE "subject_group_task" ADD CONSTRAINT "subject_group_task_fk0" FOREIGN KEY ("task_id") REFERENCES "tasks"("id");
ALTER TABLE "subject_group_task" ADD CONSTRAINT "subject_group_task_fk1" FOREIGN KEY ("student_id") REFERENCES "users"("id");
ALTER TABLE "subject_group_task" ADD CONSTRAINT "subject_group_task_fk2" FOREIGN KEY ("subject_group_id") REFERENCES "subject_group"("id");

ALTER TABLE "themes" ADD CONSTRAINT "themes_fk0" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id");


ALTER TABLE "tasks" ADD CONSTRAINT "tasks_fk0" FOREIGN KEY ("theme_id") REFERENCES "themes"("id");
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_fk1" FOREIGN KEY ("test_id") REFERENCES "tests"("id");

ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("test_id") REFERENCES "tests"("id");

ALTER TABLE "task_file" ADD CONSTRAINT "task_file_fk0" FOREIGN KEY ("task_id") REFERENCES "tasks"("id");
ALTER TABLE "task_file" ADD CONSTRAINT "task_file_fk1" FOREIGN KEY ("file_id") REFERENCES "files"("id");

ALTER TABLE "answers" ADD CONSTRAINT "answers_fk0" FOREIGN KEY ("question_id") REFERENCES "questions"("id");

ALTER TABLE "tests_results" ADD CONSTRAINT "tests_results_fk0" FOREIGN KEY ("subject_group_id") REFERENCES "subject_group"("id");
ALTER TABLE "tests_results" ADD CONSTRAINT "tests_results_fk1" FOREIGN KEY ("test_id") REFERENCES "tests"("id");
ALTER TABLE "tests_results" ADD CONSTRAINT "tests_results_fk2" FOREIGN KEY ("student_id") REFERENCES "users"("id");

ALTER TABLE "questions_results" ADD CONSTRAINT "questions_results_fk0" FOREIGN KEY ("test_result_id") REFERENCES "tests_results"("id");
ALTER TABLE "questions_results" ADD CONSTRAINT "questions_results_fk1" FOREIGN KEY ("question_id") REFERENCES "questions"("id");
