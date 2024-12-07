import { AcademicDapartment } from "./academicDepertment.model";
import { TAcademicDepertment } from "./academicDepertment.interface";

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepertment) => {

    const isDepartmentExist = await AcademicDapartment.findOne({ name: payload.name })
    if (isDepartmentExist) {
        throw new Error('This Department is Exist')
    }

    const result = await AcademicDapartment.create(payload);
    return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
    const result = await AcademicDapartment.find().populate('academicFaculty');
    return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
    const result =
        await AcademicDapartment.findById(id).populate('academicFaculty');
    return result;
};

const updateAcademicDepartmentIntoDB = async (
    id: string,
    payload: Partial<TAcademicDepertment>,
) => {
    const result = await AcademicDapartment.findOneAndUpdate(
        { _id: id },
        payload,
        {
            new: true,
        },
    );
    return result;
};

export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentsFromDB,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentIntoDB,
};