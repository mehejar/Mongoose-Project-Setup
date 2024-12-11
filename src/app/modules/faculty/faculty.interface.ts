import { Types } from "mongoose";

export type TFaculty = {
    id: string;

    user: Types.ObjectId;
    name: {
        firstName: string;
        middleName?: string;
        lastName: string;
    };
    gender: "male" | "female" | "others",
    email: string;
    contactNo: string;
    presentAddress: string;
    permanentAddress: string;
    profile: string


}