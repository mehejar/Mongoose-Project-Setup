import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
    id: {
        type: String, required: true,
    },
    password: {
        type: String, required: true,
    },
    needsPasswordChange: {
        type: Boolean,
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty'],
        required: true
    },
    status: {
        type: String,
        enum: ['in-progeess', 'blocked'],
        default: 'in-progeess'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }


},
    {
        timestamps: true
    })

export const User = model<TUser>('User', userSchema)