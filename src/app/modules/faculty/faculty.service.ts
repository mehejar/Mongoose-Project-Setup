import { Faculty } from "./faculty.model"

const getAllFaculty = async () => {
    const result = await Faculty.find()
    return result
}


export const FacultyServices = {
    getAllFaculty
}