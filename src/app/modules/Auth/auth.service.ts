import config from "../../config";
import { AppError } from "../academicDepertment/academicDepertment.model";
import { User } from "../user/user.model";
import jwt from 'jsonwebtoken'
import { createToken } from "./auth.utils";
import { sendEmail } from "../../utils/senEmail";

type TAuth = {
    id: string;
    password: string
}
const loginUser = async (payload: TAuth) => {

    const { id } = payload
    // if the user is exist
    const isUserExist = await User.findOne({ id })
    if (!isUserExist) {
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

const forgetPassword = async (userId: string) => {
    // checking if the user is exist
    const user = await User.findOne({ userId });

    if (!user) {
        throw new AppError(400, 'This user is not found !');
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted;

    if (isDeleted) {
        throw new AppError(400, 'This user is deleted !');
    }

    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === 'blocked') {
        throw new AppError(400, 'This user is blocked ! !');
    }

    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };

    const resetToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        '10m',
    );

    const resetUILink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken} `;
    sendEmail(user.email, resetUILink)

    console.log(resetUILink);
};

export const AuthServices = {
    loginUser,
    forgetPassword
}