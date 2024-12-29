import { Model } from "mongoose";

export interface TUser {
    id: string;
    email: string;
    password: string;
    needsPasswordChange: boolean;
    role: 'admin' | 'student' | 'faculty';
    status: 'in-progeess' | 'blocked';
    isDeleted: boolean;

};

export interface UserModel extends Model<TUser> {
    // myStaticMethod(): number;
    isUserExistByCustomId(id: string): Promise<TUser>
}

export type NewUser = {
    password: string;
    role: string;
    id: string
}