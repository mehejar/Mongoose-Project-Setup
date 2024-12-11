import { z } from 'zod'
// import { userSchema } from '../student/student.model';

const userValidationSchema = z.object({

    firstName: z.string().max(20, { message: "name not allow more then 20 Charecter" }),
    middleName: z.string().max(20, { message: "name not allow more then 20 Charecter" }).optional(),
    lastName: z.string().max(20, { message: "name not allow more then 20 Charecter" }),

})

const adminValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        admin: z.object({
            name: userValidationSchema,
            gender: z.enum(["male", "female", "others"]),
            email: z.string().email("Invalid email address"),
            contactNo: z.string(),


            presentAddress: z.string(),
            permanentAddress: z.string(),

            profile: z.string().optional(),

        })
    })
});

export const adminValidation = {
    adminValidationSchema
}