import { TAcademicSemester } from "./academicSemester.interface";
import { Semester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (paylod: TAcademicSemester) => {
    const result = await Semester.create(paylod)
    return result
}

export const AcademicSemesterService = {
    createAcademicSemesterIntoDB
}