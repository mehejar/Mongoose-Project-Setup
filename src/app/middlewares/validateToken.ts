import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config"
import catchAsync from "../utils/catchAssync"
import { TUserRole } from "../modules/user/constant"


const validateToken = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization
        if (!token) {
            throw new Error('Unauthorized user')
        }

        //check if the token is the verify token
        jwt.verify(token, config.jwt_access_secret as string, function (err, decoded) {
            if (err) {
                throw new Error('You are not authorized')
            }

            const role = (decoded as JwtPayload)?.role

            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new Error('You are not authorized')
            }

            req.user = decoded as JwtPayload
        });
        next()

    })




}



export default validateToken