import catchAsync from "../../utils/catchAssync";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
    const info = req.body
    const result = await AuthServices.loginUser(info)

    res.status(200).json({
        success: true,
        message: "Yoou Login Successfully",
        date: result
    })
})

const forgetPassword = catchAsync(async (req, res) => {
    const { userId } = req.body;
    const result = await AuthServices.forgetPassword(userId);

    res.status(200).json({
        success: true,
        message: "Yoou forget Successfully",
        date: result
    })
});

export const AuthController = {
    loginUser,
    forgetPassword
}