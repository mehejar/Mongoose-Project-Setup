import { TAcademicSemester } from "../academicSemester/academicSemester.interface"
import { User } from "./user.model"

const findLastStudentId = async () => {

    const lastStudent = await User.findOne({
        role: "student"
    }, {
        id: 1,
        _id: 0
    }).sort({ createdAt: -1 })
        .lean()

    return lastStudent?.id ? lastStudent.id : undefined
}

export const generateStudentId = async (payload: TAcademicSemester) => {
    let currentId = (0).toString(); // 0000 by deafult

    const lastStudentId = await findLastStudentId();
    // 2030 01 0001
    const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01;
    const lastStudentYear = lastStudentId?.substring(0, 4); // 2030
    const currentSemesterCode = payload.code;
    const currentYear = payload.year;

    if (lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear) {
        currentId = lastStudentId.substring(6)
    }


    let increaseId = (Number(currentId) + 1).toString()
    increaseId = `${payload.year}${payload.code}${increaseId}`

    console.log(increaseId)
    return increaseId;


}