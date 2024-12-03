import { Schema, model, } from 'mongoose';
import { TLocalGuardian, TStudent, TUser, } from './student.interface';
// import validator from 'validator';


// user Schema
const userSchema = new Schema<TUser>({
    firstName: {
        type: String, required: true,
        validate: {
            validator: function (value: string) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
                return firstNameStr === value;
            },
            message: '{VALUE} is not in capitalize format',
        }
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String, required: true,
        validate: {
            validator: function (value: string) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
                return firstNameStr === value;
            },
            message: '{VALUE} is not in capitalize format',
        }
    }
})

// Local Guardian Schema
const localGuardianSchema = new Schema<TLocalGuardian>({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
})


const studentSchema = new Schema<TStudent>({

    id: { type: String, required: true, unique: true },
    user: {
        type: Schema.Types.ObjectId,
        required: true, unique: true,
        ref: "User"
    },
    name: userSchema,
    gender: {
        type: String,
        enum: ["male", "female", "others"],
        required: true
    },
    dateOfBirth: {
        type: String
    },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
        name: { type: String, required: true },
        relation: { type: String, required: true },
        guardianOccupation: { type: String, required: true },
        guardianContactNo: { type: String, required: true },
    },
    localGuardian: localGuardianSchema,
    profile: { type: String },
    addmissionSemester: { type: Schema.Types.ObjectId, required: true },
    isDeleted: { type: Boolean, default: true }

})

// Creating a custom static method
studentSchema.statics.isUserExist = async function (id: string) {
    const existUser = await Student.findOne({ id })
    return existUser;
}

// Schema call for method | custom instance method
// studentSchema.methods.isUserExist = async function (id: string) {
//     const existingUser = await Student.findOne({ id })
//     return existingUser
// }

// Create Model
export const Student = model<TStudent>('Student', studentSchema)