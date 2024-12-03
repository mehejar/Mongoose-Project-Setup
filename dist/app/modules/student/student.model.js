"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
// user Schema
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String, required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String, required: true
    }
});
// Local Guardian Schema
const localGuardianSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
});
const studentSchema = new mongoose_1.Schema({
    id: { type: String },
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
    contactNo: { tpe: String, required: true },
    emergencyContactNo: { type: String, require: true },
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
    isActive: {
        type: String,
        enum: ["active", "block"]
    },
});
// Create Model
exports.StudentModel = (0, mongoose_1.model)('Student', studentSchema);
