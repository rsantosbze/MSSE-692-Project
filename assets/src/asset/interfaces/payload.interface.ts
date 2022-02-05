import * as mongoose from 'mongoose';

export interface JwtPayload {
    username: string;
    userId: mongoose.Types.ObjectId;
    isAdmin: boolean;
    organizationId: string;
    firstName: string;
    lastName: string;
}
