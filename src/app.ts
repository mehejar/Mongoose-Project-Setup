/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { studentRoute } from './app/modules/student/student.route'
import { UserRoutes } from './app/modules/user/user.route'
import { academicSemesterRoute } from './app/modules/academicSemester/academicSemester.route'
import { AcademicFacultyRoutes } from './app/modules/academicFaculty/academicFaculty.routes'
import { AcademicDepartmentRoutes } from './app/modules/academicDepertment/acdemicDepartment.routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
// import { facultyRoute } from './app/modules/faculty/faculty.routes'
import { adminsRoute } from './app/modules/admin/admin.routes'
import { FacultyRoutes } from './app/modules/faculty/faculty.routes'
import { CourseRoute } from './app/modules/course/course.route'
import { semesterRegistrationRoute } from './app/modules/semisterRegistration/semisterRagistration.route'
import { offerCourseRoute } from './app/modules/offeredCourse/offeredCourse.route'
import { AuthRoute } from './app/modules/Auth/auth.route'


const app: Application = express()
// const port = 3000
app.use(express.json())
app.use(cors())

// Application routes
app.use('/api/v1/students', studentRoute)
app.use('/api/v1/users', UserRoutes)
app.use('/api/v1/academic-semester', academicSemesterRoute)
app.use('/api/v1/academic-faculty', AcademicFacultyRoutes)
app.use('/api/v1/academic-department', AcademicDepartmentRoutes)
app.use('/api/v1/faculty', FacultyRoutes)
app.use('/api/v1/admin', adminsRoute)
app.use('/api/v1/courses', CourseRoute)
app.use('/api/v1/semester-registration', semesterRegistrationRoute)
app.use('/api/v1/offered-course', offerCourseRoute)
app.use('/api/v1/auth', AuthRoute)


export const getAController = (req: Request, res: Response) => {
  res.send('Hello World!')
}

app.get('/', getAController)

app.use(globalErrorHandler);



export default app
