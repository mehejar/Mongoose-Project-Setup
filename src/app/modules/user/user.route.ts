import express from 'express'
import { UserController } from './user.controller'
import { studentValidationSchemas } from '../student/student-zod-validation'
import validRequest from '../../middlewares/validRequest'

const router = express.Router()



router.post('/create-student', validRequest(studentValidationSchemas.studentValidationSchema), UserController.createStudent)




export const UserRoutes = router