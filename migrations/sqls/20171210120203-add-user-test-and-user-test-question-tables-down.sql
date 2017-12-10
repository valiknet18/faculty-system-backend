ALTER TABLE user_test_question DROP CONSTRAINT user_test_question_user_test_id_fk;
ALTER TABLE user_test_question DROP CONSTRAINT user_test_question_user_question_id_fk;

ALTER TABLE user_test DROP CONSTRAINT user_test_test_id_fk;
ALTER TABLE user_test DROP CONSTRAINT user_test_student_id_fk;

DROP TABLE user_test_question;
DROP TABLE user_test;
