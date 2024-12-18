import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";

const userSchema = new Schema<TUser, UserModel>({
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

userSchema.statics.isUserExistByCustomId = async function (id: string) {
    return await User.findOne({ id })

}

export const User = model<TUser, UserModel>('User', userSchema)