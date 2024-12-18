import validRequest from "../../middlewares/validRequest";
import { offeredCourseController } from "./offeredCourse.controller";
import express from "express"
import { OfferedCourseValidations } from "./offeredCourse.validation";


const router = express.Router();


router.post(
    '/create-offered-course', validRequest(OfferedCourseValidations.createOfferedCourseValidationSchema), offeredCourseController.createOfferedCourse,
);

export const offerCourseRoute = router