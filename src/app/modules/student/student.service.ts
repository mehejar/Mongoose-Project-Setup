// import { TStudent } from "./student.interface";
import mongoose from "mongoose";
import { Student } from "./student.model";
import { AppError } from "../academicDepertment/academicDepertment.model";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";



const getAllStudentsFromDb = async () => {
    const result = await Student.find().populate('academicFaculty');
    return result;
}

const getSingleStudentFromDb = async (id: string) => {
    const result = await Student.findOne({ id });
    return result;
}

const updateStudentIntoDb = async (id: string, payload: Partial<TStudent>) => {
    const result = await Student.findOneAndUpdate({ id }, payload)
    return result
}

const deleteStudentFromDB = async (id: string) => {

    const session = await mongoose.startSession()
    try {
        session.startTransaction()

        const deletedStudent = await Student.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session },

        )
        if (!deletedStudent) {
            throw new AppError(500, 'not Success')
        }
        const deleteUser = await User.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session })

        if (!deleteUser) {
            throw new AppError(500, 'not Success')
        }
        await session.commitTransaction()
        await session.endSession()
        return deletedStudent;



    } catch (err) {
        await session.abortTransaction()
        await session.endSession()
    }

}

export const StudentServices = {
    getAllStudentsFromDb,
    getSingleStudentFromDb,
    deleteStudentFromDB,
    updateStudentIntoDb
}