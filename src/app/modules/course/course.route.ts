import express from "express"
import validRequest from "../../middlewares/validRequest";
import { CourseValidations } from "./course.validation";
import { courseController } from "./course.controller";

const router = express.Router();


router.post(
    '/create-course',
    validRequest(CourseValidations.createCourseValidationSchema), courseController.createCourse,
);
router.put('/courseId/assign-faculties', validRequest(CourseValidations.facultiesWithCourseValidationSchema), courseController.assignFaculties)

router.delete('/courseId/remove-faculties', validRequest(CourseValidations.facultiesWithCourseValidationSchema), courseController.removeFaculties)

router.get('/:id', courseController.getSingleCourse)
router.patch('/:id', validRequest(CourseValidations.updateCourseValidationSchema), courseController.updateCourse)
router.get('/', courseController.getAllCourses)


export const CourseRoute = router
