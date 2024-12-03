/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { studentRoute } from './app/modules/student/student.route'
import { UserRoutes } from './app/modules/user/user.route'
import { academicSemesterRoute } from './app/modules/academicSemester/academicSemester.route'
// import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()
// const port = 3000
app.use(express.json())
app.use(cors())

// Application routes
app.use('/api/v1/students', studentRoute)
app.use('/api/v1/users', UserRoutes)
app.use('/api/v1/academic-semester', academicSemesterRoute)


export const getAController = (req: Request, res: Response) => {
  res.send('Hello World!')
}

app.get('/', getAController)

// app.use(globalErrorHandler);



export default app
