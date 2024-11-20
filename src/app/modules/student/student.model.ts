import { Schema, model,} from 'mongoose';
import { LocalGuardian, Student, User } from './student.interface';


// user Schema
const userSchema = new Schema<User>({
    firstName: {
        type: String , required: true
    },
     middleName: {
        type: String
     },
     lastName: {
        type: String, required: true
     }
})

// Local Guardian Schema
const localGuardianSchema = new Schema<LocalGuardian>({
    name: {type: String, required: true},
        occupation: {type: String, required: true},
        contactNo: {type: String, required: true},
        address:{type: String, required: true},
})


const studentSchema = new Schema<Student>({

    id: {type: String } ,   
    name:userSchema,
    gender: ["male", "female"],
    dateOfBirth: {
        type: String
    },
    email: {type: String, required: true},
    contactNo: {tpe: String, required: true},
    emergencyContactNo: {type:String, require: true},
    bloodGroup: ["A+" , "A-" , "B+" , "B-" , "O+" , "O-" , "AB+" , "AB-"],
    presentAddress: {type: String, required: true},
    permanentAddress: {type: String, required: true},
    guardian:{
        name: {type:String, required: true},
        relation: {type:String, required: true},
        guardianOccupation: {type:String, required: true},
        guardianContactNo: {type:String, required: true},
    },
    localGuardian: localGuardianSchema,
    profile: {type: String},
    isActive: ["active", "block"],
})


// Create Model
export const StudentModel = model<Student> ('Student', studentSchema)