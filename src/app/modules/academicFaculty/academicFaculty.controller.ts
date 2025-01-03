import catchAsync from "../../utils/catchAssync"
import { academicFacultyServices } from "./academicFaculty.service"

const createAcademicFaculty = catchAsync(async (req, res) => {
    const payload = req.body
    const result = await academicFacultyServices.createAcademicFacultyIntoDB(payload)


    res.status(200).json({
        success: true,
        message: "Academic Faculty is Created",

        date: result
    })
})

const getAllAcademicFaculty = catchAsync(async (req, res) => {
    const result = await academicFacultyServices.getAllAcademicFaculty()


    res.status(200).json({
        success: true,
        message: "Academic Faculties are retrieved",

        data: result
    })
})

const getAAcademicFaculty = catchAsync(async (req, res) => {
    const academicFacultyId = req.params._id
    const result = await academicFacultyServices.getASingleAcademicFaculty(academicFacultyId)


    res.status(200).json({
        success: true,
        message: "Here is an Academic Faculty",

        data: result
    })
})

const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await academicFacultyServices.updateAcademicFacultyIntoDB(
        facultyId,
        req.body,
    );

    res.status(200).json({
        success: true,
        message: "Academic Faculty Updated",

        date: result
    })
});

export const academicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getAAcademicFaculty,
    updateAcademicFaculty
}