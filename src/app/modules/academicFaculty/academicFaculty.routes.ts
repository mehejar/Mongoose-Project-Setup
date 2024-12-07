import express from 'express'
import validRequest from '../../middlewares/validRequest'
import { academicFacultyController } from './academicFaculty.controller'
import { AcademicValidation } from './academicFaculty.validation'

const router = express.Router()



router.post('/create-academic-faculty', validRequest(AcademicValidation.academicFacultyValidation), academicFacultyController.createAcademicFaculty)
router.get('/', validRequest(AcademicValidation.academicFacultyValidation), academicFacultyController.getAllAcademicFaculty)
router.get('/:_id', validRequest(AcademicValidation.academicFacultyValidation), academicFacultyController.getAAcademicFaculty)




export const AcademicFacultyRoutes = router