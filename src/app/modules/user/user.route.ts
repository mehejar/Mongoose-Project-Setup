import express from 'express'
import { UserController } from './user.controller'
import { studentValidationSchemas } from '../student/student-zod-validation'
import validRequest from '../../middlewares/validRequest'
import { FacultyValidation } from '../faculty/faculty.validation'
import { adminValidation } from '../admin/admin.validation'

const router = express.Router()



router.post('/create-student', validRequest(studentValidationSchemas.studentValidationSchema), UserController.createStudent)

router.post('/create-faculty', validRequest(FacultyValidation.facultyValidationSchema), UserController.createFaculty)
router.post('/create-admin', validRequest(adminValidation.adminValidationSchema), UserController.createAdmin)


export const UserRoutes = router