import { z } from 'zod'

const academicFacultyValidation = z.object({
    name: z.string()
})

export const AcademicValidation = {
    academicFacultyValidation
}