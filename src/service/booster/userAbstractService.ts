import UserModel from '../../database/model/user.js';

export abstract class userAbstractService {
    public userEmail: string;

    constructor(email: string) {
        this.userEmail = email;
    }

    public async findUserExists() {
        const email = this.userEmail;
        const user = await UserModel.findOne({ email }).exec();
        return Boolean(user);
    }
}