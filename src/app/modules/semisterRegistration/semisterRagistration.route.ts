import express from "express"
import validRequest from "../../middlewares/validRequest";
import { SemesterRegistrationValidations } from "./semisterRagistration.validation";
import { semesterRegistrationController } from "./semisterRagistration.controller";

const router = express.Router()

// will call controller file

router.post('/create-semister-registration', validRequest(SemesterRegistrationValidations.createSemisterRegistrationValidationSchema,), semesterRegistrationController.createSemisterRagistrations)
router.get('/', semesterRegistrationController.getAllSemisterRagistrations)
router.get('/:_id', semesterRegistrationController.getASingleSemisterRagistrations)

export const semesterRegistrationRoute = router;
