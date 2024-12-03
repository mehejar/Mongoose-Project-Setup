"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = void 0;
const student_service_1 = require("./student.service");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = req.body;
        // will cal service func to send this data
        const result = yield student_service_1.StudentServices.createStudentIntoDB(student);
        // send response
        res.status(200).json({
            success: true,
            message: "Student is Created",
            date: result
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_service_1.StudentServices.getAllStudentsFromDb();
        res.status(200).json({
            success: true,
            message: "Students is Retrieve Successfully",
            date: result
        });
    }
    catch (err) {
        console.log(err);
    }
});
const getSingleStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.id;
        const result = yield student_service_1.StudentServices.getSingleStudentFromDb(studentId);
        res.status(200).json({
            success: true,
            message: "Student is Retrieve Successfully",
            date: result
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.studentController = {
    createStudent,
    getAllStudents,
    getSingleStudent,
};
