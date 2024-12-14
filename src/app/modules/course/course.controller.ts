import catchAsync from "../../utils/catchAssync";
import { courseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
    const course = req.body
    const result = await courseServices.createCourse(course)
    res.status(200).json({
        success: true,
        message: "Course is Created",
        date: result
    })
})

const getSingleCourse = catchAsync(async (req, res) => {
    const { _id } = req.params;
    const result = await courseServices.getACourseFromDB(_id);

    res.status(200).json({
        success: true,
        message: "A Course is Retrieve Successfully",
        date: result
    })
});

const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params

    const result = await courseServices.updateACourse(
        id,
        req.body
    )

    res.status(200).json({
        success: true,
        message: "Courses is updated Successfully",
        date: result
    })
})

const getAllCourses = catchAsync(async (req, res) => {
    const result = await courseServices.getAllCoursesFromDB(req.query);

    res.status(200).json({
        success: true,
        message: "Courses is Retrieve Successfully",
        date: result
    })
});


const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await courseServices.
        deleteACourseFromDB(id);

    res.status(200).json({
        success: true,
        message: "Students is Retrieve Successfully",
        date: result
    })
});

const assignFaculties = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body
    const result = await courseServices.assignFaculties(courseId, faculties);

    res.status(200).json({
        success: true,
        message: "faculties add Successfully",
        date: result
    })
});

const removeFaculties = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body
    const result = await courseServices.removeFaculties(courseId, faculties);

    res.status(200).json({
        success: true,
        message: "faculties remove Successfully",
        date: result
    })
});

export const courseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
    updateCourse,
    assignFaculties,
    removeFaculties
}