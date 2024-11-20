import { Request, Response } from "express"
import { StudentServices } from "./student.service"

const createStudent = async (req: Request, res: Response) => {
    try {
        const student = req.body
        // will cal service func to send this data
        const result = await StudentServices.createStudentIntoDB(student)

        // send response


        res.status(200).json({
            success: true,
            message: "Student is Created",
            date: result
        })
    } catch (err) {
        console.log(err)
    }

}

const getAllStudents = async (req: Request, res: Response) => {
    try {

        const result = await StudentServices.getAllStudentsFromDb()
        res.status(200).json({
            success: true,
            message: "Students is Retrieve Successfully",
            date: result
        })

    } catch (err) {
        console.log(err)
    }
}

const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const studentId = req.params.id
        const result = await StudentServices.getSingleStudentFromDb(studentId)

        res.status(200).json({
            success: true,
            message: "Student is Retrieve Successfully",
            date: result
        })
    } catch (err) {
        console.log(err)
    }
}

export const studentController = {
    createStudent,
    getAllStudents,
    getSingleStudent,
}
