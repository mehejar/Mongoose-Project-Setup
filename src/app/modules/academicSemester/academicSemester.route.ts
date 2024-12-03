import express from "express"
import { AcademicSemesterController } from "./academicSemester.controller";
import validRequest from "../../middlewares/validRequest";
import { academicSemesterValidationSchema } from "./academicSemester.validation";

const router = express.Router()

// will call controller file

router.post('/create-academic-semester',
    validRequest(academicSemesterValidationSchema),
    AcademicSemesterController.createAcademicSemester)

export const academicSemesterRoute = router;
