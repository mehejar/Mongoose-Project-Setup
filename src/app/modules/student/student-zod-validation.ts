import { z } from "zod";

// Zod schema for User (firstName, middleName, lastName)
const userValidationSchema = z.object({

    firstName: z.string().max(20, { message: "name not allow more then 20 Charecter" }),
    middleName: z.string().max(20, { message: "name not allow more then 20 Charecter" }).optional(),
    lastName: z.string().max(20, { message: "name not allow more then 20 Charecter" }),

});

// Zod schema for LocalGuardian
const localGuardianValidationSchema = z.object({
    name: z.string(),
    occupation: z.string(),
    contactNo: z.string(),
    address: z.string(),
});

// Zod schema for Student
const studentValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        student: z.object({
            name: userValidationSchema,
            gender: z.enum(["male", "female", "others"]),
            dateOfBirth: z.string(),
            email: z.string().email("Invalid email address"),
            contactNo: z.string(),
            emergencyContactNo: z.string(),
            bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]).optional(),
            presentAddress: z.string(),
            permanentAddress: z.string(),
            guardian: z.object({
                name: z.string(),
                relation: z.string(),
                guardianOccupation: z.string(),
                guardianContactNo: z.string(),
            }),
            localGuardian: localGuardianValidationSchema.optional(),
            profile: z.string().optional(),
            addmissionSemester: z.string(),

        })
    })
});

export const studentValidationSchemas = {
    studentValidationSchema
}