import { model, Schema } from "mongoose";
import { TCourse, TCourseFaculty, TPreRequisiteCourses } from "./course.interface";

export const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course: { type: Schema.Types.ObjectId, },
    isDeleted: { type: Boolean, default: false }
})

export const courseSchema = new Schema<TCourse>({
    title: { type: String, required: true, unique: true, trim: true },
    prefix: { type: String, required: true, trim: true },
    code: { type: Number, required: true, trim: true },
    credits: { type: Number, required: true, trim: true },
    preRequisiteCourses: [preRequisiteCoursesSchema]


})

export const courseFacultySchema = new Schema<TCourseFaculty>({
    courseId: { type: Schema.Types.ObjectId, ref: "Course", unique: true },
    faculties: [{
        type: Schema.Types.ObjectId,
        ref: 'Faculty'
    }]
})

export const Course = model<TCourse>("Course", courseSchema)
export const CourseFaculty = model<TCourseFaculty>("CourseFaculty", courseFacultySchema)