// import { Schema, model, connect } from 'mongoose';


export type LocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address:string;

}

export type User = {
    
        firstName: string;
        middleName: string;
        lastName: string;
    
}

export type  Student = {
    id: string;
name: User,
gender: "male" | "female";
dateOfBirth: string
email: string;
contactNo: string;
emergencyContactNo: string;
bloodGroup?: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
presentAddress: string;
permanentAddress: string;
guardian:{
    name: string;
    relation: string;
    guardianOccupation: string;
    guardianContactNo: string;
}

localGuardian?: LocalGuardian;
profile?: string;
isActive: "active" | "block"
}