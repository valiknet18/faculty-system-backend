import express from 'express';
import coursesRepository from '../controllers/courses_controller';

const router = express.Router();

router.get('/', coursesRepository.getCoursesAction.bind(coursesRepository));
router.get('/:course', coursesRepository.getCourseAction.bind(coursesRepository));
router.get('/:course/students', coursesRepository.getStudents.bind(coursesRepository));

export default router;
