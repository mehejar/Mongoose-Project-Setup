import config from "../../config";
// import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { Semester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password: string, payload: TStudent) => {

    //creaet a user object
    const userData: Partial<TUser> = {};
    // if pass is not getEnvironmentData, use default password
    userData.password = password || (config.default_password as string)


    // set student role 
    userData.role = 'student'

    // manually generated ID
    // userData.id = '2030100001'


    const admissionSemester = await Semester.findById(
        payload.addmissionSemester,
    );

    //set  generated id
    userData.id = generateStudentId(admissionSemester);


    // create a user model
    const newUser = await User.create(userData); //build in static method


    //create a student
    if (Object.keys(newUser).length) {
        // set id , _id as user
        console.log('this is New User:', newUser)
        console.log("this is paylod:", payload)
        payload.id = '2030100001' as string;
        payload.user = newUser?._id; //reference _id



        const newStudent = await Student.create(payload);
        return newStudent;
    }




}

export const UserServices = {
    createStudentIntoDB
}