/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose"
import QueryBuilder from "../../builder/QueryBuilder"
// import catchAsync from "../../utils/catchAssync"
import { TCourse, TCourseFaculty } from "./course.interface"
import { Course, CourseFaculty } from "./course.model"
import { AppError } from "../academicDepertment/academicDepertment.model"

const createCourse = async (course: TCourse) => {
    const result = await Course.create(course)
    return result
}

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    const searchableFields = ["title", "code", "prefix"]
    const courseQuery = new QueryBuilder(Course.find(), query)
        .search(searchableFields)
        .filter()
        .paginate()
        .sort()
        .paginate()
        .fields()

    const result = await courseQuery.modelQuery;
    return result
}

const getACourseFromDB = async (_id: string) => {
    const result = await Course.findById(_id)
    return result
}

const updateACourse = async (_id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourses, ...courseRemainingData } = payload

    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        // step:1 basic course info update
        const updatedBasicCourseInfo = await Course.findByIdAndUpdate(_id, courseRemainingData,
            {
                new: true,
                runValidators: true,
                session
            },
        )

        if (!updatedBasicCourseInfo) {
            throw new AppError(400, 'Update Atampt Failed')
        }

        // check if there is any pre requisit courses update

        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            // filter out the deleted fields
            const deletedPreRequisit = preRequisiteCourses.filter(el => el.course && el.isDeleted).map((el) => el.course)

            const deletedPreRequisitCourses = await Course.findOneAndUpdate(_id,
                {
                    $pull: {
                        preRequisiteCourses: {
                            course: {
                                $in: deletedPreRequisit

                            }
                        }
                    }
                },
                {
                    session
                })

            if (!deletedPreRequisitCourses) {
                throw new AppError(400, 'Update Atampt Failed')
            }

            const newPreRequisit = preRequisiteCourses.filter(el => el.course && !el.isDeleted).map((el) => el.course)

            const newPreRequisitCourses = await Course.findByIdAndUpdate(_id,
                {
                    $addToSet: { preRequisiteCourses: { $each: newPreRequisit } }
                },
                {
                    session
                }
            )

            if (!newPreRequisitCourses) {
                throw new AppError(400, 'Update Atampt Failed')
            }

            const result = await Course.findById(_id).populate('preRequisiteCourses.course')
            return result

        }
        session.commitTransaction()
        session.endSession()







    } catch (err) {
        session.abortTransaction()
        session.endSession()
    }
}





const deleteACourseFromDB = async (_id: string) => {
    const result = await Course.findByIdAndUpdate(_id, { isDeleted: true }, { new: true })
    return result
}

const assignFaculties = async (_id: string, payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(_id,
        {
            course: _id,
            $addToSet: { faculties: { $each: payload } }
        },
        {
            upsert: true,
            new: true
        }
    )
    return result
}
const removeFaculties = async (_id: string, payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(_id,
        {

            $pull: { faculties: { $in: payload } }
        },
        {
            new: true
        }
    )
    return result
}

export const courseServices = {
    createCourse,
    getAllCoursesFromDB,
    getACourseFromDB,
    deleteACourseFromDB,
    updateACourse,
    assignFaculties,
    removeFaculties
}