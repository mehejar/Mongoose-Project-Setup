import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"

const validRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // console.log(`my name is shenabahini and I am ${name}`)

            //validation 
            await schema.parseAsync({ body: req.body })

            next()
        } catch (err) {
            next(err)
        }
    }

}

export default validRequest