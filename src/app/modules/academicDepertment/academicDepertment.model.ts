import { model, Schema } from "mongoose";
import { TAcademicDepertment } from "./academicDepertment.interface";

export const academicDepertmentSchema = new Schema<TAcademicDepertment>({
    name: {
        type: String, required: true, unique: true,
    },

    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty'
    }
})


class AppError extends Error {
    public statusCode: number;

    constructor(statusCode: number, message: string, stack = '') {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}



academicDepertmentSchema.pre('save', async function (next) {
    const isDepartmentExist = await AcademicDapartment.findOne({ name: this.name })
    if (isDepartmentExist) {
        throw new AppError(404, 'This Department is Exist')
    } else {
        next()
    }
})

academicDepertmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery()
    const isDepartmentExist = await AcademicDapartment.findOne(query)
    if (!isDepartmentExist) {
        throw new Error('This Department is not Exist')
    }
    next()

})

export const AcademicDapartment = model<TAcademicDepertment>('AcademicDepertment', academicDepertmentSchema)