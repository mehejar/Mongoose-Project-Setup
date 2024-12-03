import { model, Schema } from "mongoose";
import { TAcademicSemester, TMonth } from "./academicSemester.interface";

export const monthSchema = new Schema<TMonth>({
    type: String,
    enum: ["January"
        , "February"
        , "March"
        , "April"
        , "May"
        , "June"
        , "July"
        , "August"
        , "September"
        , "October"
        , "November"
        , "December"]
})

export const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        enum: ["Autum", "Summer", "Fall"],
        required: true
    },
    code: {
        type: String,
        enum: ["01", "02", "03"],
        required: true,
    },
    year: {
        type: String, required: true
    },
    startMonth: monthSchema,
    endMonth: monthSchema,

},
    {
        timestamps: true
    })


export const Semester = model<TAcademicSemester>('Semester', academicSemesterSchema)

