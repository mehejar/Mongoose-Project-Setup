import { TSemisterRagistration } from "./semisterRagistration.interface"
import { SemisterRagistration } from "./semisterRagistration.model"

const createSemesterRegistrationIntoDB = async (payload: TSemisterRagistration) => {
    const result = await SemisterRagistration.create(payload)
    return result
}

const getAllRegisteredSemester = async () => {
    const result = await SemisterRagistration.find()
    return result
}
const getASingleRegisteredSemester = async (_id: string) => {
    const result = await SemisterRagistration.findById(_id)
    return result
}

export const semesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllRegisteredSemester,
    getASingleRegisteredSemester
}