import { z } from 'zod'
export const academicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum(["Autum", "Summer", "Fall"]),
        code: z.enum(["01", "02", "03"]),
        year: z.string(),
        startMonth: z.enum(["January", "February", "March", "April", "May"
            , "June", "July", "August", "September"
            , "October", "November", "December"]),
        endMonth: z.enum(["January", "February", "March", "April", "May"
            , "June", "July", "August", "September"
            , "October", "November", "December"]),

    })
})