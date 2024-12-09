import mongoose from "mongoose";
import { TErrorSource } from "../modules/student/student.interface";

const handleValidationError = (err: mongoose.Error.ValidationError) => {

    const errorSources: TErrorSource = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: val?.path,
            message: val?.message
        }
    })




    const statusCode = 400
    return {
        statusCode,
        message: "Zod Validation Error",
        errorSources,

    }
}

export default handleValidationError