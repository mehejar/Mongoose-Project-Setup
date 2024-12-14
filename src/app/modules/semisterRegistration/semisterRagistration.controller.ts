import catchAsync from "../../utils/catchAssync";
import { semesterRegistrationService } from "./semisterRagistration.service";

const createSemisterRagistrations = catchAsync(async (req, res) => {
    const registrationData = req.body
    const result = await semesterRegistrationService.createSemesterRegistrationIntoDB(registrationData)

    res.status(200).json({
        success: true,
        message: "Students is Retrieve Successfully",
        date: result
    })
})


const getAllSemisterRagistrations = catchAsync(async (req, res) => {
    const result = await semesterRegistrationService.getAllRegisteredSemester()

    res.status(200).json({
        success: true,
        message: "Students is Retrieve Successfully",
        date: result
    })
})


const getASingleSemisterRagistrations = catchAsync(async (req, res) => {
    const { _id } = req.params
    const result = await semesterRegistrationService.getASingleRegisteredSemester(_id)

    res.status(200).json({
        success: true,
        message: "Students is Retrieve Successfully",
        date: result
    })
})

export const semesterRegistrationController = {
    createSemisterRagistrations,
    getAllSemisterRagistrations,
    getASingleSemisterRagistrations
}