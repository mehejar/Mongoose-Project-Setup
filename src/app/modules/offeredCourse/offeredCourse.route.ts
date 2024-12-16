import { offeredCourseController } from "./offeredCourse.controller";
import express from "express"


const router = express.Router();


router.post(
    '/create-offered-course', offeredCourseController.createOfferedCourse,
);

export const offerCourseRoute = router