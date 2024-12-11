import express from "express"
import { adminController } from "./admin.controller";
const router = express.Router()

// will call controller file

router.get('/', adminController.getAllAdmins)

export const adminsRoute = router;