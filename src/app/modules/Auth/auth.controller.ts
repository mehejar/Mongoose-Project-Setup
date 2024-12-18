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

export const AuthController = {
    loginUser
}