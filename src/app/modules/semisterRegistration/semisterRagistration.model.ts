import { model, Schema } from "mongoose";
import { TSemisterRagistration } from "./semisterRagistration.interface";

const semisterRegistrationSchema = new Schema<TSemisterRagistration>({
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref: 'Semester'
    },
    status: {
        type: String,
        enum: ["UPCOMING", "ENDED", "ONGOING"],
    }
})

export const SemisterRagistration = model<TSemisterRagistration>('SemisterRagistration', semisterRegistrationSchema)