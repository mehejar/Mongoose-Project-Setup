
import { Admin } from "./admin.model"

const getAllAdmin = async () => {
    const result = await Admin.find()
    return result
}


export const AdminServices = {
    getAllAdmin
}