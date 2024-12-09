import mongoose from "mongoose";
import { TGenericErrorResposne } from "./handleZodError";
import { TErrorSource } from "../modules/student/student.interface";

const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResposne => {

    const errorSources: TErrorSource = [{
        path: err?.path,
        message: err?.message
    }]
    const statusCode = 400
    return {
        statusCode,
        message: 'Validation Error',
        errorSources
    }
}

export default handleCastError