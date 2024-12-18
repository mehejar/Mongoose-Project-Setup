import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAssync"
import { AppError } from "../modules/academicDepertment/academicDepertment.model"
import jwt from 'jsonwebtoken'
import config from "../config"

const auth = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization
        //if the token is sent from the client

        if (!token) {
            throw new AppError(400, 'Youre not authorized User')
        }

        jwt.verify(token, config.jwt_access_secret as string, function (err, decoded) {

            if (err) {
                throw new AppError(400, 'Youre not authorized User')
            }
            // 
            const { userId, role } = decoded
            req.user = { userId, role }
        })

        next()
    })
}

export default auth