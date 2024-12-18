import config from "../../config";
import { AppError } from "../academicDepertment/academicDepertment.model";
import { User } from "../user/user.model";
import { TAuth } from "./auth.interface";
import jwt from 'jsonwebtoken'

const loginUser = async (payload: TAuth) => {

    const { id } = payload
    // if the user is exist
    const isUserExist = await User.findOne({ id })
    if (await User.isUserExistByCustomId(id)) {
        throw new AppError(404, 'This User is not found')
    }
    // chceck if the user is already deleted
    const isDeleted = isUserExist?.isDeleted

    if (isDeleted) {
        throw new AppError(404, 'This User is not found')
    }
    const userStatus = isUserExist?.status
    if (userStatus === 'blocked') {
        throw new AppError(400, 'This User has been Blocked')
    }


    // create tokenm and send to the client

    const jwtPayload = {
        userId: isUserExist?.id,
        role: isUserExist?.role
    }
    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_access_secret as string,
        {
            expiresIn: '10d'
        }
    )

    //access guarented
    return {
        accessToken,
        needsPasswordChange: isUserExist?.needsPasswordChange
    }

}

export const AuthServices = {
    loginUser
}