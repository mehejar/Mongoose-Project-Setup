import catchAsync from "../../utils/catchAssync"
import { AcademicSemesterService } from "./academicSemester.service"
// import studentValidationSchema from "../student/student-zod-validation"



const createAcademicSemester = catchAsync(async (req, res) => {  // ZOD Valiator Schema
    // const { student: studentData } = req.body

    // will cal service func to send this data
    const result = await AcademicSemesterService.createAcademicSemesterIntoDB(req.body)

    // send response
    res.status(200).json({
        success: true,
        message: "Student is Created",

        date: result
    })
})

export const AcademicSemesterController = {
    createAcademicSemester
} 