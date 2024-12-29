import catchAsync from "../../utils/catchAssync"
import { AppError } from "../academicDepertment/academicDepertment.model"
import { UserServices } from "./user.service"
// import studentValidationSchema from "../student/student-zod-validation"



const createStudent = catchAsync(async (req, res) => {  // ZOD Valiator Schema
    const { password, student: studentData } = req.body

    // will cal service func to send this data
    const result = await UserServices.createStudentIntoDB(password, studentData)

    // send response
    res.status(200).json({
        success: true,
        message: "Student is Created",
        date: result
    })
})
const createFaculty = catchAsync(async (req, res) => {  // ZOD Valiator Schema
    const { password, faculty: facultyData } = req.body

    // will cal service func to send this data
    const result = await UserServices.createFacultyIntoDB(password, facultyData)

    // send response
    res.status(200).json({
        success: true,
        message: "Faculty is Created",
        date: result
    })
})
const createAdmin = catchAsync(async (req, res) => {  // ZOD Valiator Schema
    const { password, admin: adminData } = req.body

    // will cal service func to send this data
    const result = await UserServices.createAdminIntoDB(password, adminData)

    // send response
    res.status(200).json({
        success: true,
        message: "Admin is Created",
        date: result
    })
})

const getMe = catchAsync(async (req, res) => {
    const decoded = req.user

    const result = await UserServices.getMe(decoded);
    res.status(200).json({
        success: true,
        message: "Your Details is here",
        date: result
    })
})

export const UserController = {
    createStudent,
    createFaculty,
    createAdmin,
    getMe
}