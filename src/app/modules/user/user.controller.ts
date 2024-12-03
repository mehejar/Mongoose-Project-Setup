import catchAsync from "../../utils/catchAssync"
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

export const UserController = {
    createStudent
}