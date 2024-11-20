import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { studentRoute } from './app/modules/student/student.route'
const app: Application = express()
// const port = 3000
app.use(express.json())
app.use(cors())

// Application routes
app.use('/api/v1/students', studentRoute)


export const getAController = (req: Request, res: Response) => {
    res.send('Hello World!')
  }

app.get('/', getAController)

export default app
