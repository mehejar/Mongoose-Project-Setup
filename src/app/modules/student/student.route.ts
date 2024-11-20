import express from "express"
import { studentController } from "./student.controller"

const router = express.Router()

// will call controller file

router.post('/create-student', studentController.createStudent)
router.get('/', studentController.getAllStudents)
router.get('/:id', studentController.getSingleStudent)

export const studentRoute = router;
