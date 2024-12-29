import express from "express"
import validRequest from "../../middlewares/validRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = express.Router();


router.post(
    '/login',
    validRequest(AuthValidation.loginValidationSchema), AuthController.loginUser,
);
router.post(
    '/forget-password',
    validRequest(AuthValidation.forgetPasswordValidationSchema),
    AuthController.forgetPassword,
);


export const AuthRoute = router
