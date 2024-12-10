// import { TStudent } from "./student.interface";
import mongoose from "mongoose";
import { Student } from "./student.model";
import { AppError } from "../academicDepertment/academicDepertment.model";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";



const getAllStudentsFromDb = async (query: Record<string, unknown>) => {

    const queryObj = { ...query }; // copying req.query object so that we can mutate the copy object 

    let searchTerm = '';   // SET DEFAULT VALUE 

    // IF searchTerm  IS GIVEN SET IT
    if (query?.searchTerm) {
        searchTerm = query?.searchTerm as string;
    }

    const studentSearchableFields = ['email', 'name.firstName', 'contact']

    const searchQuery = Student.find({
        $or: studentSearchableFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' },
        })),
    });

    const filterQuery = searchQuery
        .find(queryObj)
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        });

    // SORTING FUNCTIONALITY:

    let sort = '-createdAt'; // SET DEFAULT VALUE 

    // IF sort  IS GIVEN SET IT

    if (query.sort) {
        sort = query.sort as string;
    }

    const sortQuery = filterQuery.sort(sort);


    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);  // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY


    let limit = 1
    if (query.limit) {
        limit = Number(query.limit);
    }
    let page = 1
    let skip = 0
    if (query.page) {
        page = Number(query.page)
        skip = (page - 1) * limit
    }
    const paginateQuery = sortQuery.skip(skip)



    const result = await paginateQuery.limit(limit)
    return result;
}

const getSingleStudentFromDb = async (id: string) => {
    const result = await Student.findOne({ id });
    return result;
}

const updateStudentIntoDb = async (id: string, payload: Partial<TStudent>) => {


    const { name, guardian, localGuardian, ...remainingStudentData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingStudentData,
    };

    /*
      guardain: {
        fatherOccupation:"Teacher"
      }
  
      guardian.fatherOccupation = Teacher
  
      name.firstName = 'Mezba'
      name.lastName = 'Abedin'
    */

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }

    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }

    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }

    console.log(modifiedUpdatedData);

    const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
};



const deleteStudentFromDB = async (id: string) => {

    const session = await mongoose.startSession()
    try {
        session.startTransaction()

        const deletedStudent = await Student.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session },

        )
        if (!deletedStudent) {
            throw new AppError(500, 'not Success')
        }
        const deleteUser = await User.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session })

        if (!deleteUser) {
            throw new AppError(500, 'not Success')
        }
        await session.commitTransaction()
        await session.endSession()
        return deletedStudent;



    } catch (err) {
        await session.abortTransaction()
        await session.endSession()
        console.log(err)
    }

}

export const StudentServices = {
    getAllStudentsFromDb,
    getSingleStudentFromDb,
    deleteStudentFromDB,
    updateStudentIntoDb
}