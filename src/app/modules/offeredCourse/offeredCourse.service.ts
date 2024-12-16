import { TOfferedCourse } from "./offeredCourse.interface"
import { OfferedCourse } from "./offeredCourse.model"

const createCourse = async (offeredCourse: TOfferedCourse) => {
    const result = await OfferedCourse.create(offeredCourse)
    return result
}

export const offeredCourseService = {
    createCourse
}
