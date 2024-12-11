import { z } from 'zod'
// import { userSchema } from '../student/student.model';

const createUserNameValidationSchema = z.object({
    firstName: z
        .string()
        .min(1)
        .max(20),
    middleName: z.string(),
    lastName: z.string(),
});

export const createFacultyValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        faculty: z.object({
            designation: z.string(),
            name: createUserNameValidationSchema,
            gender: z.enum(["male", "female", "others"]),
            dateOfBirth: z.string().optional(),
            email: z.string().email(),
            contactNo: z.string(),
            emergencyContactNo: z.string(),
            bloogGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]).optional(),
            presentAddress: z.string(),
            permanentAddress: z.string(),
            academicDepartment: z.string(),
            profileImg: z.string(),
        }),
    }),
});

const updateUserNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20).optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
});

export const updateFacultyValidationSchema = z.object({
    body: z.object({
        faculty: z.object({
            designation: z.string().optional(),
            name: updateUserNameValidationSchema,
            gender: z.enum(["male", "female", "others"]),
            dateOfBirth: z.string().optional(),
            email: z.string().email().optional(),
            contactNo: z.string().optional(),
            emergencyContactNo: z.string().optional(),
            bloogGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]).optional(),
            presentAddress: z.string().optional(),
            permanentAddress: z.string().optional(),
            profileImg: z.string().optional(),
            academicDepartment: z.string().optional(),
        }),
    }),
});

export const facultyValidations = {
    createFacultyValidationSchema,
    updateFacultyValidationSchema,
};