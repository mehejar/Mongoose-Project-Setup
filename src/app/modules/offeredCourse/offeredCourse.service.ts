import QueryBuilder from "../../builder/QueryBuilder";
import { AcademicDapartment, AppError } from "../academicDepertment/academicDepertment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemisterRagistration } from "../semisterRegistration/semisterRagistration.model";
import { TOfferedCourse } from "./offeredCourse.interface"
import { OfferedCourse } from "./offeredCourse.model"

const createCourse = async (payload: TOfferedCourse) => {
    const {
        semesterRegistration,
        academicFaculty,
        academicDepartment,
        course,
        faculty,
        days,
        startTime,
        endTime
    } = payload;

    /**
     * Step 1: check if the semester registration id is exists!
     * Step 2: check if the academic faculty id is exists!
     * Step 3: check if the academic department id is exists!
     * Step 4: check if the course id is exists!
     * Step 5: check if the faculty id is exists!
     * Step 6: check if the department is belong to the  faculty
     * Step 7: check if the same offered course same section in same registered semester exists
     * Step 8: get the schedules of the faculties
     * Step 9: check if the faculty is available at that time. If not then throw error
     * Step 10: create the offered course
     */

    //check if the semester registration id is exists!
    const isSemesterRegistrationExits =
        await SemisterRagistration.findById(semesterRegistration);

    if (!isSemesterRegistrationExits) {
        throw new AppError(
            404,
            'Semester registration not found !',
        );
    }

    const academicSemester = isSemesterRegistrationExits.academicSemester;

    const isAcademicFacultyExits =
        await AcademicFaculty.findById(academicFaculty);

    if (!isAcademicFacultyExits) {
        throw new AppError(400, 'Academic Faculty not found !');
    }

    const isAcademicDepartmentExits =
        await AcademicDapartment.findById(academicDepartment);

    if (!isAcademicDepartmentExits) {
        throw new AppError(400, 'Academic Department not found !');
    }


    const isCourseExits = await Course.findById(course);

    if (!isCourseExits) {
        throw new AppError(400, 'Course not found !');
    }

    const isFacultyExits = await Faculty.findById(faculty);

    if (!isFacultyExits) {
        throw new AppError(400, 'Faculty not found !');
    }

    // check the AcademicDepartment is exitst un specific academicFaculty
    if (academicFaculty !== isAcademicDepartmentExits.academicFaculty) {
        throw new AppError(400, 'Academic Faculty is not found in this Department');
    }

    // get the schedule of the faculty
    const assignSchedule = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: { $in: days }
    }).select('day startTime endTime')

    const newSchedule = {
        days,
        startTime,
        endTime
    }
    assignSchedule.forEach((schedule) => {
        const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`)
        const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`)
        const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`)
        const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`)

        if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
            throw new AppError(400, 'this Faculty is not available at this time');
        }
    })

    const result = await OfferedCourse.create({
        ...payload,
        academicSemester,
    });
    return result;
}

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
    const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await offeredCourseQuery.modelQuery;
    return result;
};



export const offeredCourseService = {
    createCourse,
    getAllOfferedCoursesFromDB
}
