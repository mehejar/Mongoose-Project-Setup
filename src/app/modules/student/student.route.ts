import express from "express"
import { studentController } from "./student.controller"

const router = express.Router()

// will call controller file

router.get('/', studentController.getAllStudents)
router.get('/:id', studentController.getSingleStudent)
router.patch('/:id', studentController.updateStudentIntoDb)

export const studentRoute = router;
