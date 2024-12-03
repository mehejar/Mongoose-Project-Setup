import express from "express"
import { AcademicSemesterController } from "./academicSemester.controller";
import validRequest from "../../middlewares/validRequest";
import { academicSemesterValidationSchema } from "./academicSemester.validation";

const router = express.Router()

// will call controller file

router.post('/create-academic-semester',
    validRequest(academicSemesterValidationSchema),
    AcademicSemesterController.createAcademicSemester)
router.get('/', AcademicSemesterController.getAllAcademicSemester)
router.get('/:_id', AcademicSemesterController.getSingleAcademicSemester)

export const academicSemesterRoute = router;
