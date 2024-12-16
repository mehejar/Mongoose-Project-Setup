import catchAsync from "../../utils/catchAssync"
import { offeredCourseService } from "./offeredCourse.service"

const createOfferedCourse = catchAsync(async (req, res) => {
    const course = req.body
    const result = await offeredCourseService.createCourse(course)
    res.status(200).json({
        success: true,
        message: "Course is Created",
        date: result
    })
})

export offeredCourseController = {
    createOfferedCourse
}