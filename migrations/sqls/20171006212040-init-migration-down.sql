ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "users_fk0";

ALTER TABLE "tests" DROP CONSTRAINT IF EXISTS "tests_fk0";

ALTER TABLE "teacher_subject" DROP CONSTRAINT IF EXISTS "teacher_subject_fk0";

ALTER TABLE "teacher_subject" DROP CONSTRAINT IF EXISTS "teacher_subject_fk1";

ALTER TABLE "subject_group" DROP CONSTRAINT IF EXISTS "subject_group_fk0";

ALTER TABLE "subject_group" DROP CONSTRAINT IF EXISTS "subject_group_fk1";

ALTER TABLE "subject_group" DROP CONSTRAINT IF EXISTS "subject_group_fk2";

ALTER TABLE "subject_group" DROP CONSTRAINT IF EXISTS "subject_group_fk3";

ALTER TABLE "subject_group_task" DROP CONSTRAINT IF EXISTS "subject_group_task_fk0";

ALTER TABLE "subject_group_task" DROP CONSTRAINT IF EXISTS "subject_group_task_fk1";

ALTER TABLE "subject_group_task" DROP CONSTRAINT IF EXISTS "subject_group_task_fk2";

ALTER TABLE "themes" DROP CONSTRAINT IF EXISTS "themes_fk0";

ALTER TABLE "tasks" DROP CONSTRAINT IF EXISTS "tasks_fk0";

ALTER TABLE "tasks" DROP CONSTRAINT IF EXISTS "tasks_fk1";

ALTER TABLE "questions" DROP CONSTRAINT IF EXISTS "questions_fk0";

ALTER TABLE "task_file" DROP CONSTRAINT IF EXISTS "task_file_fk0";

ALTER TABLE "task_file" DROP CONSTRAINT IF EXISTS "task_file_fk1";

ALTER TABLE "answers" DROP CONSTRAINT IF EXISTS "answers_fk0";

ALTER TABLE "tests_results" DROP CONSTRAINT IF EXISTS "tests_results_fk0";

ALTER TABLE "tests_results" DROP CONSTRAINT IF EXISTS "tests_results_fk1";

ALTER TABLE "tests_results" DROP CONSTRAINT IF EXISTS "tests_results_fk2";

ALTER TABLE "questions_results" DROP CONSTRAINT IF EXISTS "questions_results_fk0";

ALTER TABLE "questions_results" DROP CONSTRAINT IF EXISTS "questions_results_fk1";

DROP TABLE IF EXISTS "users";

DROP TABLE IF EXISTS "subjects";

DROP TABLE IF EXISTS "tests";

DROP TABLE IF EXISTS "learning_semesters";

DROP TABLE IF EXISTS "groups";

DROP TABLE IF EXISTS "teacher_subject";

DROP TABLE IF EXISTS "subject_group";

DROP TABLE IF EXISTS "subject_group_task";

DROP TABLE IF EXISTS "themes";

DROP TABLE IF EXISTS "files";

DROP TABLE IF EXISTS "tasks";

DROP TABLE IF EXISTS "questions";

DROP TABLE IF EXISTS "task_file";

DROP TABLE IF EXISTS "answers";

DROP TABLE IF EXISTS "tests_results";

DROP TABLE IF EXISTS "questions_results";
