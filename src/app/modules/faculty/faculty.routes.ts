import express from "express"
import { facultyController } from "./faculty.controller"

const router = express.Router()

// will call controller file

router.get('/', facultyController.getAllFaculty)

export const facultyRoute = router;