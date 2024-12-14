import { z } from 'zod';

const createSemisterRegistrationValidationSchema = z.object({
    body: z.object({})
})

export const SemesterRegistrationValidations = {
    createSemisterRegistrationValidationSchema
}