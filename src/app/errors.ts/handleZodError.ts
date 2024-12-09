import { ZodError, ZodIssue } from "zod"
import { TErrorSource } from "../modules/student/student.interface"

export type TGenericErrorResposne = {
    statusCode: number;
    message: string;
    errorSources: TErrorSource;
}

const handleZodError = (err: ZodError): TGenericErrorResposne => {
    const errorSources = err.issues.map((issue: ZodIssue) => {
        return {

            path: issue?.path[issue.path.length - 1],
            message: issue?.message
        }
    })



    const statusCode = 400
    return {
        statusCode,
        message: "Zod Validation Error",
        errorSources,

    }
}

export default handleZodError