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

const createStudentIntoDB = async (password: string, payload: TStudent) => {

    //creaet a user object
    const userData: Partial<TUser> = {};
    // if pass is not getEnvironmentData, use default password
    userData.password = password || (config.default_password as string)


    // set student role 
    userData.role = 'student'


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

        await session.commitTransaction()
        await session.endSession()
        return newStudent;

    } catch (err) {
        await session.abortTransaction()
        await session.endSession()
        console.log(err)
    }
    //set  generated id





}

export const UserServices = {
    createStudentIntoDB
}