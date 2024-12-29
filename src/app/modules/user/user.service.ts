import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
// import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { Semester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import { AppError } from "../academicDepertment/academicDepertment.model";
import { TFaculty } from "../faculty/faculty.interface";
import { Faculty } from "../faculty/faculty.model";
import { Admin } from "../admin/admin.model";
import { TAdmin } from "../admin/admin.interface";
import { verifyToken } from "../Auth/auth.utils";
import { JwtPayload } from "jsonwebtoken";

const createStudentIntoDB = async (password: string, payload: TStudent) => {

    //creaet a user object
    const userData: Partial<TUser> = {};
    // if pass is not getEnvironmentData, use default password
    userData.password = password || (config.default_password as string)


    // set student role 
    userData.role = 'student'
    userData.email = payload?.email;


    const admissionSemester = await Semester.findById(
        payload.addmissionSemester,
    );

    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        userData.id = await generateStudentId(admissionSemester as TAcademicSemester)

        // create a user 
        const newUser = await User.create([userData], { session }); //build in static method


        //create a student
        if (!newUser.length) {
            throw new AppError(404, 'not found')
        }

        // set id , _id as user
        payload.id = newUser[0].id as string;
        payload.user = newUser[0]._id; //reference _id



        const newStudent = await Student.create([payload], { session });
        if (!newStudent) {
            throw new AppError(500, 'Faild to create Student')
        }

        session.commitTransaction()
        session.endSession()


        return newStudent;

    } catch (err) {
        session.abortTransaction()
        session.endSession()
        console.log(err)
    }
}
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {

    //creaet a user object
    const userData: Partial<TUser> = {};
    userData.password = password || (config.default_password as string)


    // set student role 
    userData.role = 'faculty'
    userData.email = payload?.email;


    // const admissionSemester = await Semester.findById(
    //     payload.addmissionSemester,
    // );

    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        userData.id = "F0001"

        // create a user 
        const newUser = await User.create([userData], { session }); //build in static method


        //create a student
        if (!newUser.length) {
            throw new AppError(404, 'not found')
        }

        // set id , _id as user
        payload.id = newUser[0].id as string;
        payload.user = newUser[0]._id; //reference _id



        const newFaculty = await Faculty.create([payload], { session });
        if (!newFaculty) {
            throw new AppError(500, 'Faild to create Faculty')
        }

        await session.commitTransaction()
        await session.endSession()
        return newFaculty;

    } catch (err) {
        await session.abortTransaction()
        await session.endSession()
        console.log(err)
    }
    //set  generated id





}
const createAdminIntoDB = async (password: string, payload: TAdmin) => {

    //creaet a user object
    const userData: Partial<TUser> = {};
    userData.password = password || (config.default_password as string)


    // set student role 
    userData.role = 'admin'
    userData.email = payload?.email;


    // const admissionSemester = await Semester.findById(
    //     payload.addmissionSemester,
    // );

    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        userData.id = "A0001"

        // create a user 
        const newUser = await User.create([userData], { session }); //build in static method


        //create a student
        if (!newUser.length) {
            throw new AppError(404, 'not found')
        }

        // set id , _id as user
        payload.id = newUser[0].id as string;
        payload.user = newUser[0]._id; //reference _id



        const newAdmin = await Admin.create([payload], { session });
        if (!newAdmin) {
            throw new AppError(500, 'Faild to create Admin')
        }

        await session.commitTransaction()
        await session.endSession()
        return newAdmin;

    } catch (err) {
        await session.abortTransaction()
        await session.endSession()
        console.log(err)
    }
    //set  generated id

}

const getMe = async (decoded: JwtPayload) => {

    const { userId, role } = decoded

    let result = null
    console.log('Single User', userId, role)
    if (role === 'student') {
        result = await Student.findOne({ id: userId })
    }
    if (role === 'admin') {
        result = await Admin.findOne({ id: userId })
    }
    if (role === 'faculty') {
        result = await Faculty.findOne({ id: userId })
    }



    return result
}

export const UserServices = {
    createStudentIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB,
    getMe
}