import { model, Schema } from "mongoose";
import { TOfferedCourse } from "./offeredCourse.interface";

const offeredCourseSchema = new Schema<TOfferedCourse>({
    semesterRegistration: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "SemisterRegistration"
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "AcademicFaculty"
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "AcademicDepartment"
    },
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    },
    faculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Faculty"
    },
    maxCapacity: {
        type: Number,
        default: 10,
    },
    section: {
        type: Number,
        required: true
    },
    days: {
        type: String,
        enum: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    }

})

export const OfferedCourse = model<TOfferedCourse>('OfferedCourse', offeredCourseSchema)