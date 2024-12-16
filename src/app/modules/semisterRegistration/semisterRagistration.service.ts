import { AppError } from "../academicDepertment/academicDepertment.model"
import { Semester } from "../academicSemester/academicSemester.model"
import { TSemisterRagistration } from "./semisterRagistration.interface"
import { SemisterRagistration } from "./semisterRagistration.model"

const createSemesterRegistrationIntoDB = async (payload: TSemisterRagistration) => {

    const academicSemester = payload?.academicSemester

    // Check if theree any registred semester that is already 'Upcoming' or 'Ongoing'
    const isThereAnyUpcomingOrOngoingSemester = await SemisterRagistration.findOne({
        $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }]
    })

    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new AppError(404, `there is already a ${isThereAnyUpcomingOrOngoingSemester.status} segistered semester`)
    }

    const isRegistrationSemesterExist = await SemisterRagistration.findOne({ academicSemester })

    if (isRegistrationSemesterExist) {
        throw new AppError(404, 'Semester is already registered')
    }

    const isAcademicSemesterExist = await Semester.findById(academicSemester)

    if (!isAcademicSemesterExist) {
        throw new AppError(404, 'Semester is not found')
    }

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

const updateRegisteredSemester = async (id: string, payload: Partial<TSemisterRagistration>) => {

    const isRegisteredSemisterExist = await SemisterRagistration.findById(id)
    if (!isRegisteredSemisterExist) {
        throw new AppError(404, `Semester is not found ${isRegisteredSemisterExist}`)
    }
    // 
    const currentSemesterStatus = isRegisteredSemisterExist?.status

    if (currentSemesterStatus === 'ENDED') {
        throw new AppError(400, 'Semester is already ended')
    }
    const requestedStatus = payload.status

    // Upcoming --> Ongoing --> ENDED
    if (currentSemesterStatus === 'UPCOMING' && requestedStatus === "ENDED") {
        throw new AppError(400, 'You Cannot update directly upcoming status to status ended')

    }
    // Ongoing --> ENDED
    if (currentSemesterStatus === 'ONGOING' && requestedStatus === "UPCOMING") {
        throw new AppError(400, 'You Cannot update directly ONGOING status to status UPCOMING')

    }

    const result = await SemisterRagistration.findByIdAndUpdate(id, payload, { new: true })
    return result

}

export const semesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllRegisteredSemester,
    getASingleRegisteredSemester,
    updateRegisteredSemester
}