import express from "express"
import validRequest from "../../middlewares/validRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = express.Router();


router.post(
    '/login',
    validRequest(AuthValidation.loginValidationSchema), AuthController.loginUser,
);


export const AuthRoute = router
