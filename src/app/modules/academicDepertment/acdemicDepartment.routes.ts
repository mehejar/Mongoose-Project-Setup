import express from 'express';
import validRequest from '../../middlewares/validRequest';
import { AcademicDepartmentControllers } from './academicDepertment.controller';
import { AcademicDepartmentValidation } from './academicDepertment.validation';

const router = express.Router();

router.post(
    '/create-academic-department',
    validRequest(
        AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
    ),
    AcademicDepartmentControllers.createAcademicDepartmemt,
);

router.get(
    '/:departmentId',
    AcademicDepartmentControllers.getSingleAcademicDepartment,
);

router.patch(
    '/:departmentId',
    validRequest(
        AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
    ),
    AcademicDepartmentControllers.updateAcademicDeartment,
);

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);

export const AcademicDepartmentRoutes = router;