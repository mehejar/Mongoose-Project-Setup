import { model, Schema } from "mongoose";
import { TAcademicSemester, TMonth } from "./academicSemester.interface";
// import { escape } from "querystring";

export const monthSchema = new Schema<TMonth>(
    {
        type: String,
        enum: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
    }
);

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
    startMonth: {
        type: String,
        enum: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
    },
    endMonth: {
        type: String,
        enum: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
    },

},
    {
        timestamps: true
    })

academicSemesterSchema.pre('save', async function (next) {
    const isAcademicSemesterExist = await Semester.findOne({
        year: this.year,
        name: this.name,
    })

    if (isAcademicSemesterExist) {
        throw new Error('Semester is already Exist')
    } else {
        next()
    }
})

export const Semester = model<TAcademicSemester>('Semester', academicSemesterSchema)

