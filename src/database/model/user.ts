import mongoose, { Document, Model } from 'mongoose';

export interface User extends Document {
  admin?: boolean;
  username: string;
  password: string;
  email: string;
  booster?: boolean;
  created: string;
  update: string;
}

const userSchema = new mongoose.Schema<User>({
  booster: { type: Boolean, required: false, default: false },
  admin: { type: Boolean, required: false, default: false},
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true }
}, { timestamps: true });
  
const UserModel: Model<User> = mongoose.model<User>('User', userSchema);

export default UserModel;
