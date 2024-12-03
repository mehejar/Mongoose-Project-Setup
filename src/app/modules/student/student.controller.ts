import { RequestHandler } from "express"
import { StudentServices } from "./student.service"
import catchAsync from "../../utils/catchAssync"
// import studentValidationSchema from "./student-zod-validation"
// import { z } from "zod";



const getAllStudents: RequestHandler = catchAsync(async (req, res) => {

    const result = await StudentServices.getAllStudentsFromDb()
    res.status(200).json({
        success: true,
        message: "Students is Retrieve Successfully",
        date: result
    })
})

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {

    const studentId = req.params.id
    const result = await StudentServices.getSingleStudentFromDb(studentId)

    res.status(200).json({
        success: true,
        message: "Student is Retrieve Successfully",
        date: result
    })

})

export const studentController = {
    getAllStudents,
    getSingleStudent,

}
