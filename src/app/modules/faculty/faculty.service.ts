/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { AppError } from "../academicDepertment/academicDepertment.model";
import { User } from "../user/user.model";
import { Faculty } from "./faculty.model";
import { TFaculty } from "./faculty.interface";
import QueryBuilder from "../../builder/QueryBuilder";

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
    const FacultySearchableFields = [
        'email',
        'id',
        'contactNo',
        'emergencyContactNo',
        'name.firstName',
        'name.lastName',
        'name.middleName',
    ];
    const facultyQuery = new QueryBuilder(
        Faculty.find().populate('academicDepartment'),
        query,
    )
        .search(FacultySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await facultyQuery.modelQuery;
    return result;
};

const getSingleFacultyFromDB = async (id: string) => {
    const result = await Faculty.findById(id).populate('academicDepartment');

    return result;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
    const { name, ...remainingFacultyData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingFacultyData,
    };

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }

    const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deleteFacultyFromDB = async (id: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const deletedFaculty = await Faculty.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedFaculty) {
            throw new AppError(400, 'Failed to delete faculty');
        }

        // get user _id from deletedFaculty
        const userId = deletedFaculty.user;

        const deletedUser = await User.findByIdAndUpdate(
            userId,
            { isDeleted: true },
            { new: true, session },
        );

        if (!deletedUser) {
            throw new AppError(400, 'Failed to delete user');
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedFaculty;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

export const FacultyServices = {
    getAllFacultiesFromDB,
    getSingleFacultyFromDB,
    updateFacultyIntoDB,
    deleteFacultyFromDB,
};