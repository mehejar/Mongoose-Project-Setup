import express from 'express'
import { UserController } from './user.controller'
import { studentValidationSchemas } from '../student/student-zod-validation'
import validRequest from '../../middlewares/validRequest'
import { facultyValidations } from '../faculty/faculty.validation'
import { adminValidation } from '../admin/admin.validation'
import auth from '../../middlewares/validateToken'
import { USER_ROLE } from './constant'

const router = express.Router()



router.post('/create-student', validRequest(studentValidationSchemas.studentValidationSchema), UserController.createStudent)

router.post('/create-faculty', validRequest(facultyValidations.createFacultyValidationSchema), UserController.createFaculty)
router.post('/create-admin', validRequest(adminValidation.adminValidationSchema), UserController.createAdmin)
router.get('/me', auth(USER_ROLE.admin, USER_ROLE.user), UserController.getMe)


export const UserRoutes = router