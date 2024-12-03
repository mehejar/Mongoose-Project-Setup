import { TAcademicSemester } from "./academicSemester.interface";
import { Semester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (paylod: TAcademicSemester) => {
    //semester name ---> semester code

    type TAcademicSemesterNameCodeMapper = {
        [key: string]: string
    }

    const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
        Autum: '01',
        Summer: '02',
        Fall: '03',

    }

    if (academicSemesterNameCodeMapper[paylod.name] !== paylod.code) {
        throw new Error('Semester Code is Wrong')
    }

    const result = await Semester.create(paylod)
    return result
}

const getAllSemester = async () => {
    const result = await Semester.find()
    return result
}
const getASingleSemester = async (_id: string) => {
    const result = await Semester.findOne({ _id })
    return result
}

export const AcademicSemesterService = {
    createAcademicSemesterIntoDB,
    getAllSemester,
    getASingleSemester
}