import { model, Schema } from "mongoose";
import { userSchema } from "../student/student.model";
import { TAdmin } from "./admin.interface";

export const adminSchema = new Schema<TAdmin>({
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

export const Admin = model<TAdmin>('Admin', adminSchema)