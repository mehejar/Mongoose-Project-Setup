// import { TStudent } from "./student.interface";
import { Student } from "./student.model";



const getAllStudentsFromDb = async () => {
    const result = await Student.find();
    return result;
}

const getSingleStudentFromDb = async (id: string) => {
    const result = await Student.findOne({ id });
    return result;
}

export const StudentServices = {
    getAllStudentsFromDb,
    getSingleStudentFromDb
}