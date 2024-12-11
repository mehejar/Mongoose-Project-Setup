import catchAsync from "../../utils/catchAssync"
import { AdminServices } from "./admin.service"

const getAllAdmins = catchAsync(async (req, res) => {
    const result = await AdminServices.getAllAdmin()
    res.status(200).json({
        success: true,
        message: "Faculties is Retrieve Successfully",
        date: result
    })
})

export const adminController = {
    getAllAdmins
}