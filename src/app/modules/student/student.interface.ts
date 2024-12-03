// import { Schema, model, connect } from 'mongoose';

import { Types } from "mongoose";

// import { Model } from "mongoose";


export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;

}



export type TUser = {

    firstName: string;
    middleName?: string;
    lastName: string;

}

export type TStudent = {
    id: string;
    user: Types.ObjectId;
    password: string;
    name: TUser,
    gender: "male" | "female" | "others";
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
    presentAddress: string;
    permanentAddress: string;
    guardian: {
        name: string;
        relation: string;
        guardianOccupation: string;
        guardianContactNo: string;
    }

    localGuardian?: TLocalGuardian;
    profile?: string;
    isDeleted: boolean;
}

// //  for Creating static
// export interface StudentModel extends Model<TStudent> {
//     isUserExist(id: string): Promise<TStudent | null>
// }


// For Creating Instance Customs Methods
// export type studentMethods = {
//     isUserExist(id: string): Promise<TStudent | null>;
// }

// export type StudentModel = Model<TStudent, Record<string, never>, studentMethods>;