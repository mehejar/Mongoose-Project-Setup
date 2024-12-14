import { Types } from "mongoose"

export type TSemisterRagistration = {
    academicSemester: Types.ObjectId;
    status: "UPCOMING" | "ONGOING" | "ENDED";
    startDate: Date;
    endDate: Date;
    minCredit: number;
    maxCredit: number
}