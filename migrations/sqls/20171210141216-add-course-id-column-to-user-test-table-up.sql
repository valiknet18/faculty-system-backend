ALTER TABLE user_test ADD COLUMN course_id INTEGER NOT NULL;

ALTER TABLE user_test ADD CONSTRAINT user_test_course_id_fk FOREIGN KEY (course_id) REFERENCES subject_group(id) ON DELETE CASCADE;
