CREATE TABLE "user_test" (
	"id" serial NOT NULL,
	"test_id" integer NULL,
	"student_id" integer NULL,
	"registered_at" TIMESTAMP NOT NULL,
	"ended_at" TIMESTAMP NOT NULL,
	CONSTRAINT user_test_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "user_test_question" (
	"user_test_id" integer NULL,
	"question_id" integer NULL
) WITH (
  OIDS=FALSE
);

ALTER TABLE user_test ADD CONSTRAINT user_test_test_id_fk FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE;
ALTER TABLE user_test ADD CONSTRAINT user_test_student_id_fk FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE user_test_question ADD CONSTRAINT user_test_question_user_test_id_fk FOREIGN KEY (user_test_id) REFERENCES user_test(id) ON DELETE CASCADE;
ALTER TABLE user_test_question ADD CONSTRAINT user_test_question_user_question_id_fk FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE;
