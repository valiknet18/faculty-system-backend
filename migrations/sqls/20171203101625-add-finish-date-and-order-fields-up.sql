ALTER TABLE subject_group ADD COLUMN finish_date TIMESTAMP;
ALTER TABLE tasks ADD COLUMN priority INTEGER DEFAULT 0;
