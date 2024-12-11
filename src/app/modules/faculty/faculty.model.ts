import { model, Schema } from "mongoose";
import { TFaculty } from "./faculty.interface";
// import { userSchema } from "../student/student.model";
import { TUser } from "../student/student.interface";

const userNameSchema = new Schema<TUser>({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
        maxlength: [20, 'Name can not be more than 20 characters'],
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last Name is required'],
        maxlength: [20, 'Name can not be more than 20 characters'],
    },
});

const facultySchema = new Schema<TFaculty>(
    {
        id: {
            type: String,
            required: [true, 'ID is required'],
            unique: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            required: [true, 'User id is required'],
            unique: true,
            ref: 'User',
        },
        designation: {
            type: String,
            required: [true, 'Designation is required'],
        },
        name: {
            type: userNameSchema,
            required: [true, 'Name is required'],
        },
        gender: {
            type: String,
            enum: ["male", "female", "others"],
            required: [true, 'Gender is required'],
        },
        dateOfBirth: { type: Date },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        contactNo: { type: String, required: [true, 'Contact number is required'] },
        emergencyContactNo: {
            type: String,
            required: [true, 'Emergency contact number is required'],
        },
        bloogGroup: {
            type: String,
            enum: ["A+", "B+", "AB+"],
        },
        presentAddress: {
            type: String,
            required: [true, 'Present address is required'],
        },
        permanentAddress: {
            type: String,
            required: [true, 'Permanent address is required'],
        },
        profileImg: { type: String },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            required: [true, 'User id is required'],
            ref: 'User',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

export const Faculty = model<TFaculty>('Faculty', facultySchema)