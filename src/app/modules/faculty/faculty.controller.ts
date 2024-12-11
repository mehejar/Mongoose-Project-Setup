import catchAsync from "../../utils/catchAssync"
import { FacultyServices } from "./faculty.service"

const getAllFaculty = catchAsync(async (req, res) => {
    const result = await FacultyServices.getAllFaculty()
    res.status(200).json({
        success: true,
        message: "Faculties is Retrieve Successfully",
        date: result
    })
})

export const facultyController = {
    getAllFaculty
}