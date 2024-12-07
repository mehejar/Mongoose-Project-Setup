import { AcademicDepartmentServices } from './academicDepertment.service';
import catchAsync from '../../utils/catchAssync';

const createAcademicDepartmemt = catchAsync(async (req, res) => {
    const result =
        await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);


    res.status(200).json({
        success: true,
        message: "Successfully Create a Academic Department",

        date: result
    })
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
    const result =
        await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();


    res.status(200).json({
        success: true,
        message: "Academic Departments are here",

        date: result
    })
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result =
        await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
            departmentId,
        );


    res.status(200).json({
        success: true,
        message: "Get Single Academic Department",

        date: result
    })
});

const updateAcademicDeartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result =
        await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
            departmentId,
            req.body,
        );


    res.status(200).json({
        success: true,
        message: "Updated Academic Department",

        date: result
    })
});

export const AcademicDepartmentControllers = {
    createAcademicDepartmemt,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDeartment,
};