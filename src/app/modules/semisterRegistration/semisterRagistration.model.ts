import { model, Schema } from "mongoose";
import { TSemisterRagistration } from "./semisterRagistration.interface";


export const semesterRegistrationStatus = ["UPCOMING", "ENDED", "ONGOING"]
const semisterRegistrationSchema = new Schema<TSemisterRagistration>({
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref: 'Semester'
    },
    status: {
        type: String,
        enum: semesterRegistrationStatus,
        default: 'UPCOMING'
    },
    startDate: {
        type: Date,
        required: true,
    },

    endDate: {
        type: Date,
        required: true,
    },
    minCredit: {
        type: Number,
        default: 3
    },
    maxCredit: {
        type: Number,
        default: 15
    }
},
    {
        timestamps: true
    })

export const SemisterRagistration = model<TSemisterRagistration>('SemisterRagistration', semisterRegistrationSchema)   