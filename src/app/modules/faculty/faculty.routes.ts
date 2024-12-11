import express from "express"
import { FacultyControllers } from "./faculty.controller";
import validRequest from "../../middlewares/validRequest";
import { facultyValidations } from "./faculty.validation";

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
    '/:id',
    validRequest(facultyValidations.updateFacultyValidationSchema),
    FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;