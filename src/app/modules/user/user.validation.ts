import { z } from 'zod'
const userValidationSchema = z.object({

    password: z.string({
        invalid_type_error: 'Passsword must be string'
    }).max(20, { message: 'Password cann not be more then 20 charecter' }).optional(),




})

export const UserValidation = {
    userValidationSchema
}