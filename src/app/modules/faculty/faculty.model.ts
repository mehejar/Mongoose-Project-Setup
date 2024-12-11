import { model, Schema } from "mongoose";
import { TFaculty } from "./faculty.interface";
import { userSchema } from "../student/student.model";

export const facultySchema = new Schema<TFaculty>({
    id: { type: String, unique: true },
    user: {
        type: Schema.Types.ObjectId,
        required: true, unique: true,
        ref: "User"
    },
    name: userSchema,
    gender: {
        type: String,
        enum: ["male", "female", "others"]
    },
    email: { type: String },
    contactNo: { type: String },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    profile: { type: String }

}, {
    timestamps: true
})

export const Faculty = model<TFaculty>('Faculty', facultySchema)